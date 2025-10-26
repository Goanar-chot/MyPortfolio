// Premium Professional Animations and Interactions

class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallaxEffects();
        this.setupMorphingShapes();
        this.setupAdvancedScrollAnimations();
        this.setupInteractiveParticles();
        this.setupTypingAnimation();
        this.setupFloatingElements();
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax background elements
            document.querySelectorAll('.hero-section::before').forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupMorphingShapes() {
        // Create floating geometric shapes
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        shapesContainer.innerHTML = `
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
            <div class="shape shape-5"></div>
        `;
        document.body.appendChild(shapesContainer);

        // Animate shapes
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const duration = 15 + (index * 3);
            const delay = index * 2;
            
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `${delay}s`;
        });
    }

    setupAdvancedScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.skill-category, .timeline-item, .stat-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section, .hero-section').forEach(section => {
            observer.observe(section);
        });
    }

    setupInteractiveParticles() {
        // Create particle system for hero section
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        hero.appendChild(particlesContainer);

        // Generate particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    setupTypingAnimation() {
        const titles = document.querySelectorAll('.hero-title, header h1');
        
        titles.forEach(title => {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '2px solid rgba(255,255,255,0.7)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(title);
        });
    }

    setupFloatingElements() {
        // Add floating animation to various elements
        const floatingElements = document.querySelectorAll('.profile-picture, .stat-item, .skill-category');
        
        floatingElements.forEach((element, index) => {
            const duration = 3 + (index % 3);
            const delay = index * 0.5;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
}

// Enhanced Cursor Effects
class PremiumCursor {
    constructor() {
        this.cursor = null;
        this.cursorTrail = [];
        this.init();
    }

    init() {
        this.createCursor();
        this.setupCursorEvents();
        this.animateCursor();
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'premium-cursor';
        document.body.appendChild(this.cursor);

        // Cursor trail
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.animationDelay = `${i * 0.05}s`;
            document.body.appendChild(trail);
            this.cursorTrail.push(trail);
        }
    }

    setupCursorEvents() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Update cursor position
        const updateCursor = () => {
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
            
            // Update trail
            this.cursorTrail.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.left = mouseX + 'px';
                    trail.style.top = mouseY + 'px';
                }, index * 50);
            });
            
            requestAnimationFrame(updateCursor);
        };
        
        updateCursor();

        // Cursor interactions
        document.querySelectorAll('a, button, .btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }

    animateCursor() {
        // Add ripple effect on click
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
}

// Advanced Loading Animation
class PremiumLoader {
    constructor() {
        this.createLoader();
        this.showLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'premium-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <div class="loader-text">GC</div>
                </div>
                <div class="loader-progress">
                    <div class="loader-bar"></div>
                </div>
                <div class="loader-status">Loading Portfolio...</div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    showLoader() {
        const loader = document.getElementById('premium-loader');
        const progressBar = loader.querySelector('.loader-bar');
        const status = loader.querySelector('.loader-status');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress < 30) {
                status.textContent = 'Loading Assets...';
            } else if (progress < 60) {
                status.textContent = 'Initializing Components...';
            } else if (progress < 90) {
                status.textContent = 'Finalizing Experience...';
            } else {
                status.textContent = 'Ready!';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.remove();
                        document.body.classList.add('loaded');
                    }, 500);
                }, 500);
            }
        }, 100);
    }
}

// Initialize premium features
document.addEventListener('DOMContentLoaded', () => {
    new PremiumLoader();
    new PremiumAnimations();
    new PremiumCursor();
});

// Add premium styles for animations
const premiumAnimationStyles = `
<style>
/* Floating Shapes */
.floating-shapes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
}

.shape {
    position: absolute;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    border-radius: 50%;
    animation: floatShape 15s ease-in-out infinite;
}

.shape-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
}

.shape-3 {
    width: 60px;
    height: 60px;
    top: 80%;
    left: 20%;
    animation-delay: 4s;
}

.shape-4 {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 30%;
    animation-delay: 6s;
}

.shape-5 {
    width: 140px;
    height: 140px;
    top: 10%;
    right: 5%;
    animation-delay: 8s;
}

@keyframes floatShape {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.3;
    }
    25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-40px) rotate(180deg);
        opacity: 0.3;
    }
    75% {
        transform: translateY(-20px) rotate(270deg);
        opacity: 0.6;
    }
}

/* Particles */
.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
    }
}

/* Premium Cursor */
.premium-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.premium-cursor.cursor-hover {
    transform: scale(2);
    background: rgba(102, 126, 234, 0.8);
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
}

.cursor-trail {
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s ease;
}

.cursor-ripple {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(102, 126, 234, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
    animation: ripple 1s ease-out;
    transform: translate(-50%, -50%);
}

@keyframes ripple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

/* Premium Loader */
#premium-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
}

#premium-loader.fade-out {
    opacity: 0;
}

.loader-content {
    text-align: center;
    color: white;
}

.loader-logo {
    width: 120px;
    height: 120px;
    margin: 0 auto 30px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s ease-in-out infinite;
}

.loader-text {
    font-size: 2rem;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
}

.loader-progress {
    width: 300px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 20px auto;
}

.loader-bar {
    height: 100%;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.loader-status {
    font-size: 1.1rem;
    font-weight: 500;
    opacity: 0.9;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
    }
}

/* Float Animation */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Animate In Classes */
.animate-in {
    animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Hide cursor on touch devices */
@media (hover: none) {
    .premium-cursor,
    .cursor-trail,
    .cursor-ripple {
        display: none;
    }
}

/* Reduce animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
    .shape,
    .particle,
    .premium-cursor,
    .cursor-trail {
        animation: none;
    }
    
    .animate-in {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', premiumAnimationStyles);