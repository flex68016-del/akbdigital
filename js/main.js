/* ========================================
   Portfolio AKB - JavaScript principal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
});
