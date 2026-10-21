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
});
