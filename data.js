// Portfolio Data Structure
const portfolioData = {
    // Personal Information
    personal: {
        name: "Abhishek Padhi",
        title: "Full Stack Developer",
        tagline: "Building modern, scalable web applications with passion and precision",
        email: "abhishekpadhi1764@gmail.com",
        phone: "+91 93373 04682",
        location: "Pune, India",
        education: "Bachelor's in Computer Engineering",
        github: "https://github.com/abhishekp-0",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername"
    },

    // Skills with categories
    skills: [
        // Frontend Technologies
        { name: "HTML5", icon: "fab fa-html5", category: "frontend" },
        { name: "CSS3", icon: "fab fa-css3-alt", category: "frontend" },
        { name: "JavaScript", icon: "fab fa-js", category: "frontend" },
        { name: "React", icon: "fab fa-react", category: "frontend" },
        { name: "Vue.js", icon: "fab fa-vuejs", category: "frontend" },
        { name: "Bootstrap", icon: "fab fa-bootstrap", category: "frontend" },
        
        // Backend Technologies
        { name: "Node.js", icon: "fab fa-node", category: "backend" },
        { name: "Python", icon: "fab fa-python", category: "backend" },
        { name: "PHP", icon: "fab fa-php", category: "backend" },
        { name: "MongoDB", icon: "fas fa-database", category: "backend" },
        { name: "MySQL", icon: "fas fa-database", category: "backend" },
        { name: "Express.js", icon: "fas fa-server", category: "backend" },
        
        // Tools & Others
        { name: "Git", icon: "fab fa-git-alt", category: "tools" },
        { name: "GitHub", icon: "fab fa-github", category: "tools" },
        { name: "Docker", icon: "fab fa-docker", category: "tools" },
        { name: "AWS", icon: "fab fa-aws", category: "tools" },
        { name: "VS Code", icon: "fas fa-code", category: "tools" },
        { name: "REST API", icon: "fas fa-plug", category: "tools" }
    ],

    // Projects Portfolio
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce platform with shopping cart, payment integration, user authentication, and admin dashboard. Built with modern web technologies for optimal performance.",
            image: "https://via.placeholder.com/600x400/1a365d/ffffff?text=E-Commerce+Platform",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
            github: "https://github.com/yourusername/ecommerce-platform",
            liveDemo: "https://your-ecommerce-demo.com",
            featured: true
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, team collaboration features, drag-and-drop interface, and progress tracking capabilities.",
            image: "https://via.placeholder.com/600x400/2563eb/ffffff?text=Task+Manager",
            technologies: ["Vue.js", "Firebase", "Vuex", "TailwindCSS"],
            github: "https://github.com/yourusername/task-manager",
            liveDemo: "https://your-taskmanager-demo.com",
            featured: true
        },
        {
            id: 3,
            title: "Social Media Dashboard",
            description: "An analytics dashboard for social media management with data visualization, post scheduling, engagement metrics, and multi-platform integration.",
            image: "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Social+Dashboard",
            technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
            github: "https://github.com/yourusername/social-dashboard",
            liveDemo: "https://your-social-dashboard-demo.com",
            featured: true
        },
        {
            id: 4,
            title: "Weather Forecast App",
            description: "A beautiful weather application with real-time weather data, 7-day forecasts, location-based services, and interactive weather maps using external APIs.",
            image: "https://via.placeholder.com/600x400/1e293b/ffffff?text=Weather+App",
            technologies: ["JavaScript", "OpenWeather API", "HTML5", "CSS3"],
            github: "https://github.com/yourusername/weather-app",
            liveDemo: "https://your-weather-demo.com",
            featured: false
        },
        {
            id: 5,
            title: "Blog Platform",
            description: "A modern blogging platform with markdown support, comments system, categories, tags, SEO optimization, and responsive design for all devices.",
            image: "https://via.placeholder.com/600x400/2c5282/ffffff?text=Blog+Platform",
            technologies: ["Next.js", "MongoDB", "TailwindCSS", "Markdown"],
            github: "https://github.com/yourusername/blog-platform",
            liveDemo: "https://your-blog-demo.com",
            featured: false
        },
        {
            id: 6,
            title: "Portfolio Generator",
            description: "An automated portfolio website generator that allows users to create professional portfolio sites with customizable themes, templates, and easy deployment.",
            image: "https://via.placeholder.com/600x400/0f172a/ffffff?text=Portfolio+Generator",
            technologies: ["React", "Node.js", "Express", "Docker"],
            github: "https://github.com/yourusername/portfolio-generator",
            liveDemo: "https://your-portfolio-generator-demo.com",
            featured: false
        }
    ]
};

// Initialize localStorage with portfolio data
function initializeData() {
    // Check if data already exists in localStorage
    if (!localStorage.getItem('portfolioData')) {
        // Store the portfolio data in localStorage
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        console.log('Portfolio data initialized in localStorage');
    } else {
        console.log('Portfolio data already exists in localStorage');
    }
}

// Get portfolio data from localStorage
function getPortfolioData() {
    const data = localStorage.getItem('portfolioData');
    return data ? JSON.parse(data) : portfolioData;
}

// Update portfolio data in localStorage
function updatePortfolioData(newData) {
    localStorage.setItem('portfolioData', JSON.stringify(newData));
    console.log('Portfolio data updated in localStorage');
}

// Get all projects
function getProjects() {
    const data = getPortfolioData();
    return data.projects || [];
}

// Get featured projects only
function getFeaturedProjects() {
    const projects = getProjects();
    return projects.filter(project => project.featured);
}

// Get all skills
function getSkills() {
    const data = getPortfolioData();
    return data.skills || [];
}

// Get skills by category
function getSkillsByCategory(category) {
    const skills = getSkills();
    return skills.filter(skill => skill.category === category);
}

// Get personal information
function getPersonalInfo() {
    const data = getPortfolioData();
    return data.personal || {};
}

// Save contact form submission to localStorage
function saveContactSubmission(formData) {
    // Get existing submissions
    let submissions = localStorage.getItem('contactSubmissions');
    submissions = submissions ? JSON.parse(submissions) : [];
    
    // Add new submission with timestamp
    const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    submissions.push(submission);
    
    // Save back to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    console.log('Contact submission saved:', submission);
    
    return submission;
}

// Get all contact submissions
function getContactSubmissions() {
    const submissions = localStorage.getItem('contactSubmissions');
    return submissions ? JSON.parse(submissions) : [];
}

// Initialize data when script loads
initializeData();

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        portfolioData,
        getPortfolioData,
        updatePortfolioData,
        getProjects,
        getFeaturedProjects,
        getSkills,
        getSkillsByCategory,
        getPersonalInfo,
        saveContactSubmission,
        getContactSubmissions
    };
}
