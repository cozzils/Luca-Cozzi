/* ============================================
   LUCA COZZI — PORTFOLIO INTERACTIONS
   Scroll animations, typed text, custom cursor
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loader ----
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initRevealAnimations();
    }, 2400);
    document.body.style.overflow = 'hidden';

    // ---- Custom Cursor ----
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mx = 0, my = 0;
        let fx = 0, fy = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
        });

        function followCursor() {
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            follower.style.left = fx + 'px';
            follower.style.top = fy + 'px';
            requestAnimationFrame(followCursor);
        }
        followCursor();

        // Enlarge on interactive elements
        const interactiveEls = 'a, button, .btn, .project-card, .skill-tag, .contact-link';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(interactiveEls)) {
                cursor.classList.add('active');
                follower.classList.add('active');
            }
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(interactiveEls)) {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            }
        });
    }

    // ---- Navbar Scroll ----
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ---- Mobile Menu ----
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const y = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // ---- Typed Text Effect ----
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Full-Stack Developer.',
        'Creo esperienze digitali.',
        'Front-End & Back-End.',
        'Automazioni & Chatbot.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before new phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing after loader finishes
    setTimeout(typeEffect, 2600);

    // ---- Scroll Reveal (IntersectionObserver) ----
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    // Stagger animation for sibling reveals
                    const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                    let delay = 0;
                    siblings.forEach((sib, i) => {
                        if (sib === entry.target) {
                            delay = i * 100;
                        }
                    });
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // ---- Counter Animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current);
                        }
                    }, 40);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }
    animateCounters();

    // ---- Parallax for hero bg grid ----
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            heroGrid.style.transform = `translateY(${scroll * 0.3}px)`;
        }, { passive: true });
    }

});
