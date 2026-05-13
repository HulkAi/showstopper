# showstopper

An editorial-style portfolio website for Alex Doe, built as a static front end with HTML, CSS, JavaScript, and media assets. The site combines cinematic visuals, a filterable project gallery, theme switching, and motion effects to present design and development work in a polished, interactive format.

## At a Glance

- Static single-page portfolio
- Light and dark theme support
- Background video hero and about sections
- Filterable project gallery loaded from JSON
- Image lightbox for portfolio previews
- GSAP-powered scroll animations
- Responsive layout for desktop and mobile

## Live Behaviors

The site currently includes:

- A sticky navigation bar with smooth anchor scrolling
- A theme toggle that persists the selected theme in `localStorage`
- Automatic theme-aware background video swapping
- A scroll progress indicator
- A back-to-top button that appears after scrolling
- A categorized portfolio grid driven by `projects.json`
- A full-screen lightbox for portfolio items
- Section reveal animations using GSAP and ScrollTrigger

## Project Structure

- `index.html` - main page markup and external library imports
- `index.css` - layout, theme, animation, and responsive styling
- `script.js` - navigation, theme, gallery, lightbox, and scroll behavior
- `projects.json` - portfolio item metadata and category data
- `media/` - images and videos used by the page
- `logo.svg` - site logo
- `html_optimizer.py` - utility script for HTML minification and optional inlining/compression

## Requirements

You only need a modern browser to view the site.

Recommended:

- Chrome, Edge, Firefox, or Safari
- A local server for development so JSON and media load correctly

## Getting Started

### Option 1: Open locally

Open `index.html` directly in your browser if you only want a quick preview.

### Option 2: Run a local server

Serving the folder locally is the safer option because the gallery data is loaded from `projects.json`.

Examples:

```bash
python -m http.server 8000
```

```bash
npx serve .
```

Then open:

```text
http://localhost:8000
```

## How the Site Works

### Theme system

- The current theme is stored on `<html data-theme="...">`
- User choice is saved under the `wc-theme` key in `localStorage`
- Hero and about background videos change when the theme changes

### Portfolio gallery

- `script.js` fetches `projects.json`
- Each project is assigned to a lowercase category
- The initial grid shows the active category
- Filter buttons rerender the grid without a page reload

### Lightbox

- Clicking a portfolio item opens a full-screen preview
- The image, category, and title are injected into the modal
- `Escape` closes the lightbox

### Motion

- GSAP and ScrollTrigger animate the about section, gallery, and footer
- Scroll position also drives the nav state and progress bar
- The page respects reduced motion preferences through CSS

## Customization Guide

### Update portfolio items

Edit [`projects.json`](./projects.json) to change the gallery content.

Each item uses:

- `src` - path to the image in `media/`
- `title` - display title shown in the gallery and lightbox
- `category` - one of the filter groups used by the interface

Example:

```json
{
  "src": "media/example.png",
  "title": "New Project",
  "category": "branding"
}
```

### Add or change media

- Replace files inside `media/` if you want new artwork or videos
- Keep file names in sync with the references in `index.html` and `projects.json`
- Use optimized assets where possible to keep the page fast

### Change the copy

- Hero text lives in `index.html`
- About section content lives in `index.html`
- Footer messaging also lives in `index.html`

### Adjust the look and feel

- `index.css` contains all theme tokens, layout rules, and responsive breakpoints
- The site uses the `Inter` and `Outfit` Google Fonts via CSS import
- Backgrounds, gradients, spacing, and typography can all be tuned from one place

## HTML Optimization Utility

The repository includes [`html_optimizer.py`](./html_optimizer.py), a small command-line helper for:

- Minifying HTML
- Inlining local CSS and JavaScript assets
- Optionally compressing and wrapping output in a browser-decompressed payload

Usage:

```bash
python html_optimizer.py index.html -o output.html
```

Inline external assets before output:

```bash
python html_optimizer.py index.html -o output.html --inline
```

Generate the compressed/obfuscated version:

```bash
python html_optimizer.py index.html -o output.html --compress
```

## Development Notes

- The project currently depends on GSAP CDN links in `index.html`
- The page is intentionally built without a bundler or framework
- The gallery layout is dense and responsive, so image aspect ratios matter
- If you add more portfolio items, verify the category names match the filter buttons

## Troubleshooting

### Gallery does not load

- Make sure you are serving the folder from a local web server
- Confirm `projects.json` is reachable at the project root
- Check that the `media/` paths in `projects.json` are correct

### Background videos do not play

- Some browsers restrict autoplay if the video is not muted
- The videos in this project are already configured with `muted`, `autoplay`, and `playsinline`
- Confirm the referenced files exist in `media/`

### Theme does not persist

- Ensure cookies or local storage are not blocked in your browser
- The saved key is `wc-theme`

## Accessibility Notes

- Interactive controls have labels where needed
- The layout supports keyboard interaction for the lightbox and navigation
- Reduced motion preferences are respected at the stylesheet level

## Browser Support

The site is intended for modern evergreen browsers that support:

- CSS custom properties
- `backdrop-filter`
- `object-fit`
- `fetch`
- `localStorage`
- ES6 JavaScript

## Ignored Files

The repository ignores generated output from OpenCode graphify tooling via:

```gitignore
.opencode/graphify-out
```

## License

No license has been defined yet. Add one if you plan to publish or share the project publicly.
