// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-card, .link-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header background change on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

// Function to update header background based on theme and scroll
function updateHeaderBackground() {
    if (!header) return;
    const currentScroll = window.pageYOffset;
    const isDayMode = body.classList.contains('day-mode');
    
    if (currentScroll > 100) {
        if (isDayMode) {
            header.style.backgroundColor = 'rgba(135, 206, 235, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(26, 35, 50, 0.98)';
        }
        header.style.backdropFilter = 'blur(10px)';
    } else {
        if (isDayMode) {
            header.style.backgroundColor = 'rgba(135, 206, 235, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(26, 35, 50, 0.95)';
        }
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on window resize if it becomes desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--primary-blue)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// Fade in animation for hero content
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transition = 'opacity 1s ease-in';
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// Theme Toggle Functionality
const body = document.body;

// Theme Toggle Functionality - Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to night mode
    const savedTheme = localStorage.getItem('theme') || 'night';
    if (savedTheme === 'day') {
        themeToggle.checked = true;
        body.classList.add('day-mode');
    } else {
        body.classList.remove('day-mode');
    }
    
    // Initialize header background
    updateHeaderBackground();
    
    // Handle theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('day-mode');
            localStorage.setItem('theme', 'day');
        } else {
            body.classList.remove('day-mode');
            localStorage.setItem('theme', 'night');
        }
        // Update header background immediately
        updateHeaderBackground();
    });
});

// Update header background on scroll
window.addEventListener('scroll', () => {
    updateHeaderBackground();
    lastScroll = window.pageYOffset;
});

// Update sun and moon positions for ray effects
function updateSunMoonPositions() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    
    if (sun && sun.offsetParent !== null) {
        const sunRect = sun.getBoundingClientRect();
        const sunX = (sunRect.left + sunRect.width / 2) / window.innerWidth * 100;
        const sunY = (sunRect.top + sunRect.height / 2) / window.innerHeight * 100;
        document.documentElement.style.setProperty('--sun-x', `${sunX}%`);
        document.documentElement.style.setProperty('--sun-y', `${sunY}%`);
    }
    
    if (moon && moon.offsetParent !== null) {
        const moonRect = moon.getBoundingClientRect();
        const moonX = (moonRect.left + moonRect.width / 2) / window.innerWidth * 100;
        const moonY = (moonRect.top + moonRect.height / 2) / window.innerHeight * 100;
        document.documentElement.style.setProperty('--moon-x', `${moonX}%`);
        document.documentElement.style.setProperty('--moon-y', `${moonY}%`);
    }
}

// Update positions on load, resize, and scroll
window.addEventListener('load', updateSunMoonPositions);
window.addEventListener('resize', updateSunMoonPositions);
window.addEventListener('scroll', updateSunMoonPositions);

// Update positions when theme changes
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            setTimeout(updateSunMoonPositions, 600); // Wait for transition
        });
    }
    updateSunMoonPositions();
});
