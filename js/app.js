// ===== PIXELSCRIPT WEBSITE INTERACTIVE FEATURES =====

// ===== GLOBAL VARIABLES =====
let isScrolling = false;
let lastScrollTop = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeSpecialEffects();
    initializePixelEffects();
    initializeMockupInteraction();
    initializeDownloadTracking();
    initializeSmoothScrolling();
    initializeParallax();
    
    // Add loading animations
    addLoadingAnimations();
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navHamburger) {
        navHamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navHamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navHamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            navHamburger.classList.remove('active');
        }
    });
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', throttle(handleScroll, 16)); // 60fps
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('navbar');
    const progressBar = document.querySelector('.scroll-progress-bar');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    
    // Add scrolled class to navbar
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Parallax effects
    handleParallax(scrollTop);
    
    lastScrollTop = scrollTop;
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    // Initialize parallax elements
    window.addEventListener('scroll', throttle(handleParallax, 16));
}

function handleParallax(scrollTop) {
    const heroBackground = document.querySelector('.hero-background');
    const floatingElements = document.querySelector('.floating-elements');
    
    if (heroBackground) {
        const speed = scrollTop * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
    
    if (floatingElements) {
        const speed = scrollTop * 0.3;
        floatingElements.style.transform = `translateY(${speed}px)`;
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .about-card');
    animateElements.forEach(el => observer.observe(el));

    const revealElements = document.querySelectorAll('.section-header, .hero-content, .hero-image, .about-text, .about-image, .download-content');
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });
}

// ===== SPECIAL EFFECTS =====
function initializeSpecialEffects() {
    createScrollProgressBar();
    createPointerGlow();
    createAmbientParticles();
    createParticleCanvas();
    initializeCardTilt();
}

function createScrollProgressBar() {
    if (document.querySelector('.scroll-progress')) {
        return;
    }

    const progressTrack = document.createElement('div');
    progressTrack.className = 'scroll-progress';

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';

    progressTrack.appendChild(progressBar);
    document.body.prepend(progressTrack);
}

function createPointerGlow() {
    if (document.querySelector('.pointer-glow')) {
        return;
    }

    const glow = document.createElement('div');
    glow.className = 'pointer-glow';
    document.body.appendChild(glow);

    let rafId = null;
    document.addEventListener('pointermove', function(e) {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    });
}

function createAmbientParticles() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground || heroBackground.querySelector('.ambient-particle')) {
        return;
    }

    const particleCount = 18;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.className = 'ambient-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 8}s`;
        particle.style.width = `${4 + Math.random() * 8}px`;
        particle.style.height = particle.style.width;
        heroBackground.appendChild(particle);
    }
}

function createParticleCanvas() {
    if (document.querySelector('.particle-canvas')) {
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        active: false
    };

    const particles = [];
    let width = 0;
    let height = 0;
    const maxDevicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * maxDevicePixelRatio);
        canvas.height = Math.round(height * maxDevicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(maxDevicePixelRatio, 0, 0, maxDevicePixelRatio, 0, 0);

        particles.length = 0;
        const particleCount = Math.min(120, Math.max(70, Math.floor((width * height) / 18000)));
        for (let index = 0; index < particleCount; index++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: 0.7 + Math.random() * 2.3,
                hue: 290 + Math.random() * 60,
                alpha: 0.35 + Math.random() * 0.55
            });
        }
    }

    function drawFrame() {
        context.clearRect(0, 0, width, height);

        for (let index = 0; index < particles.length; index++) {
            const particle = particles[index];
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (pointer.active && distance < 180) {
                const force = (180 - distance) / 1800;
                particle.vx -= dx * force;
                particle.vy -= dy * force;
            }

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.995;
            particle.vy *= 0.995;

            if (particle.x < -20) particle.x = width + 20;
            if (particle.x > width + 20) particle.x = -20;
            if (particle.y < -20) particle.y = height + 20;
            if (particle.y > height + 20) particle.y = -20;

            context.beginPath();
            context.fillStyle = `hsla(${particle.hue}, 90%, 70%, ${particle.alpha})`;
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();

            for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex++) {
                const other = particles[otherIndex];
                const lineDx = particle.x - other.x;
                const lineDy = particle.y - other.y;
                const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

                if (lineDistance < 150) {
                    context.beginPath();
                    context.strokeStyle = `rgba(168, 85, 247, ${(150 - lineDistance) / 900})`;
                    context.lineWidth = 1;
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                }
            }
        }

        requestAnimationFrame(drawFrame);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', function(event) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
    });
    window.addEventListener('pointerleave', function() {
        pointer.active = false;
    });

    resizeCanvas();
    drawFrame();
}

function initializeCardTilt() {
    const tiltTargets = document.querySelectorAll('.feature-card, .gallery-item, .download-btn, .about-card');

    tiltTargets.forEach(target => {
        target.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const rotateX = ((offsetY / rect.height) - 0.5) * -8;
            const rotateY = ((offsetX / rect.width) - 0.5) * 8;

            this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        target.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ===== PIXEL EFFECTS =====
function initializePixelEffects() {
    createFloatingElements();
    animateTextEditor();
}

function createFloatingElements() {
    const heroBackground = document.querySelector('.floating-elements');
    if (!heroBackground) return;
    
    // Create floating text elements and cursor indicators
    const elements = ['A', 'B', 'C', '1', '2', '3', '|', '_'];
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[i];
        element.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 15}px;
            font-family: 'JetBrains Mono', monospace;
            background: linear-gradient(135deg, #ec4899, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatRandom ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.3};
            font-weight: 600;
        `;
        heroBackground.appendChild(element);
    }
    
    // Add floating animation keyframes
    if (!document.querySelector('#floating-animations')) {
        const style = document.createElement('style');
        style.id = 'floating-animations';
        style.textContent = `
            @keyframes floatRandom {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) rotate(0deg);
                }
                25% {
                    transform: translateY(-30px) translateX(20px) rotate(90deg);
                }
                50% {
                    transform: translateY(-60px) translateX(-10px) rotate(180deg);
                }
                75% {
                    transform: translateY(-20px) translateX(-30px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateTextEditor() {
    const textEditor = document.querySelector('.text-editor-mockup');
    if (!textEditor) return;
    
    // Create a realistic PixelScript+ interface mockup based on the actual app
    textEditor.innerHTML = `
        <div class="pixelscript-window">
            <div class="pixelscript-menubar">
                <span class="menu-item">File</span>
                <span class="menu-item">Edit</span>
                <span class="menu-item">Maths</span>
                <span class="menu-item">Utilities</span>
                <span class="menu-item">Settings</span>
            </div>
            <div class="pixelscript-editor">
                <div class="line-numbers">
                    <div class="line-number">1</div>
                    <div class="line-number">2</div>
                    <div class="line-number">3</div>
                    <div class="line-number">4</div>
                    <div class="line-number">5</div>
                    <div class="line-number">6</div>
                </div>
                <div class="text-content">
                    <div class="text-line">Welcome to PixelScript+</div>
                    <div class="text-line">A simple, extendable text editor.</div>
                    <div class="text-line"></div>
                    <div class="text-line">Start typing your thoughts here...</div>
                    <div class="text-line">Easy. Fast. Efficient.</div>
                    <div class="text-line current-line">Perfect for all your text editing needs<span class="cursor-blink">|</span></div>
                </div>
            </div>
        </div>
    `;
    
    // Add PixelScript+ specific styling
    if (!document.querySelector('#pixelscript-mockup-styles')) {
        const style = document.createElement('style');
        style.id = 'pixelscript-mockup-styles';
        style.textContent = `
            .pixelscript-window {
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, rgba(9, 12, 24, 0.96), rgba(14, 18, 35, 0.9));
                border-radius: 16px;
                overflow: hidden;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                color: #e5e7eb;
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 24px 50px rgba(2, 6, 23, 0.35);
            }
            .pixelscript-menubar {
                background: rgba(15, 23, 42, 0.85);
                padding: 8px 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                gap: 20px;
                font-size: 11px;
                backdrop-filter: blur(12px);
            }
            .menu-item {
                color: rgba(229, 231, 235, 0.82);
                cursor: pointer;
                padding: 2px 4px;
                transition: color 0.2s ease, transform 0.2s ease;
            }
            .menu-item:hover {
                color: #ffffff;
                transform: translateY(-1px);
            }
            .pixelscript-editor {
                display: flex;
                height: calc(100% - 38px);
            }
            .line-numbers {
                background: rgba(15, 23, 42, 0.8);
                color: rgba(148, 163, 184, 0.9);
                padding: 8px 4px;
                text-align: right;
                min-width: 38px;
                border-right: 1px solid rgba(255, 255, 255, 0.08);
                font-family: 'JetBrains Mono', monospace;
            }
            .line-number {
                line-height: 1.4;
                font-size: 11px;
            }
            .text-content {
                padding: 8px 12px;
                flex: 1;
                color: #f8fafc;
            }
            .text-line {
                line-height: 1.4;
                min-height: 1.4em;
            }
            .current-line {
                background: rgba(236, 72, 153, 0.12);
                border-radius: 8px;
                padding-left: 4px;
            }
            .cursor-blink {
                animation: blink 1s infinite;
                color: #f8fafc;
                font-weight: bold;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== MOCKUP INTERACTION =====
function initializeMockupInteraction() {
    const appMockup = document.querySelector('.app-mockup');
    if (!appMockup) return;
    
    // Add mouse move effect
    appMockup.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    appMockup.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(10deg) scale(1)';
    });
}

// ===== DOWNLOAD TRACKING =====
function initializeDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn, .btn-primary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track download (you can replace this with actual analytics)
            const platform = this.dataset.platform || 'unknown';
            console.log(`Download initiated for platform: ${platform}`);
            
            // Show download feedback
            showDownloadFeedback();
        });
    });
}

function showDownloadFeedback() {
    // Create temporary feedback message
    const feedback = document.createElement('div');
    feedback.innerHTML = '<i class="fas fa-rocket" aria-hidden="true"></i><span>Download starting...</span>';
    feedback.style.cssText = `
        position: fixed;
        top: 94px;
        right: 22px;
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        background: linear-gradient(160deg, rgba(8, 15, 31, 0.92), rgba(2, 6, 23, 0.96));
        color: rgba(229, 238, 251, 0.96);
        padding: 0.85rem 1.25rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(14px);
        font-weight: 600;
        letter-spacing: 0.01em;
        z-index: 10000;
        animation: slideInRight 0.35s ease;
        box-shadow: 0 20px 55px rgba(2, 6, 23, 0.46), 0 0 24px rgba(34, 211, 238, 0.18);
    `;
    
    document.body.appendChild(feedback);
    
    // Remove feedback after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
    
    // Add slide animations if not exist
    if (!document.querySelector('#feedback-animations')) {
        const style = document.createElement('style');
        style.id = 'feedback-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(120%) scale(0.95); opacity: 0; }
                to { transform: translateX(0) scale(1); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0) scale(1); opacity: 1; }
                to { transform: translateX(120%) scale(0.95); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== LOADING ANIMATIONS =====
function addLoadingAnimations() {
    const elements = document.querySelectorAll('.hero-content > *, .feature-card, .gallery-item');
    
    elements.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== UTILITY FUNCTIONS =====
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

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== GALLERY INTERACTION =====
function initializeGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.dataset.image;
            const imageAlt = this.querySelector('.gallery-title')?.textContent || 'Interface Preview';
            
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.innerHTML = `
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="modal-image" onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'><i class=\\'fas fa-image\\'></i><p>Image not found: ${imageAlt}</p></div>'">
                <div class="modal-caption">${imageAlt}</div>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            function closeModal() {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                        document.body.style.overflow = '';
                    }
                }, 300);
            }
            
            // Close on click outside image or close button
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('modal-close')) {
                    closeModal();
                }
            });
            
            // Close on escape key
            function handleEscape(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            }
            document.addEventListener('keydown', handleEscape);
            
            // Close button
            const closeBtn = modalContent.querySelector('.modal-close');
            closeBtn.addEventListener('click', closeModal);
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close modals and menus
            const modal = document.querySelector('.gallery-modal');
            const navMenu = document.getElementById('nav-menu');
            const navHamburger = document.getElementById('nav-hamburger');
            
            if (modal) {
                modal.click();
            }
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navHamburger.classList.remove('active');
            }
        }
    });
}

// ===== FINAL INITIALIZATION =====
window.addEventListener('load', function() {
    initializeGalleryModal();
    optimizePerformance();
    enhanceAccessibility();
    
    // Continue text editor animation
    setInterval(() => {
        animateTextEditor();
    }, 5000);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    // Recalculate positions and animations on resize
    updateActiveNavLink();
}, 250));
