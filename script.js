// =====================
// Navigation & Mobile Menu
// =====================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// =====================
// Load Skills Dynamically
// =====================

function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    const skills = getSkills();
    
    if (skills && skills.length > 0) {
        skillsGrid.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card fade-in';
            skillCard.style.animationDelay = `${index * 0.1}s`;
            
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-name">${skill.name}</div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });
    }
}

// =====================
// Load Projects Dynamically
// =====================

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projects = getProjects();
    
    if (projects && projects.length > 0) {
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.style.animationDelay = `${index * 0.15}s`;
            
            // Create tech tags HTML
            const techTags = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <a href="${project.liveDemo}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
}

// =====================
// Contact Form Handling
// =====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form data
    if (!validateForm(formData)) {
        showFormMessage('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Save to localStorage
    try {
        saveContactSubmission(formData);
        
        // Show success message
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
        
    } catch (error) {
        console.error('Error saving contact submission:', error);
        showFormMessage('Something went wrong. Please try again later.', 'error');
    }
});

// Form validation
function validateForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate minimum length
    if (data.name.length < 2 || data.message.length < 10) {
        return false;
    }
    
    return true;
}

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Hide form message
function hideFormMessage() {
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

// =====================
// Real-time Form Validation
// =====================

// Add visual feedback for form inputs
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(input.value)) {
                input.style.borderColor = '#10b981';
            } else {
                input.style.borderColor = '#ef4444';
            }
        } else {
            input.style.borderColor = '#10b981';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#2563eb';
    });
});

// =====================
// Typing Effect for Hero Section
// =====================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        setTimeout(() => {
            typeWriter(typingText, text, 40);
        }, 1000);
    }
});

// =====================
// Scroll to Top Button (Optional)
// =====================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-blue);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.background = '#3b82f6';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.background = '#2563eb';
});

// =====================
// Initialize Everything
// =====================

document.addEventListener('DOMContentLoaded', () => {
    // Load dynamic content
    loadSkills();
    loadProjects();
    
    // Log portfolio data (for debugging)
    console.log('Portfolio Data:', getPortfolioData());
    console.log('Skills:', getSkills());
    console.log('Projects:', getProjects());
    
    // You can view contact submissions in console (for development)
    console.log('Contact Submissions:', getContactSubmissions());
});

// =====================
// Utility Functions
// =====================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadSkills,
        loadProjects,
        validateForm,
        showFormMessage,
        hideFormMessage
    };
}
