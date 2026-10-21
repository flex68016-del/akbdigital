/* ========================================
   Portfolio AKB - Animations GSAP Centralisees
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer les plugins GSAP
    gsap.registerPlugin(ScrollTrigger, Flip, SplitType);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isPointerCoarse = window.matchMedia('(pointer: coarse)').matches;

    // ========================================
    // Fonctions d'animation reutilisables
    // ========================================

    /**
     * Titre revele ligne par ligne avec SplitType
     * @param {HTMLElement} element - Element a animer
     * @param {Object} options - Options GSAP
     */
    function revealText(element, options = {}) {
        if (!element || prefersReducedMotion) return;

        const defaults = {
            type: 'chars',
            y: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0
        };

        const config = { ...defaults, ...options };
        const split = new SplitType(element, { types: config.type });

        gsap.from(split[config.type === 'lines' ? 'lines' : 'chars'], {
            y: config.y,
            opacity: config.opacity,
            stagger: config.stagger,
            duration: config.duration,
            ease: config.ease,
            delay: config.delay
        });
    }

    /**
     * Apparition en montee avec stagger
     * @param {HTMLElement|NodeList} elements - Elements a animer
     * @param {Object} options - Options GSAP
     */
    function fadeUp(elements, options = {}) {
        if (!elements || prefersReducedMotion) return;

        const nodeList = elements instanceof NodeList ? elements : [elements];
        if (nodeList.length === 0) return;

        const defaults = {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: null
        };

        const config = { ...defaults, ...options };

        gsap.from(nodeList, {
            y: config.y,
            opacity: config.opacity,
            stagger: config.stagger,
            duration: config.duration,
            ease: config.ease,
            scrollTrigger: config.scrollTrigger
        });
    }

    /**
     * Revelation d'image par clip-path + scale
     * @param {HTMLElement} element - Image a animer
     * @param {Object} options - Options GSAP
     */
    function imageReveal(element, options = {}) {
        if (!element || prefersReducedMotion) return;

        const defaults = {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        };

        const config = { ...defaults, ...options };

        gsap.fromTo(element,
            { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.1 },
            {
                clipPath: config.clipPath,
                scale: config.scale,
                duration: config.duration,
                ease: config.ease,
                scrollTrigger: config.scrollTrigger
            }
        );
    }

    /**
     * Parallaxe sur les elements avec data-speed
     */
    function parallax() {
        if (prefersReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            
            gsap.to(element, {
                yPercent: speed * 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    /**
     * Boutons magnetiques (desktop uniquement)
     */
    function magneticButton() {
        if (prefersReducedMotion || isPointerCoarse) return;

        const buttons = document.querySelectorAll('[data-magnetic]');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(button, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    /**
     * Compteurs animes
     */
    function counterUp() {
        if (prefersReducedMotion) return;

        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'), 10);
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(counter, {
                        textContent: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 }
                    });
                }
            });
        });
    }

    /**
     * Bandeaux reactifs a la vitesse du scroll
     */
    function horizontalMarquee() {
        if (prefersReducedMotion) return;

        const marquees = document.querySelectorAll('[data-marquee]');
        
        marquees.forEach(marquee => {
            const track = marquee.querySelector('.marquee__track');
            if (!track) return;

            let xTo = gsap.quickTo(track, 'x', { duration: 0.5, ease: 'power3' });
            
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                xTo(scrollY * -0.5);
            });
        });
    }

    // ========================================
    // Animation elements specifiques (pas generiques)
    // ========================================

    // Loader d'introduction (une fois par session)
    const loader = document.querySelector('.loader');
    if (loader && !prefersReducedMotion) {
        const hasLoaderPlayed = sessionStorage.getItem('loaderPlayed');

        if (!hasLoaderPlayed) {
            const logoChars = document.querySelectorAll('.loader__logo-char');
            const counter = document.querySelector('.loader__counter');
            const bar = document.querySelector('.loader__bar');

            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('loaderPlayed', 'true');
                }
            });

            tl.from(logoChars, {
                opacity: 0,
                y: 100,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            })
            .to(bar, {
                width: '100%',
                duration: 2,
                ease: 'power2.inOut'
            }, '-=0.5')
            .to({}, {
                duration: 2,
                onUpdate: function() {
                    const progress = this.progress();
                    const percentage = Math.round(progress * 100);
                    const minutes = Math.floor(percentage / 60);
                    const seconds = percentage % 60;
                    const frames = Math.floor(this.time() * 24) % 24;
                    counter.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
                }
            }, '-=2')
            .to(loader, {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                duration: 0.8,
                ease: 'power4.inOut'
            })
            .set(loader, { display: 'none' });
        } else {
            gsap.set(loader, { display: 'none' });
        }
    } else if (loader) {
        gsap.set(loader, { display: 'none' });
    }

    // Revelation de la page a l'arrivee
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition && !prefersReducedMotion) {
        if (pageTransition.style.transform === 'translateY(0%)' || pageTransition.classList.contains('page-transition--active')) {
            gsap.to(pageTransition, {
                y: '-100%',
                duration: 0.8,
                ease: 'power4.inOut'
            });
        }
    }

    // Timecode hero (temps reel)
    const heroTimecode = document.querySelector('.hero__timecode');
    if (heroTimecode) {
        function updateTimecode() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            heroTimecode.textContent = `${hours}:${minutes}:${seconds}`;
        }
        updateTimecode();
        setInterval(updateTimecode, 1000);
    }

    // Sous-titre hero qui alterne
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle && !prefersReducedMotion) {
        const subtitles = ['Vidéaste', 'Photographe', 'Monteur vidéo', 'Community Manager'];
        let currentIndex = 0;

        function rotateSubtitle() {
            gsap.to(heroSubtitle, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    currentIndex = (currentIndex + 1) % subtitles.length;
                    heroSubtitle.textContent = subtitles[currentIndex];
                    gsap.to(heroSubtitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }
        setInterval(rotateSubtitle, 3000);
    }

    // Halo glow animation
    const heroGlow = document.querySelector('.hero__glow');
    if (heroGlow && !prefersReducedMotion) {
        gsap.to(heroGlow, {
            y: '20%',
            x: '-10%',
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // ========================================
    // Declenchement via attributs data-animate
    // ========================================

    // Titres avec revealText
    document.querySelectorAll('[data-animate="reveal-text"]').forEach(element => {
        const delay = parseFloat(element.getAttribute('data-delay')) || 0;
        revealText(element, { delay });
    });

    // Elements avec fadeUp
    document.querySelectorAll('[data-animate="fade-up"]').forEach(element => {
        const stagger = parseFloat(element.getAttribute('data-stagger')) || 0.15;
        const trigger = element.getAttribute('data-trigger');
        
        fadeUp(element, {
            stagger,
            scrollTrigger: {
                trigger: trigger ? document.querySelector(trigger) : element,
                start: 'top 80%'
            }
        });
    });

    // Images avec imageReveal
    document.querySelectorAll('[data-animate="image-reveal"]').forEach(element => {
        imageReveal(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%'
            }
        });
    });

    // Elements avec parallax
    parallax();

    // Boutons magnetiques
    magneticButton();

    // Compteurs
    counterUp();

    // Marquees
    horizontalMarquee();

    // ========================================
    // Refresh au resize
    // ========================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});

// Animation lightbox d'ouverture depuis miniature
if (typeof gsap !== 'undefined' && typeof Flip !== 'undefined') {
    window.animateLightboxOpen = function(clickedElement) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const lightbox = document.getElementById('lightbox');
            const lightboxContent = lightbox.querySelector('.lightbox__content');

            const rect = clickedElement.getBoundingClientRect();
            const lightboxRect = lightbox.getBoundingClientRect();

            gsap.set(lightboxContent, {
                x: rect.left - lightboxRect.left,
                y: rect.top - lightboxRect.top,
                width: rect.width,
                height: rect.height,
                scale: 1,
                opacity: 0
            });

            gsap.to(lightboxContent, {
                x: 0,
                y: 0,
                width: '100%',
                height: 'auto',
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            });
        }
    };
}
