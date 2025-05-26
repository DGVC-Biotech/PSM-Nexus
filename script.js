// Core Functionality
// Three.js Background Animation
const initBackground = () => {
    if (!window.THREE) {
        console.error("THREE.js not loaded. Background animation cannot start.");
        const headerCanvas = document.getElementById('headerCanvas');
        if (headerCanvas) {
            headerCanvas.innerHTML = "<p style='color: white; text-align: center; padding-top: 20%;'>3D background failed to load.</p>";
        }
        return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const headerCanvasElement = document.getElementById('headerCanvas');
    if (headerCanvasElement) {
        headerCanvasElement.innerHTML = ''; // Clear previous content if any
        headerCanvasElement.appendChild(renderer.domElement);
    } else {
        console.error("headerCanvas element not found for Three.js");
        return;
    }


    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x64ffda,
        size: 2,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 1000;

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0002;
        particles.rotation.y += 0.0002;
        renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
};

// Parallax Effect
const handleParallax = () => {
    window.addEventListener('mousemove', (e) => {
        const headerContent = document.querySelector('.header-content'); // This class is not in the HTML
        if (headerContent) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            headerContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
};

// Sticky Navigation
const handleStickyNav = () => {
    const nav = document.querySelector('.main-header'); // Changed from .main-nav to .main-header
    if (!nav) return;
    const initialBackground = nav.style.background;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 25, 47, 0.95)'; // Ensure this is consistent with CSS
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = initialBackground || 'rgba(10, 25, 47, 0.9)'; // Revert or use initial
            nav.style.backdropFilter = 'blur(10px)'; // Or initial backdrop filter
        }
    });
};

// 3D Navigation Effects
const init3DNav = () => {
    const navItems = document.querySelectorAll('.nav-3d-item');
    if (navItems.length === 0) return;

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjusted offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return;
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        navItems.forEach((item, index) => {
            const depth = 1 + (index * 0.15);
            const translateZ = 20 * depth;
            item.style.transform = `translateZ(${translateZ}px) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
    });
    
    document.addEventListener('mouseleave', function() {
        navItems.forEach(item => {
            item.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        });
    });
    
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); // Initial call
};

// Feature-specific functionality (placeholders from original script)
const observePortfolio = () => { /* ... existing code ... */ };
const handleQuoteForm = () => { /* ... existing code ... */ };
const observeFeatures = () => { /* ... existing code ... */ };
const initHeroSlider = () => { /* ... existing code ... */ };


// Handle contact form submission
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation or AJAX submission can be handled here if not using Formspree's default
            // For Formspree, usually, no extra JS is needed for basic submission
            console.log('Contact form submitted');
        });
    }
};

// Mobile Menu Functionality
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a'); // Target 'a' tags for click

    if (!hamburger || !navLinks || links.length === 0) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        links.forEach((link, index) => {
            const li = link.parentElement;
            if (navLinks.classList.contains('active')) {
                li.style.animation = `slideIn 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                li.style.animation = '';
            }
        });
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                links.forEach(l => l.parentElement.style.animation = '');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(link => link.parentElement.style.animation = '');
        }
    });
};


// --- CHATBOT FUNCTIONALITY ---

// Service information database
const serviceInfo = {
    frontend: {
        name: "Frontend Development",
        price: "$499",
        features: [
            "Responsive Design", "SEO Optimization", "Modern UI/UX",
            "Performance Optimization", "3 Months Free Maintenance"
        ],
        description: "Custom website solutions with modern design, focusing on user experience and performance.",
        keywords: ["frontend", "web development", "website", "ui/ux", "user interface", "web design", "coding website"]
    },
    resume: {
        name: "Resume Writing",
        price: "$99",
        features: [
            "ATS-Friendly Format", "Keyword Optimization", "2 Revision Rounds",
            "Cover Letter", "LinkedIn Profile Update"
        ],
        description: "Professional resume and cover letter crafting services to help you stand out.",
        keywords: ["resume", "cv", "curriculum vitae", "cover letter", "linkedin profile", "job application"]
    },
    portfolioSite: { // Changed key for clarity
        name: "Portfolio Website",
        price: "$299",
        features: [
            "Custom Design", "Project Showcase", "Contact Form",
            "Analytics Integration", "Domain Setup"
        ],
        description: "Custom portfolio development to showcase your skills and projects effectively.",
        keywords: ["portfolio website", "personal website", "project showcase", "online portfolio"]
    },
    molecular: {
        name: "Molecular Docking",
        price: "$799",
        features: [
            "Structure Optimization", "Binding Site Analysis", "Energy Calculations",
            "Results Visualization", "Detailed Report"
        ],
        description: "Advanced molecular analysis for drug discovery and bioinformatics research.",
        keywords: ["molecular docking", "bioinformatics", "drug discovery", "protein ligand", "simulation"]
    },
    protein: {
        name: "Protein-Protein Docking",
        price: "$999",
        features: [
            "Interface Analysis", "Conformational Sampling", "Interaction Maps",
            "Stability Analysis", "Research Report"
        ],
        description: "Complex protein interaction analysis to understand biological pathways.",
        keywords: ["protein-protein docking", "protein interaction", "ppi", "complex analysis", "biophysics"]
    }
};

const companyInfo = {
    name: "PSM Nexus",
    description: "PSM Nexus revolutionizes project and service management through cutting-edge digital solutions. We empower organizations with intelligent automation and seamless integration, transforming complex workflows into efficient, scalable processes for the digital age. Our core services include web development and advanced bioinformatics analysis."
};

const portfolioHighlights = {
    web: [
        { name: "Event Registration Platform", tech: ["React", "Node.js", "Database"], desc: "An advanced event management system with real-time updates." },
        { name: "Dynamic Portfolio Website", tech: ["HTML", "CSS", "JavaScript"], desc: "A modern responsive portfolio with interactive elements." }
    ],
    bio: [
        { name: "Molecular Docking Analysis", tech: ["Bioinformatics tools", "Visualization"], desc: "Advanced molecular interaction visualization and analysis." },
        { name: "Protein-Protein Docking", tech: ["Computational methods", "Servers"], desc: "A high-performance protein interaction prediction system." }
    ]
};

// Add message to chat
const addMessage = (text, sender, isHTML = false) => {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    if (isHTML) {
        messageContent.innerHTML = text;
    } else {
        messageContent.textContent = text;
    }
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Show typing indicator
const showTypingIndicator = () => {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return null;

    const indicator = document.createElement('div');
    indicator.className = 'message bot typing-indicator';
    indicator.innerHTML = `<div class="message-content"><span></span><span></span><span></span></div>`;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
};


// AI response generator
const generateResponse = (message) => {
    message = message.toLowerCase().trim();

    // Greetings
    if (["hi", "hello", "hey", "greetings", "good day"].some(greet => message.startsWith(greet))) {
        return "Hello there! I'm the PSM Nexus assistant. How can I help you today?";
    }

    // Farewells
    if (["bye", "goodbye", "see you", "take care", "later"].some(farewell => message.includes(farewell))) {
        return "Goodbye! Feel free to reach out if you have more questions. Have a great day!";
    }

    // Thanks
    if (["thanks", "thank you", "cool", "awesome", "great", "ok", "okay", "perfect"].some(thanks => message.includes(thanks))) {
        return "You're welcome! Is there anything else I can assist you with?";
    }
    
    // How are you?
    if (message.includes("how are you")) {
        return "I'm doing great, ready to help you learn about PSM Nexus! What's on your mind?";
    }

    // Company Information
    if (message.includes("psm nexus") && (message.includes("what is") || message.includes("tell me about") || message.includes("who are you"))) {
        return `${companyInfo.name}: ${companyInfo.description} You can ask about our specific services like Frontend Development, Resume Writing, Portfolio Websites, Molecular Docking, or Protein-Protein Docking.`;
    }
    if (message.includes("what do you do") || message.includes("what services") && message.includes("offer")) {
        const serviceNames = Object.values(serviceInfo).map(s => s.name).join(', ');
        return `At PSM Nexus, we offer a range of services including: ${serviceNames}. Which one are you interested in?`;
    }


    // Portfolio/Projects
    const portfolioKeywords = ["portfolio", "project", "work", "example", "case stud", "previous work"];
    if (portfolioKeywords.some(kw => message.includes(kw))) {
        let response = "We have worked on various projects. You can find them in the 'Our Projects' section. <br>";
        if (message.includes("web") || message.includes("website") || message.includes("frontend")) {
            response += "For web development, we've built things like: <ul>";
            portfolioHighlights.web.forEach(p => {
                response += `<li><b>${p.name}</b>: ${p.desc} (Tech: ${p.tech.join(', ')})</li>`;
            });
            response += "</ul>";
            return { text: response, isHTML: true };
        } else if (message.includes("bio") || message.includes("molecular") || message.includes("protein") || message.includes("bioinformatics")) {
            response += "In bioinformatics, our projects include: <ul>";
            portfolioHighlights.bio.forEach(p => {
                response += `<li><b>${p.name}</b>: ${p.desc} (Focus: ${p.tech.join(', ')})</li>`;
            });
            response += "</ul>";
            return { text: response, isHTML: true };
        }
        response += "Are you interested in web development projects or bioinformatics projects?";
        return { text: response, isHTML: true };
    }

    // Service-specific inquiries
    for (const [key, service] of Object.entries(serviceInfo)) {
        if (service.keywords.some(kw => message.includes(kw))) {
            let detail = "";
            if (message.includes("price") || message.includes("cost") || message.includes("how much")) {
                detail = `Our ${service.name} service starts from <b>${service.price}</b>.`;
            } else if (message.includes("feature") || message.includes("include") || message.includes("what do i get")) {
                detail = `The ${service.name} service includes: <ul>${service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}</ul>`;
            } else if (message.includes("tell me more") || message.includes("details")) {
                 detail = `${service.description} It starts from <b>${service.price}</b> and key features are: <ul>${service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}</ul>`;
            }

            if (detail) {
                 return { text: `${detail} <br>Would you like to know more about this or another service?`, isHTML: true };
            }
            // General mention of the service
            return { text: `Yes, we offer ${service.name}. ${service.description} It starts from <b>${service.price}</b>. What specific information are you looking for (e.g., features, pricing)?`, isHTML: true };
        }
    }
    
    // Contact related
    if (message.includes("contact") || message.includes("speak") || message.includes("talk") || message.includes("email") || message.includes("phone")) {
        return "You can reach us by filling out the contact form in the 'Contact Us' section. If you provide your details and query there, we'll get back to you as soon as possible!";
    }

    // Default fallback
    return "I'm here to help with questions about PSM Nexus services, our portfolio, and how to contact us. For example, you could ask 'Tell me about Frontend Development' or 'What kind of projects have you done?'. If I can't assist, please use the contact form for detailed inquiries.";
};

// Simulate AI response generation (can be made async if calling a real API later)
const generateAIResponse = async (message) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const botReplyData = generateResponse(message);
            if (typeof botReplyData === 'string') {
                resolve({ text: botReplyData, isHTML: false });
            } else {
                resolve(botReplyData); // { text: "...", isHTML: true }
            }
        }, Math.random() * 800 + 400); // Simulate thinking time
    });
};


// Chat Widget Initialization and Message Handling
const initChatWidget = () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.querySelector('.chat-container');
    const minimizeChat = document.getElementById('minimizeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage'); // Renamed for clarity

    if (!chatToggle || !chatContainer || !minimizeChat || !chatMessages || !userInput || !sendMessageBtn) {
        console.error("Chat widget elements not found. Chat cannot initialize.");
        return;
    }

    chatMessages.innerHTML = ''; // Clear any existing messages
    addWelcomeMessage();
    
    chatToggle.addEventListener('click', () => {
        chatContainer.style.display = 'flex';
        chatContainer.classList.add('active');
        chatToggle.style.display = 'none'; // Hide toggle when chat is open
    });

    minimizeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        setTimeout(() => {
            chatContainer.style.display = 'none';
            chatToggle.style.display = 'flex'; // Show toggle when chat is minimized
        }, 300); // Match animation duration if any
    });

    const handleSendMessage = async () => {
        const messageText = userInput.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            userInput.value = '';
            
            const indicator = showTypingIndicator();
            
            const response = await generateAIResponse(messageText);
            if (indicator) indicator.remove();
            addMessage(response.text, 'bot', response.isHTML);
        }
    };

    sendMessageBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
};

// Add suggested questions to the chat
const addSuggestedQuestions = () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage'); // Button to click

    if (!chatMessages || !userInput || !sendMessageBtn) return;

    const categories = [
        {
            category: "About Our Services",
            questions: [
                "What services do you offer?",
                "Tell me about Molecular Docking.",
                "How much does a Portfolio Website cost?",
                "What's included in Resume Writing?",
            ]
        },
        {
            category: "About PSM Nexus",
            questions: [
                "What is PSM Nexus?",
                "Can I see your portfolio?",
                "How can I contact you?",
            ]
        }
    ];

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggested-questions';
    
    categories.forEach(cat => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'question-category';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = cat.category;
        categoryDiv.appendChild(categoryTitle);
        
        const questionsList = document.createElement('div');
        questionsList.className = 'questions-list';
        
        cat.questions.forEach(qText => {
            const questionBtn = document.createElement('button');
            questionBtn.className = 'suggested-question';
            questionBtn.textContent = qText;
            questionBtn.addEventListener('click', () => {
                userInput.value = qText;
                sendMessageBtn.click(); // Programmatically click the send button
            });
            questionsList.appendChild(questionBtn);
        });
        
        categoryDiv.appendChild(questionsList);
        suggestionsDiv.appendChild(categoryDiv);
    });
    
    chatMessages.appendChild(suggestionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Add initial welcome message and suggestions
const addWelcomeMessage = () => {
    addMessage(
        "Hello! 👋 I'm your PSM Nexus assistant. I can help you with information about our services, pricing, portfolio, and more. Feel free to ask a question or choose from the suggestions below.",
        'bot'
    );
    addSuggestedQuestions();
};


// Initialize all features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    // handleParallax(); // .header-content class is missing in HTML, so this might not work as intended.
    handleStickyNav();
    init3DNav();
    
    // Placeholders from original script - implement or remove if not needed
    // initHeroSlider(); 
    // observePortfolio();
    // handleQuoteForm();
    // observeFeatures();

    initContactForm();
    initMobileMenu(); 
    initChatWidget();
});
