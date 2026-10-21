/* ========================================
   Portfolio AKB - JavaScript principal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isPointerCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth <= 768;

    // ========================================
    // Smooth scroll Lenis synchronise avec GSAP ScrollTrigger
    // ========================================
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

    // ========================================
    // Services list interactive
    ========================================
    const serviceItems = document.querySelectorAll('.service-item');
    const floatingImage = document.querySelector('.service-item__floating-image');

    if (serviceItems.length > 0) {
        // Desktop : hover reveal
        if (!isMobile) {
            serviceItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.classList.add('service-item--active');
                });

                item.addEventListener('mouseleave', () => {
                    item.classList.remove('service-item--active');
                });

                // Image flottante qui suit le curseur
                item.addEventListener('mousemove', (e) => {
                    if (floatingImage) {
                        gsap.to(floatingImage, {
                            x: e.clientX + 20,
                            y: e.clientY + 20,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        } else {
            // Mobile : accordéon au clic
            serviceItems.forEach(item => {
                const header = item.querySelector('.service-item__header');
                const content = item.querySelector('.service-item__content');

                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('service-item--active');

                    // Fermer tous les autres
                    serviceItems.forEach(otherItem => {
                        otherItem.classList.remove('service-item--active');
                        otherItem.setAttribute('aria-expanded', 'false');
                    });

                    // Ouvrir celui-ci si pas déjà actif
                    if (!isActive) {
                        item.classList.add('service-item--active');
                        item.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }
    }

    // ========================================
    // Portfolio : Génération de la grille et filtres
    ========================================
    const portfolioGrid = document.getElementById('portfolio-grid');
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');

    if (portfolioGrid && typeof portfolioData !== 'undefined') {
        // Générer les items du portfolio
        function renderPortfolio(filter = 'all') {
            portfolioGrid.innerHTML = '';

            const filteredData = filter === 'all'
                ? portfolioData
                : portfolioData.filter(item => item.categories.includes(filter));

            filteredData.forEach((item, index) => {
                const itemClass = item.type === 'video' ? 'portfolio-item--video' : '';
                const sizeClass = index % 5 === 0 ? 'portfolio-item--large' : index % 3 === 0 ? 'portfolio-item--wide' : '';

                const itemEl = document.createElement('div');
                itemEl.className = `portfolio-item ${sizeClass} ${itemClass}`;
                itemEl.dataset.id = item.id;

                if (item.type === 'video') {
                    itemEl.innerHTML = `
                        <img src="${item.thumbnail}" alt="${item.title}" class="portfolio-item__media" loading="lazy" width="400" height="300">
                        <div class="portfolio-item__video-indicator">▶</div>
                        <div class="portfolio-item__overlay">
                            <p class="portfolio-item__category">Vidéo</p>
                            <h3 class="portfolio-item__title">${item.title}</h3>
                            <p class="portfolio-item__client">${item.client}</p>
                        </div>
                    `;
                } else {
                    itemEl.innerHTML = `
                        <img src="${item.thumbnail}" alt="${item.title}" class="portfolio-item__media" loading="lazy" width="400" height="300">
                        <div class="portfolio-item__overlay">
                            <p class="portfolio-item__category">Photo</p>
                            <h3 class="portfolio-item__title">${item.title}</h3>
                            <p class="portfolio-item__client">${item.client}</p>
                        </div>
                    `;
                }

                portfolioGrid.appendChild(itemEl);
            });

            // Animation d'apparition en cascade
            if (!prefersReducedMotion) {
                gsap.from('.portfolio-item', {
                    opacity: 0,
                    scale: 0.9,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            }
        }

        // Render initial
        renderPortfolio();

        // Gestion des filtres
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Mettre à jour les boutons
                portfolioFilters.forEach(f => f.classList.remove('portfolio-filter--active'));
                filter.classList.add('portfolio-filter--active');

                // Filtrer et réorganiser
                const filterValue = filter.dataset.filter;

                if (!prefersReducedMotion) {
                    // Animation Flip pour réorganisation fluide
                    const state = Flip.getState('.portfolio-item');
                    renderPortfolio(filterValue);
                    Flip.from(state, {
                        duration: 0.6,
                        ease: 'power3.out',
                        absolute: true,
                        onEnter: elements => gsap.from(elements, { opacity: 0, scale: 0.9, duration: 0.4 }),
                        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
                    });
                } else {
                    renderPortfolio(filterValue);
                }
            });
        });
    }

    // ========================================
    // Lightbox
    ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClient = document.getElementById('lightbox-client');
    const lightboxClose = document.querySelector('.lightbox__close');
    const lightboxPrev = document.querySelector('.lightbox__nav--prev');
    const lightboxNext = document.querySelector('.lightbox__nav--next');

    let currentLightboxIndex = 0;
    let currentLightboxData = [];

    function openLightbox(item) {
        currentLightboxIndex = portfolioData.findIndex(p => p.id === item.id);
        currentLightboxData = portfolioData;

        lightboxTitle.textContent = item.title;
        lightboxClient.textContent = item.client;

        if (item.type === 'video') {
            lightboxMediaContainer.innerHTML = `
                <video src="${item.src}" class="lightbox__media" controls autoplay muted loop></video>
            `;
        } else {
            lightboxMediaContainer.innerHTML = `
                <img src="${item.src}" alt="${item.title}" class="lightbox__media">
            `;
        }

        lightbox.classList.add('lightbox--active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Animation d'ouverture depuis la miniature
        if (window.animateLightboxOpen) {
            const clickedElement = document.querySelector(`.portfolio-item[data-id="${item.id}"]`);
            if (clickedElement) {
                window.animateLightboxOpen(clickedElement);
            }
        }

        // Sauvegarder l'élément focus
        lightbox.dataset.focusReturn = document.activeElement?.outerHTML || '';
    }

    function closeLightbox() {
        lightbox.classList.remove('lightbox--active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Arrêter la vidéo si présente
        const video = lightboxMediaContainer.querySelector('video');
        if (video) {
            video.pause();
        }

        // Retourner le focus
        setTimeout(() => {
            const focusedElement = document.querySelector('.portfolio-item[data-id="' + portfolioData[currentLightboxIndex].id + '"]');
            if (focusedElement) {
                focusedElement.focus();
            }
        }, 100);
    }

    function navigateLightbox(direction) {
        if (direction === 'next') {
            currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxData.length;
        } else {
            currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxData.length) % currentLightboxData.length;
        }

        const item = currentLightboxData[currentLightboxIndex];
        openLightbox(item);
    }

    // Event listeners pour la lightbox
    if (lightbox && lightboxMediaContainer) {
        // Ouverture au clic sur un item portfolio
        document.addEventListener('click', (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            if (portfolioItem) {
                const itemId = parseInt(portfolioItem.dataset.id);
                const item = portfolioData.find(p => p.id === itemId);
                if (item) {
                    e.preventDefault();
                    openLightbox(item);
                }
            }
        });

        // Fermeture
        lightboxClose.addEventListener('click', closeLightbox);

        // Navigation
        lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
        lightboxNext.addEventListener('click', () => navigateLightbox('next'));

        // Clavier
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('lightbox--active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        });

        // Clic en dehors du contenu
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Swipe mobile (basic)
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        lightbox.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    navigateLightbox('next');
                } else {
                    navigateLightbox('prev');
                }
            }
        });
    }
});
