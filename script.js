document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    /* ============================================================
       DOM REFS
       ============================================================ */
    const html = document.documentElement;
    const nav = document.getElementById('nav');
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const portfolioGrid = document.getElementById('portfolio-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');
    const heroBg = document.getElementById('hero-bg');
    const heroBgSource = document.getElementById('hero-bg-source');
    const aboutBg = document.querySelector('.about-bg-light');
    const aboutBgSource = document.getElementById('about-bg-source');

    let userThemeOverride = null;

    const HERO_BG_SOURCES = {
        light: 'media/_top1.mp4',
        dark: 'media/_top2.mp4',
    };

    const ABOUT_BG_SOURCES = {
        light: 'media/_middle2.mp4',
        dark: 'media/_middle1.mp4',
    };

    const FOOTER_BG_SOURCES = {
        light: 'media/_bottom.mp4',
        dark: 'media/_bottom.mp4',
    };

    function syncHeroBackground(theme) {
        if (!heroBg || !heroBgSource) return;
        const nextSrc = HERO_BG_SOURCES[theme] || HERO_BG_SOURCES.light;
        if (heroBg.getAttribute('src') === nextSrc || heroBg.currentSrc.endsWith(nextSrc)) return;

        heroBg.pause();
        heroBg.setAttribute('src', nextSrc);
        heroBgSource.setAttribute('src', nextSrc);
        heroBg.load();
        heroBg.play().catch(() => { });
    }

    function syncAboutBackground(theme) {
        if (!aboutBg || !aboutBgSource) return;
        const nextSrc = ABOUT_BG_SOURCES[theme] || ABOUT_BG_SOURCES.light;
        if (aboutBg.getAttribute('src') === nextSrc || aboutBg.currentSrc.endsWith(nextSrc)) return;

        aboutBg.pause();
        aboutBg.setAttribute('src', nextSrc);
        aboutBgSource.setAttribute('src', nextSrc);
        aboutBg.load();
        aboutBg.play().catch(() => { });
    }

    function applyTheme(theme, persist = false) {
        html.setAttribute('data-theme', theme);
        syncHeroBackground(theme);
        syncAboutBackground(theme);

        if (persist) {
            userThemeOverride = theme;
            localStorage.setItem('wc-theme', theme);
        }
    }

    /* ============================================================
       THEME SYSTEM
       ============================================================ */
    const savedTheme = localStorage.getItem('wc-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
        userThemeOverride = savedTheme;
    } else {
        syncHeroBackground('light');
        syncAboutBackground('light');
    }

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next, true);
    });

    /* ============================================================
       PAGE LOAD ANIMATION
       ============================================================ */
    // Keep the hero title visible immediately; other sections still use scroll reveals.

    /* ============================================================
       SCROLL-DRIVEN THEME TRANSITION
       ============================================================ */
    ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom-=20% top',
        end: 'bottom top',
        onEnter: () => {
            if (!userThemeOverride) {
                applyTheme('dark');
            }
        },
        onLeaveBack: () => {
            if (!userThemeOverride) {
                applyTheme('light');
            }
        }
    });

    /* ============================================================
       NAV SCROLL EFFECT
       ============================================================ */
    ScrollTrigger.create({
        start: 60,
        onEnter: () => nav.classList.add('scrolled'),
        onLeaveBack: () => nav.classList.remove('scrolled')
    });

    /* ============================================================
       SCROLL PROGRESS
       ============================================================ */
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = Math.min(progress, 100) + '%';

        if (scrollTop > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    /* ============================================================
       BACK TO TOP
       ============================================================ */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ============================================================
       SMOOTH SCROLLING
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    /* ============================================================
       MOBILE HAMBURGER
       ============================================================ */
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    /* ============================================================
       ABOUT SECTION REVEAL (ScrollTrigger)
       ============================================================ */
    ScrollTrigger.create({
        trigger: '#about',
        start: 'top 75%',
        onEnter: () => {
            gsap.fromTo('.about-title', { opacity: 0, x: -60, skewX: 15 }, { opacity: 1, x: 0, skewX: 0, duration: 0.9, ease: 'power3.out' });
            gsap.fromTo('.about-text p', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out', delay: 0.2 });
        },
        once: true
    });

    /* ============================================================
       FOOTER REVEAL
       ============================================================ */
    ScrollTrigger.create({
        trigger: '.footer',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.footer-copy, .footer-meta', { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 });
            gsap.fromTo('.footer-bottom', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.15 });
        },
        once: true
    });

    /* ============================================================
       SECTION TITLE REVEAL (ScrollTrigger)
       ============================================================ */
    ScrollTrigger.create({
        trigger: '#work',
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo('.section-title', { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)' });
            gsap.fromTo('.filter-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.3 });
        },
        once: true
    });

    /* ============================================================
       PORTFOLIO LOADING & FILTERING
       ============================================================ */
    let allProjects = [];

    async function loadPortfolio() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            projects.forEach(p => { p.category = p.category.toLowerCase(); });
            allProjects = projects;

            const activeBtn = document.querySelector('.filter-btn.active');
            const initialFilter = activeBtn ? activeBtn.dataset.filter : 'cinema';
            const initialProjects = projects.filter(p => p.category === initialFilter);

            renderProjects(initialProjects);
            initFiltering();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    function renderProjects(projects) {
        portfolioGrid.innerHTML = '';
        projects.forEach((project, i) => {
            const item = document.createElement('div');
            const layoutClass = i % 3 === 0
                ? 'portfolio-item--featured'
                : i % 3 === 1
                    ? 'portfolio-item--portrait'
                    : 'portfolio-item--standard';

            item.className = `portfolio-item ${layoutClass}`;
            item.setAttribute('data-category', project.category);
            item.dataset.index = i;

            item.innerHTML = `
                <img src="${project.src}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <span class="item-category">${project.category}</span>
                    <h3 class="item-title">${project.title}</h3>
                </div>
            `;

            item.addEventListener('click', () => openLightbox(project));
            portfolioGrid.appendChild(item);
        });

        // Cascade reveal with ScrollTrigger - overlapping stagger
        ScrollTrigger.batch('.portfolio-item', {
            start: 'top 90%',
            onEnter: batch => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.06,
                    duration: 0.85,
                    ease: 'power3.out',
                    overwrite: true
                });
            },
            once: true
        });
    }

    function initFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                const filtered = filter === 'all'
                    ? allProjects
                    : allProjects.filter(p => p.category === filter);

                gsap.to(portfolioGrid, {
                    opacity: 0,
                    y: 10,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => {
                        renderProjects(filtered);
                        gsap.to(portfolioGrid, {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        });
    }

    /* ============================================================
       LIGHTBOX
       ============================================================ */
    function openLightbox(project) {
        lightboxImg.src = project.src;
        lightboxImg.alt = project.title;
        lightboxCategory.textContent = project.category;
        lightboxTitle.textContent = project.title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ============================================================
       INIT
       ============================================================ */
    loadPortfolio();
});
