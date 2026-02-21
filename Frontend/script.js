// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Reveal Animation using Intersection Observer
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            // Staggering logic for specific containers
            if (element.classList.contains('stagger-container')) {
                const children = element.querySelectorAll('.reveal');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('active');
                });
            } else if (!element.closest('.stagger-container')) {
                // Only animate if not part of a staggered container (which is handled by the container itself)
                element.classList.add('active');
            }

            observer.unobserve(element);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(revealCallback, revealOptions);

// Target sections and other reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    // If it's a child of a staggered container, we let the container handle it
    if (!el.closest('.skills-grid') && !el.closest('.projects-section')) {
        observer.observe(el);
    }
});

// Observe containers that need staggered children
document.querySelectorAll('.skills-grid, .projects-section').forEach(container => {
    container.classList.add('stagger-container');
    observer.observe(container);
});
