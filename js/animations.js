/* =========================================
   ANIMATIONS.JS - Intersection Observers
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Reveal on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    const faders = document.querySelectorAll('.fade-on-scroll, .fade-in-up');
    faders.forEach(fader => {
        observer.observe(fader);
    });

});
