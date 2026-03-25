// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Toggle aria-expanded for accessibility
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close mobile menu if clicked outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!navList.contains(event.target) && !navToggle.contains(event.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    });

    // Smooth scrolling for internal links (using CSS scroll-behavior, but this is a fallback/enhancement)
    // No specific JS for smooth scrolling as `scroll-behavior: smooth;` handles it well.
    // However, if we wanted to animate the scroll (e.g., easing functions), we'd use JS.
    // For this project, CSS `scroll-behavior: smooth;` is sufficient and cleaner.

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Optional: Add a simple fade-in animation for sections on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-on-scroll'); // Add a class for initial hidden state
        observer.observe(section);
    });
});

/*
    Add these styles to your style.css for the fade-in animation:

    .fade-in-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in-on-scroll.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    // Also add body.no-scroll for mobile menu overlay:
    body.no-scroll {
        overflow: hidden;
    }
*/