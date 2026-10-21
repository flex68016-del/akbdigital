/* ========================================
   Portfolio AKB - JavaScript principal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isPointerCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth <= 768;

    // ========================================
    // Smooth scroll Lenis synchronisé avec GSAP ScrollTrigger
    ========================================
    if (!prefersReducedMotion) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Synchroniser Lenis avec GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    // ========================================
    // Curseur personnalisé (desktop et pointeur précis uniquement)
    ========================================
    const customCursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor__dot');
    const cursorCircle = document.querySelector('.custom-cursor__circle');

    if (customCursor && !prefersReducedMotion && !isPointerCoarse && !isMobile) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Suivi de la souris
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation avec lerp (inertie)
        function animateCursor() {
            const lerpFactor = 0.15;
            cursorX += (mouseX - cursorX) * lerpFactor;
            cursorY += (mouseY - cursorY) * lerpFactor;

            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            cursorCircle.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // État hover sur les boutons
        const buttons = document.querySelectorAll('.btn, a');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                customCursor.classList.add('custom-cursor--hover');
            });
            button.addEventListener('mouseleave', () => {
                customCursor.classList.remove('custom-cursor--hover');
            });
        });

        // État view sur les images/vidéos
        const mediaElements = document.querySelectorAll('img, video');
        mediaElements.forEach(media => {
            media.addEventListener('mouseenter', () => {
                customCursor.classList.add('custom-cursor--view');
            });
            media.addEventListener('mouseleave', () => {
                customCursor.classList.remove('custom-cursor--view');
            });
        });

        // Cacher le curseur quand la souris quitte la fenêtre
        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
        });
    }

    // ========================================
    // Header - Cache au scroll vers le bas
    ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scroll vers le bas
                header.classList.add('header--hidden');
            } else {
                // Scroll vers le haut
                header.classList.remove('header--hidden');
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // Menu mobile
    ========================================
    const headerToggle = document.querySelector('.header__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    let isMenuOpen = false;

    if (headerToggle && mobileMenu) {
        headerToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            headerToggle.classList.toggle('header__toggle--active', isMenuOpen);
            mobileMenu.classList.toggle('mobile-menu--open', isMenuOpen);
            mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
            headerToggle.setAttribute('aria-expanded', isMenuOpen);

            // Bloquer le scroll quand le menu est ouvert
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';

            // Animation des liens en cascade avec GSAP
            if (isMenuOpen && !prefersReducedMotion) {
                gsap.to(mobileMenuLinks, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        });

        // Fermer le menu au clic sur un lien
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                headerToggle.classList.remove('header__toggle--active');
                mobileMenu.classList.remove('mobile-menu--open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                headerToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Focus trap dans le menu (accessibilité)
        const focusableElements = mobileMenu.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                headerToggle.click();
            }
        });
    }

    // ========================================
    // Lien actif dans la navigation
    ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header__link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('header__link--active');
        } else {
            link.classList.remove('header__link--active');
        }
    });

    // ========================================
    // Transitions entre pages
    ========================================
    const pageTransition = document.querySelector('.page-transition');
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="a-propos.html"], a[href^="services.html"], a[href^="portfolio.html"], a[href^="experiences.html"], a[href^="akb-communication.html"], a[href^="contact.html"]');

    if (pageTransition && !prefersReducedMotion) {
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = link.getAttribute('href');

                // Animation du rideau
                gsap.to(pageTransition, {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        window.location.href = targetUrl;
                    }
                });
            });
        });
    }
});
