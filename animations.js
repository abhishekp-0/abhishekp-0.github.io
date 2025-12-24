// =====================
// Intersection Observer for Scroll Animations
// =====================

// Configure Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Callback function for intersection observer
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
};

// Create observer instance
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe all fade-in elements
function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Initialize observer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initial observation
    observeElements();
    
    // Re-observe after dynamic content loads
    setTimeout(() => {
        observeElements();
    }, 500);
});

// =====================
// Parallax Effect for Hero Section
// =====================

function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Initialize parallax effect
parallaxEffect();

// =====================
// Animated Skill Cards
// =====================

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// =====================
// Project Card Hover Effects
// =====================

function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add mouse move effect for 3D tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// =====================
// Counter Animation for Stats
// =====================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// =====================
// Smooth Reveal for Sections
// =====================

function revealSections() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(section);
    });
}

// =====================
// Text Animation Effects
// =====================

function animateText(element, delay = 0) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeInChar 0.5s ease forwards ${delay + (index * 0.03)}s`;
        element.appendChild(span);
    });
}

// Add CSS animation for character fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stagger-fade {
        opacity: 0;
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse-animation {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// =====================
// Navigation Link Active Animation
// =====================

function animateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class with animation
            this.classList.add('active');
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(37, 99, 235, 0.3);
                width: 100px;
                height: 100px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// =====================
// Scroll Progress Indicator
// =====================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(37, 99, 235, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// =====================
// Button Hover Effects
// =====================

function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add button ripple animation
const buttonStyle = document.createElement('style');
buttonStyle.textContent = `
    @keyframes buttonRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(buttonStyle);

// =====================
// Form Input Animation
// =====================

function animateFormInputs() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-5px)';
                label.style.color = '#2563eb';
                label.style.transition = 'all 0.3s ease';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = 'translateY(0)';
                    label.style.color = '#1a365d';
                }
            });
        }
    });
}

// =====================
// Initialize All Animations
// =====================

function initializeAnimations() {
    // Reveal sections on scroll
    revealSections();
    
    // Enhance navigation
    animateActiveNavLink();
    
    // Create scroll progress bar
    createScrollProgress();
    
    // Enhance buttons
    enhanceButtons();
    
    // Animate form inputs
    animateFormInputs();
    
    // Wait for dynamic content to load before animating
    setTimeout(() => {
        animateSkillCards();
        enhanceProjectCards();
    }, 600);
}

// Run animations when page loads
window.addEventListener('load', () => {
    initializeAnimations();
});

// Re-initialize animations after dynamic content loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        observeElements();
        enhanceProjectCards();
    }, 1000);
});

// =====================
// Performance Optimization
// =====================

// Use Intersection Observer for lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// =====================
// Export Functions
// =====================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        observeElements,
        animateSkillCards,
        enhanceProjectCards,
        animateCounter,
        revealSections,
        initializeAnimations
    };
}
