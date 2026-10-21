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
        // Verifier si le loader a deja ete joue cette session
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
            // Si deja joue, masquer immediatement
            gsap.set(loader, { display: 'none' });
        }
    } else if (loader) {
        // Si prefers-reduced-motion, masquer immediatement
        gsap.set(loader, { display: 'none' });
    }

    // ========================================
    // Revelation de la page a l'arrivee (apres transition)
    // ========================================
    const pageTransition = document.querySelector('.page-transition');

    if (pageTransition && !prefersReducedMotion) {
        // Si la transition est visible (arrivee sur la page), la faire descendre
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
        const subtitles = ['Videaste', 'Photographe', 'Monteur video', 'Community Manager'];
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
                    // Entree
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

    // Timecode qui avance en temps reel
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

    // Parallaxe de la video selon la souris et le scroll
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

    // Animation des projets a la une
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

    // Revelation mot par mot du texte de presentation au scroll
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

    // Parallaxe legere du portrait
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

    // Animation des items de competences en cascade
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

    // ========================================
    // Animations de la page Experiences
    ========================================

    const experiencesTitle = document.querySelector('.experiences-hero__title');
    if (experiencesTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(experiencesTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Sticky cards et compteur pour experiences (desktop uniquement)
    const experienceCards = document.querySelectorAll('.experience-card');
    const counterCurrent = document.querySelector('.experiences-counter__current');

    if (experienceCards.length > 0 && !prefersReducedMotion && window.innerWidth > 768) {
        // Pin de chaque carte
        experienceCards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    pinSpacing: true,
                    scrub: true,
                    onEnter: () => {
                        if (counterCurrent) {
                            counterCurrent.textContent = String(index + 1).padStart(2, '0');
                        }
                    },
                    onEnterBack: () => {
                        if (counterCurrent) {
                            counterCurrent.textContent = String(index + 1).padStart(2, '0');
                        }
                    }
                }
            });

            // Animation d'entree de chaque carte
            const content = card.querySelector('.experience-card__content');
            const number = card.querySelector('.experience-card__number');

            gsap.from(content, {
                opacity: 0,
                y: 100,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            });

            gsap.from(number, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    } else if (experienceCards.length > 0 && !prefersReducedMotion) {
        // Mobile : animation simple en cascade
        gsap.from(experienceCards, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.experiences-sticky',
                start: 'top 80%'
            }
        });
    }

    // ========================================
    // Animations de la page AKB Communication
    ========================================

    const agencyTitle = document.querySelector('.agency-hero__title');
    if (agencyTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(agencyTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Tilt effect sur les cartes 3D (desktop uniquement, pas tactile)
    const tiltCards = document.querySelectorAll('[data-tilt]');
    if (tiltCards.length > 0 && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Animation des valeurs vision
    const visionValues = document.querySelectorAll('.agency-vision__value');
    if (visionValues.length > 0 && !prefersReducedMotion) {
        gsap.from(visionValues, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.agency-vision',
                start: 'top 80%'
            }
        });
    }

    // Animation des icones SVG
    const visionIcons = document.querySelectorAll('.agency-vision__icon');
    if (visionIcons.length > 0 && !prefersReducedMotion) {
        visionIcons.forEach(icon => {
            gsap.from(icon, {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: icon,
                    start: 'top 85%'
                }
            });
        });
    }

    // Animation de fusion des cercles complementarite
    const complementarityDiagram = document.querySelector('.agency-complementarity__diagram');
    const complementarityResult = document.querySelector('.agency-complementarity__result');

    if (complementarityDiagram && complementarityResult && !prefersReducedMotion) {
        ScrollTrigger.create({
            trigger: '.agency-complementarity',
            start: 'top 60%',
            onEnter: () => {
                // Faire se rapprocher les cercles
                gsap.to('.agency-complementarity__circle--portfolio', {
                    x: 50,
                    duration: 1,
                    ease: 'power3.out'
                });

                gsap.to('.agency-complementarity__circle--agency', {
                    x: -50,
                    duration: 1,
                    ease: 'power3.out'
                });

                // Afficher le resultat apres la fusion
                setTimeout(() => {
                    complementarityResult.classList.add('visible');
                }, 500);
            },
            onLeaveBack: () => {
                gsap.to('.agency-complementarity__circle--portfolio', {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                gsap.to('.agency-complementarity__circle--agency', {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                complementarityResult.classList.remove('visible');
            }
        });
    }

    // ========================================
    // Animations de la page Contact
    ========================================

    const contactTitle = document.querySelector('.contact-hero__title');
    if (contactTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(contactTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // ========================================
    // Animations de la page Experiences
    ========================================

    const experiencesTitle = document.querySelector('.experiences-hero__title');
    if (experiencesTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(experiencesTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Sticky cards et compteur pour experiences (desktop uniquement)
    const experienceCards = document.querySelectorAll('.experience-card');
    const counterCurrent = document.querySelector('.experiences-counter__current');

    if (experienceCards.length > 0 && !prefersReducedMotion && window.innerWidth > 768) {
        // Pin de chaque carte
        experienceCards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    pinSpacing: true,
                    scrub: true,
                    onEnter: () => {
                        if (counterCurrent) {
                            counterCurrent.textContent = String(index + 1).padStart(2, '0');
                        }
                    },
                    onEnterBack: () => {
                        if (counterCurrent) {
                            counterCurrent.textContent = String(index + 1).padStart(2, '0');
                        }
                    }
                }
            });

            // Animation d'entree de chaque carte
            const content = card.querySelector('.experience-card__content');
            const number = card.querySelector('.experience-card__number');

            gsap.from(content, {
                opacity: 0,
                y: 100,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            });

            gsap.from(number, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    } else if (experienceCards.length > 0 && !prefersReducedMotion) {
        // Mobile : animation simple en cascade
        gsap.from(experienceCards, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.experiences-sticky',
                start: 'top 80%'
            }
        });
    }

    // ========================================
    // Animations de la page AKB Communication
    ========================================

    const agencyTitle = document.querySelector('.agency-hero__title');
    if (agencyTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(agencyTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Tilt effect sur les cartes 3D (desktop uniquement, pas tactile)
    const tiltCards = document.querySelectorAll('[data-tilt]');
    if (tiltCards.length > 0 && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Animation des valeurs vision
    const visionValues = document.querySelectorAll('.agency-vision__value');
    if (visionValues.length > 0 && !prefersReducedMotion) {
        gsap.from(visionValues, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.agency-vision',
                start: 'top 80%'
            }
        });
    }

    // Animation des icones SVG
    const visionIcons = document.querySelectorAll('.agency-vision__icon');
    if (visionIcons.length > 0 && !prefersReducedMotion) {
        visionIcons.forEach(icon => {
            gsap.from(icon, {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: icon,
                    start: 'top 85%'
                }
            });
        });
    }

    // Animation de fusion des cercles complementarite
    const complementarityDiagram = document.querySelector('.agency-complementarity__diagram');
    const complementarityResult = document.querySelector('.agency-complementarity__result');

    if (complementarityDiagram && complementarityResult && !prefersReducedMotion) {
        ScrollTrigger.create({
            trigger: '.agency-complementarity',
            start: 'top 60%',
            onEnter: () => {
                // Faire se rapprocher les cercles
                gsap.to('.agency-complementarity__circle--portfolio', {
                    x: 50,
                    duration: 1,
                    ease: 'power3.out'
                });

                gsap.to('.agency-complementarity__circle--agency', {
                    x: -50,
                    duration: 1,
                    ease: 'power3.out'
                });

                // Afficher le resultat apres la fusion
                setTimeout(() => {
                    complementarityResult.classList.add('visible');
                }, 500);
            },
            onLeaveBack: () => {
                gsap.to('.agency-complementarity__circle--portfolio', {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                gsap.to('.agency-complementarity__circle--agency', {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                complementarityResult.classList.remove('visible');
            }
        });
    }

    // ========================================
    // Animations de la page Contact
    ========================================

    const contactTitle = document.querySelector('.contact-hero__title');
    const contactSubtitle = document.querySelector('.contact-hero__subtitle');
    
    if (contactTitle && !prefersReducedMotion) {
        const splitTitle = new SplitType(contactTitle, { types: 'chars' });

        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    if (contactSubtitle && !prefersReducedMotion) {
        gsap.from(contactSubtitle, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: 0.4,
            ease: 'power3.out'
        });
    }

    // Animation des infos de contact
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo && !prefersReducedMotion) {
        const contactItems = contactInfo.querySelectorAll('.contact-info__item');
        
        gsap.from(contactItems, {
            opacity: 0,
            x: -50,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-layout',
                start: 'top 70%'
            }
        });
    }

    // Animation du formulaire
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && !prefersReducedMotion) {
        const formFields = contactForm.querySelectorAll('.contact-form__field');
        
        gsap.from(formFields, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-layout',
                start: 'top 70%'
            }
        });
    }
});

// Ajouter l'animation d'ouverture depuis la miniature pour la lightbox
if (typeof gsap !== 'undefined' && typeof Flip !== 'undefined') {
    // Cette fonction sera appelee depuis main.js quand on ouvre la lightbox
    window.animateLightboxOpen = function(clickedElement) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const lightbox = document.getElementById('lightbox');
            const lightboxContent = lightbox.querySelector('.lightbox__content');

            // Animation depuis la position de l'element clique
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
