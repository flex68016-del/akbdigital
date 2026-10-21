/* ========================================
   Portfolio AKB - Animations GSAP
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer les plugins GSAP
    gsap.registerPlugin(ScrollTrigger, Flip, SplitType);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // Loader d'introduction (une fois par session)
    // ========================================
    const loader = document.querySelector('.loader');

    if (loader && !prefersReducedMotion) {
        // Vérifier si le loader a déjà été joué cette session
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

            // Animation des lettres du logo
            tl.from(logoChars, {
                opacity: 0,
                y: 100,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            })
            // Animation de la barre de progression
            .to(bar, {
                width: '100%',
                duration: 2,
                ease: 'power2.inOut'
            }, '-=0.5')
            // Animation du compteur (timecode style)
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
            // Sortie du loader en rideau
            .to(loader, {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                duration: 0.8,
                ease: 'power4.inOut'
            })
            .set(loader, { display: 'none' });
        } else {
            // Si déjà joué, masquer immédiatement
            gsap.set(loader, { display: 'none' });
        }
    } else if (loader) {
        // Si prefers-reduced-motion, masquer immédiatement
        gsap.set(loader, { display: 'none' });
    }

    // ========================================
    // Révélation de la page à l'arrivée (après transition)
    ========================================
    const pageTransition = document.querySelector('.page-transition');

    if (pageTransition && !prefersReducedMotion) {
        // Si la transition est visible (arrivée sur la page), la faire descendre
        if (pageTransition.style.transform === 'translateY(0%)' || pageTransition.classList.contains('page-transition--active')) {
            gsap.to(pageTransition, {
                y: '-100%',
                duration: 0.8,
                ease: 'power4.inOut'
            });
        }
    }

    // ========================================
    // Animations de la page d'accueil
    ========================================
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroTimecode = document.querySelector('.hero__timecode');
    const heroVideo = document.querySelector('.hero__video');
    const heroGlow = document.querySelector('.hero__glow');

    // Animation du titre hero (SplitType)
    if (heroTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(heroTitle, { types: 'lines' });

        gsap.from(splitTitle.lines, {
            y: 100,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    // Animation du sous-titre qui alterne
    if (heroSubtitle && !prefersReducedMotion) {
        const subtitles = ['Vidéaste', 'Photographe', 'Monteur vidéo', 'Community Manager'];
        let currentIndex = 0;

        function rotateSubtitle() {
            // Sortie
            gsap.to(heroSubtitle, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    currentIndex = (currentIndex + 1) % subtitles.length;
                    heroSubtitle.textContent = subtitles[currentIndex];
                    // Entrée
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

    // Timecode qui avance en temps réel
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

    // Parallaxe de la vidéo selon la souris et le scroll
    if (heroVideo && !prefersReducedMotion) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });

        gsap.to(heroVideo, {
            x: mouseX,
            y: mouseY,
            duration: 1,
            ease: 'power2.out'
        });

        // Parallaxe au scroll
        gsap.to(heroVideo, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Animation du halo glow
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

    // Animation des cartes de service en cascade
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0 && !prefersReducedMotion) {
        gsap.from(serviceCards, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-preview',
                start: 'top 80%'
            }
        });
    }

    // Animation des projets à la une
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0 && !prefersReducedMotion) {
        gsap.from(projectCards, {
            opacity: 0,
            scale: 0.9,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.featured-projects',
                start: 'top 80%'
            }
        });
    }

    // ========================================
    // Animations de la page À propos
    ========================================

    // Animation du titre À propos
    const aboutTitle = document.querySelector('.about-hero__title');
    if (aboutTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(aboutTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Révélation mot par mot du texte de présentation au scroll
    const aboutText = document.getElementById('about-text');
    if (aboutText && !prefersReducedMotion) {
        const words = aboutText.textContent.split(' ');
        aboutText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

        const wordElements = aboutText.querySelectorAll('.word');

        gsap.from(wordElements, {
            opacity: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about-presentation',
                start: 'top 70%',
                onEnter: () => {
                    wordElements.forEach(word => word.classList.add('visible'));
                }
            }
        });
    }

    // Parallaxe légère du portrait
    const portrait = document.querySelector('.about-presentation__portrait');
    if (portrait && !prefersReducedMotion) {
        gsap.to(portrait, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-presentation',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Animation des items de compétences en cascade
    const skillLists = document.querySelectorAll('.skill-card__list');
    if (skillLists.length > 0 && !prefersReducedMotion) {
        skillLists.forEach(list => {
            const items = list.querySelectorAll('li');
            gsap.to(items, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: list,
                    start: 'top 80%',
                    onEnter: () => {
                        items.forEach(item => item.classList.add('visible'));
                    }
                }
            });
        });
    }

    // Timeline : la ligne se dessine au scroll, les items apparaissent
    const timelineLineProgress = document.querySelector('.about-timeline__line-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineLineProgress && timelineItems.length > 0 && !prefersReducedMotion) {
        gsap.to(timelineLineProgress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-timeline',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        });

        timelineItems.forEach((item, index) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    onEnter: () => {
                        item.classList.add('visible');
                    }
                }
            });
        });
    }

    // ========================================
    // Animations de la page Services
    ========================================

    // Animation du titre Services
    const servicesTitle = document.querySelector('.services-hero__title');
    if (servicesTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(servicesTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Animation de la ligne de progression du process
    const processLineProgress = document.querySelector('.process-steps__line-progress');
    if (processLineProgress && !prefersReducedMotion) {
        gsap.to(processLineProgress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        });
    }

    // ========================================
    // Animations de la page Portfolio
    ========================================

    // Animation du titre Portfolio
    const portfolioTitle = document.querySelector('.portfolio-hero__title');
    if (portfolioTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(portfolioTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Animation de la lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox && !prefersReducedMotion) {
        const lightboxContent = lightbox.querySelector('.lightbox__content');

        // Animation d'ouverture
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && lightbox.classList.contains('lightbox--active')) {
                    gsap.fromTo(lightboxContent,
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
                    );
                }
            });
        });

        observer.observe(lightbox, { attributes: true });
    }
});

// Ajouter l'animation d'ouverture depuis la miniature pour la lightbox
if (typeof gsap !== 'undefined' && typeof Flip !== 'undefined') {
    // Cette fonction sera appelée depuis main.js quand on ouvre la lightbox
    window.animateLightboxOpen = function(clickedElement) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const lightbox = document.getElementById('lightbox');
            const lightboxContent = lightbox.querySelector('.lightbox__content');

            // Animation depuis la position de l'élément cliqué
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
