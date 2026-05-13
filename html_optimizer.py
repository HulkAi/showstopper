import argparse
import base64
import zlib
import re
import os

def minify_html(html):
    """A basic HTML minifier using regex."""
    protected_blocks = []

    def protect_block(match):
        protected_blocks.append(match.group(0))
        return f"__HTML_MINIFY_BLOCK_{len(protected_blocks) - 1}__"

    # Preserve inline JS/CSS contents so we don't break comments, regexes,
    # or string literals by flattening their whitespace.
    html = re.sub(
        r'<(script|style)\b[^>]*>[\s\S]*?</\1\s*>',
        protect_block,
        html,
        flags=re.IGNORECASE
    )

    # Remove HTML comments (but keep conditional comments if necessary - this is aggressive)
    html = re.sub(r'<!--(.*?)-->', '', html, flags=re.DOTALL)
    # Remove whitespace between tags
    html = re.sub(r'>\s+<', '><', html)
    # Compress multiple spaces into one
    html = re.sub(r'\s+', ' ', html)

    for index, block in enumerate(protected_blocks):
        html = html.replace(f"__HTML_MINIFY_BLOCK_{index}__", block)

    return html.strip()

def inline_resources(html, base_dir):
    """
    Inlines external CSS and JS files into the HTML.
    - <link rel="stylesheet" href="...">  -> <style>...</style>
    - <script src="...">                  -> <script>...</script>
    Skips absolute URLs (http://, https://, //).
    """
    def read_or_warn(path):
        full = os.path.join(base_dir, path)
        if os.path.exists(full):
            with open(full, 'r', encoding='utf-8') as f:
                print(f"  Inlined: {path}")
                return f.read()
        else:
            print(f"  Warning: file not found - {path}")
            return None

    # Inline CSS: <link ... rel="stylesheet" ... href="...">
    def inline_css(m):
        tag = m.group(0)
        href_m = re.search(r'href\s*=\s*["\']([^"\']+)["\']', tag)
        if not href_m:
            return tag
        href = href_m.group(1)
        if re.match(r'^(https?:)?//', href):
            return tag  # skip absolute URLs
        content = read_or_warn(href)
        if content is None:
            return tag
        return f'<style>{content}</style>'

    html = re.sub(
        r'<link\b[^>]*\brel\s*=\s*["\']stylesheet["\'][^>]*/?\s*>',
        inline_css,
        html,
        flags=re.IGNORECASE
    )

    # Inline JS: <script src="...">...</script>  or  <script src="..." />
    def inline_js(m):
        tag = m.group(0)
        src_m = re.search(r'src\s*=\s*["\']([^"\']+)["\']', tag)
        if not src_m:
            return tag
        src = src_m.group(1)
        if re.match(r'^(https?:)?//', src):
            return tag  # skip absolute URLs
        content = read_or_warn(src)
        if content is None:
            return tag
        # Preserve any other attributes (defer, async, type, etc.)
        attrs = re.sub(r'\s+src\s*=\s*["\'][^"\']+["\']', '', tag, flags=re.IGNORECASE)
        attrs = re.sub(r'^<script\b', '<script', attrs)  # normalize
        attrs = re.sub(r'/?\s*>$', '', attrs)  # strip closing bracket
        return f'{attrs}>{content}</script>'

    html = re.sub(
        r'<script\b[^>]*\bsrc\s*=\s*["\'][^"\']+["\'][^>]*/?\s*>[\s\S]*?</script\s*>',
        inline_js,
        html,
        flags=re.IGNORECASE
    )

    return html

def compress_and_obfuscate(html):
    """
    Compresses HTML using zlib, encodes as base64, 
    and wraps in a JS payload that decompresses via the native browser DecompressionStream.
    This acts as minification, compression, and obfuscation all at once.
    """
    # 1. Minify the original HTML
    minified = minify_html(html)
    
    # 2. Compress using zlib (deflate format)
    compressed = zlib.compress(minified.encode('utf-8'))
    
    # 3. Encode to base64
    b64_payload = base64.b64encode(compressed).decode('utf-8')
    
    # 4. Wrap in a minimal HTML file with a JavaScript decoder
    # This uses the modern browser DecompressionStream API
    js_template = """<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(async()=>{
let b="%s",d=atob(b),u=new Uint8Array(d.length);
for(let i=0;i<d.length;i++)u[i]=d.charCodeAt(i);
let s=new DecompressionStream("deflate"),w=s.writable.getWriter();
w.write(u);w.close();
let r=s.readable.getReader(),c=new Uint8Array();
while(true){
let{value:v,done:n}=await r.read();
if(n)break;
let t=new Uint8Array(c.length+v.length);
t.set(c);t.set(v,c.length);c=t;
}
document.open();document.write(new TextDecoder().decode(c));document.close();
})();
</script></body></html>"""
    
    return js_template % b64_payload

def main():
    parser = argparse.ArgumentParser(description="HTML Minifier, Compressor, and Obfuscator")
    parser.add_argument("input", help="Input HTML file path")
    parser.add_argument("-o", "--output", help="Output HTML file path", default="output.html")
    parser.add_argument("-m", "--minify-only", action="store_true", help="Only minify, do not obfuscate/compress")
    parser.add_argument("--inline", action="store_true", help="Inline external CSS/JS files before output")
    parser.add_argument("--compress", action="store_true", help="Wrap the minified HTML in a compressed JavaScript loader")
    parser.add_argument("--no-inline", action="store_true", help="Backward-compatible alias for not inlining external CSS/JS files")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' not found.")
        return

    try:
        with open(args.input, 'r', encoding='utf-8') as f:
            html = f.read()
            
        original_size = len(html)
        base_dir = os.path.dirname(os.path.abspath(args.input))

        should_inline = args.inline and not args.no_inline

        if should_inline:
            print("Inlining external resources...")
            html = inline_resources(html, base_dir)

        # Default to the compressed loader unless the user explicitly opts out.
        should_compress = not args.minify_only

        if should_compress:
            result = compress_and_obfuscate(html)
            print("Performed minification, compression, and obfuscation.")
        else:
            result = minify_html(html)
            print("Performed minification only.")
            
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(result)
            
        new_size = len(result)
        savings = (1 - (new_size / original_size)) * 100 if original_size > 0 else 0
            
        print(f"Output written to: {args.output}")
        print(f"Original size: {original_size / 1024:.2f} KB")
        print(f"New size:      {new_size / 1024:.2f} KB")
        print(f"Reduction:     {savings:.2f}%")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
