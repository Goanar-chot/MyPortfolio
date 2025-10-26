// 3D Interactive Elements
class Portfolio3D {
    constructor() {
        this.init();
    }

    init() {
        this.create3DSkillsCube();
        this.create3DScene();
        this.addInteractive3DElements();
        this.initParallax3D();
    }

    create3DSkillsCube() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const cubeContainer = document.createElement('div');
        cubeContainer.className = 'skills-cube-container';
        cubeContainer.innerHTML = `
            <div class="skills-cube">
                <div class="cube-face front">JavaScript</div>
                <div class="cube-face back">Python</div>
                <div class="cube-face right">AWS Cloud</div>
                <div class="cube-face left">Linux</div>
                <div class="cube-face top">Cybersecurity</div>
                <div class="cube-face bottom">IT Support</div>
            </div>
        `;

        const skillsContent = skillsSection.querySelector('.section-content');
        if (skillsContent) {
            skillsContent.insertBefore(cubeContainer, skillsContent.firstChild);
        }
    }

    create3DScene() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const scene3D = document.createElement('div');
        scene3D.className = 'scene-3d';
        scene3D.innerHTML = `
            <div class="floating-3d object-3d" style="top: 20%; left: 10%;">
                <div class="pyramid-3d">
                    <div class="pyramid-face base"></div>
                    <div class="pyramid-face front"></div>
                </div>
            </div>
            <div class="floating-3d object-3d" style="top: 60%; right: 15%;">
                <div class="loader-3d">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        `;

        heroSection.appendChild(scene3D);
    }

    addInteractive3DElements() {
        // Convert project boxes to 3D
        const projectBoxes = document.querySelectorAll('.project-box');
        projectBoxes.forEach(box => {
            box.classList.add('portfolio-item-3d');
            box.parentElement.classList.add('portfolio-3d');
        });

        // Add 3D skill cards
        this.create3DSkillCards();

        // Add 3D text effects to headers
        const headers = document.querySelectorAll('h1, h2');
        headers.forEach(header => {
            if (!header.classList.contains('hero-title')) {
                header.addEventListener('mouseenter', () => {
                    header.style.transform = 'perspective(500px) rotateX(15deg) scale(1.05)';
                    header.style.textShadow = '2px 2px 0px #0056b3, 4px 4px 0px #004085, 6px 6px 10px rgba(0,0,0,0.3)';
                });
                
                header.addEventListener('mouseleave', () => {
                    header.style.transform = 'perspective(500px) rotateX(0deg) scale(1)';
                    header.style.textShadow = 'none';
                });
            }
        });
    }

    create3DSkillCards() {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            const skills = ['HTML/CSS', 'JavaScript', 'Python', 'AWS', 'Linux', 'Security'];
            const cardContainer = document.createElement('div');
            cardContainer.className = 'skill-cards-3d-container';
            cardContainer.style.marginTop = '20px';

            skills.forEach(skill => {
                const card = document.createElement('div');
                card.className = 'skill-card-3d';
                card.innerHTML = `
                    <div class="skill-card-inner">
                        <div class="skill-card-front">
                            <div>${skill}</div>
                        </div>
                        <div class="skill-card-back">
                            <div>Expert Level<br>3+ Years Experience</div>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);
            });

            category.appendChild(cardContainer);
        });
    }

    initParallax3D() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            // 3D parallax effect for floating elements
            const floating3D = document.querySelectorAll('.floating-3d');
            floating3D.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                element.style.transform = `translate(${x}px, ${y}px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
            });

            // 3D tilt effect for cards
            const cards3D = document.querySelectorAll('.portfolio-item-3d');
            cards3D.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                const angleX = (e.clientY - cardCenterY) / 30;
                const angleY = (cardCenterX - e.clientX) / 30;
                
                card.addEventListener('mouseenter', () => {
                    card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                });
            });
        });
    }

    // Method to add 3D loading animation
    show3DLoader(container) {
        const loader = document.createElement('div');
        loader.className = 'loader-3d';
        loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        container.appendChild(loader);
        return loader;
    }

    // Method to create interactive 3D buttons
    enhance3DButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-3d');
            
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translateY(2px) rotateX(0deg)';
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'translateY(-3px) rotateX(15deg)';
            });
        });
    }

    // Create 3D flip cards for testimonials or achievements
    create3DFlipCards(container, data) {
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-3d';
            card.innerHTML = `
                <div class="card-3d-inner">
                    <div class="card-3d-front">
                        <h3>${item.title}</h3>
                        <p>${item.preview}</p>
                    </div>
                    <div class="card-3d-back">
                        <h3>${item.title}</h3>
                        <p>${item.details}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Initialize 3D elements when page loads
document.addEventListener('DOMContentLoaded', () => {
    const portfolio3D = new Portfolio3D();
    
    // Add some sample 3D flip cards to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const flipCardsContainer = document.createElement('div');
        flipCardsContainer.className = 'flip-cards-container';
        flipCardsContainer.style.display = 'flex';
        flipCardsContainer.style.flexWrap = 'wrap';
        flipCardsContainer.style.gap = '20px';
        flipCardsContainer.style.marginTop = '20px';

        const cardData = [
            {
                title: 'AWS Infrastructure',
                preview: 'Cloud Setup',
                details: 'Complete AWS infrastructure setup with EC2, S3, and security groups'
            },
            {
                title: 'Portfolio Website',
                preview: 'Web Development',
                details: 'Responsive portfolio with modern design and 3D elements'
            },
            {
                title: 'Linux Administration',
                preview: 'System Admin',
                details: 'Linux server configuration, security hardening, and automation'
            }
        ];

        portfolio3D.create3DFlipCards(flipCardsContainer, cardData);
        
        const projectsContent = projectsSection.querySelector('.section-content');
        if (projectsContent) {
            projectsContent.appendChild(flipCardsContainer);
        }
    }

    // Enhance existing buttons with 3D effects
    setTimeout(() => {
        portfolio3D.enhance3DButtons();
    }, 1000);
});

// Export for global access
window.Portfolio3D = Portfolio3D;