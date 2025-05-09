// Core Functionality
// Three.js Background Animation
const initBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('headerCanvas').appendChild(renderer.domElement);

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
        const headerContent = document.querySelector('.header-content');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        headerContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
};

// Sticky Navigation
const handleStickyNav = () => {
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 25, 47, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 25, 47, 0.9)';
        }
    });
};

// 3D Navigation Effects
const init3DNav = () => {
    const navItems = document.querySelectorAll('.nav-3d-item');
    
    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    
    // 3D parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        navItems.forEach((item, index) => {
            const depth = 1 + (index * 0.15);
            const translateZ = 20 * depth;
            item.style.transform = `translateZ(${translateZ}px) rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
    });
    
    // Reset transform on mouse leave
    document.addEventListener('mouseleave', function() {
        navItems.forEach(item => {
            item.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
        });
    });
    
    // Set active nav item on scroll
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
};

// Feature-specific functionality
// Portfolio Cards Animation
const observePortfolio = () => {
    // ... existing code ...
};

// Handle contact form submission
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        });
    }
};

// Quote Form Handling
const handleQuoteForm = () => {
    // ... existing code ...
};

// Feature Cards Animation
const observeFeatures = () => {
    // ... existing code ...
};

// Hero Slider
const initHeroSlider = () => {
    // ... existing code ...
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    handleParallax();
    handleStickyNav();
    init3DNav();
    initHeroSlider();
    observePortfolio();
    handleQuoteForm();
    observeFeatures();
    initContactForm();
});

// Hamburger Menu Functionality
const initHamburgerMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
};

// Add to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    initHamburgerMenu();
});
