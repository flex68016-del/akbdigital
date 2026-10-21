/* ========================================
   Portfolio AKB - Animations GSAP
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Enregistrer les plugins GSAP
    gsap.registerPlugin(ScrollTrigger, Flip, SplitType);

    // ========================================
    // Loader d'introduction (une fois par session)
    // ========================================
    const loader = document.querySelector('.loader');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
});
