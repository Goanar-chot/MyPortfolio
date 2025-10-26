// Testimonials Page Interactive Features

class TestimonialsManager {
    constructor() {
        this.testimonials = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadTestimonials();
        this.setupAnimations();
        this.setupFilters();
        this.setupRotatingTestimonials();
    }

    loadTestimonials() {
        // In a real implementation, this would fetch from an API or CMS
        this.testimonials = [
            {
                id: 1,
                name: 'Sarah Johnson',
                position: 'IT Manager',
                company: 'Nelnet',
                rating: 5,
                text: 'Goanar consistently demonstrates exceptional technical skills and problem-solving abilities...',
                skills: ['Leadership', 'Technical Support', 'Problem Solving'],
                date: '2024-03-15',
                featured: true
            },
            // Add more testimonials as needed
        ];
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe testimonial cards
        document.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });

        // Observe stats
        document.querySelectorAll('.stat-item').forEach(stat => {
            observer.observe(stat);
        });
    }

    setupFilters() {
        // Create filter buttons (if needed in future)
        const filterContainer = document.createElement('div');
        filterContainer.className = 'testimonial-filters';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="technical">Technical</button>
            <button class="filter-btn" data-filter="leadership">Leadership</button>
            <button class="filter-btn" data-filter="customer-service">Customer Service</button>
        `;

        // Add event listeners for filters
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.filterTestimonials(e.target.dataset.filter);
                
                // Update active button
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    filterTestimonials(filter) {
        this.currentFilter = filter;
        const cards = document.querySelectorAll('.testimonial-card');
        
        cards.forEach(card => {
            const skills = card.dataset.skills ? card.dataset.skills.split(',') : [];
            const shouldShow = filter === 'all' || skills.includes(filter);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'testimonialSlideIn 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setupRotatingTestimonials() {
        // Rotate featured testimonial every 10 seconds
        const featuredTestimonials = [
            {
                quote: "Goanar consistently demonstrates exceptional technical skills and problem-solving abilities. His dedication to learning cybersecurity while maintaining excellence in IT support shows his commitment to professional growth.",
                author: "Sarah Johnson",
                position: "IT Manager, Nelnet",
                rating: 5
            },
            {
                quote: "Working with Goanar was a pleasure. He quickly adapted to our environment and consistently delivered high-quality support. His troubleshooting skills are excellent.",
                author: "Michael Chen",
                position: "Senior Systems Administrator, Apex Systems",
                rating: 5
            },
            {
                quote: "Goanar's passion for cybersecurity is evident in his work. He asks thoughtful questions and applies security best practices in his daily tasks.",
                author: "David Thompson",
                position: "Network Engineer, Nelnet",
                rating: 5
            }
        ];

        let currentIndex = 0;
        const featuredContainer = document.querySelector('.featured-testimonial');
        
        if (featuredContainer) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % featuredTestimonials.length;
                this.updateFeaturedTestimonial(featuredTestimonials[currentIndex]);
            }, 10000);
        }
    }

    updateFeaturedTestimonial(testimonial) {
        const container = document.querySelector('.featured-testimonial');
        const blockquote = container.querySelector('blockquote');
        const authorName = container.querySelector('.author-info h3');
        const authorPosition = container.querySelector('.author-info p');
        
        // Fade out
        container.style.opacity = '0.5';
        
        setTimeout(() => {
            blockquote.textContent = testimonial.quote;
            authorName.textContent = testimonial.author;
            authorPosition.textContent = testimonial.position;
            
            // Fade in
            container.style.opacity = '1';
        }, 300);
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            if (target.includes('/')) displayValue = Math.floor(current) + '/7';
            
            element.textContent = displayValue;
        }, 40);
    }
}

// Testimonial Form for New Submissions
class TestimonialForm {
    constructor() {
        this.createForm();
        this.bindEvents();
    }

    createForm() {
        // Create a floating action button for adding testimonials
        const fab = document.createElement('div');
        fab.className = 'testimonial-fab';
        fab.innerHTML = `
            <button id="addTestimonialBtn" class="fab-btn" title="Add Your Testimonial">
                <i class="fas fa-plus"></i>
            </button>
        `;
        document.body.appendChild(fab);

        // Create modal for testimonial form
        const modal = document.createElement('div');
        modal.id = 'testimonialModal';
        modal.className = 'testimonial-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Share Your Experience</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <form id="testimonialForm">
                    <div class="form-group">
                        <label for="testimonial-name">Your Name *</label>
                        <input type="text" id="testimonial-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="testimonial-position">Position</label>
                        <input type="text" id="testimonial-position" name="position">
                    </div>
                    <div class="form-group">
                        <label for="testimonial-company">Company</label>
                        <input type="text" id="testimonial-company" name="company">
                    </div>
                    <div class="form-group">
                        <label for="testimonial-email">Email *</label>
                        <input type="email" id="testimonial-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="testimonial-rating">Rating</label>
                        <div class="rating-input">
                            <input type="radio" name="rating" value="5" id="star5">
                            <label for="star5"><i class="fas fa-star"></i></label>
                            <input type="radio" name="rating" value="4" id="star4">
                            <label for="star4"><i class="fas fa-star"></i></label>
                            <input type="radio" name="rating" value="3" id="star3">
                            <label for="star3"><i class="fas fa-star"></i></label>
                            <input type="radio" name="rating" value="2" id="star2">
                            <label for="star2"><i class="fas fa-star"></i></label>
                            <input type="radio" name="rating" value="1" id="star1">
                            <label for="star1"><i class="fas fa-star"></i></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="testimonial-text">Your Testimonial *</label>
                        <textarea id="testimonial-text" name="testimonial" rows="4" required 
                                placeholder="Share your experience working with Goanar..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Submit Testimonial</button>
                        <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    bindEvents() {
        const addBtn = document.getElementById('addTestimonialBtn');
        const modal = document.getElementById('testimonialModal');
        const closeBtn = modal.querySelector('.close-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const form = document.getElementById('testimonialForm');

        addBtn.addEventListener('click', () => this.openModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Rating stars interaction
        const ratingInputs = modal.querySelectorAll('.rating-input input');
        const ratingLabels = modal.querySelectorAll('.rating-input label');
        
        ratingLabels.forEach((label, index) => {
            label.addEventListener('mouseover', () => {
                this.highlightStars(index + 1);
            });
            
            label.addEventListener('click', () => {
                this.selectRating(index + 1);
            });
        });

        modal.querySelector('.rating-input').addEventListener('mouseleave', () => {
            this.resetStarHighlight();
        });
    }

    openModal() {
        const modal = document.getElementById('testimonialModal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('testimonialModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetForm();
    }

    resetForm() {
        const form = document.getElementById('testimonialForm');
        form.reset();
        this.resetStarHighlight();
    }

    highlightStars(rating) {
        const labels = document.querySelectorAll('.rating-input label i');
        labels.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FFD700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }

    selectRating(rating) {
        const input = document.querySelector(`input[name="rating"][value="${rating}"]`);
        input.checked = true;
        this.highlightStars(rating);
    }

    resetStarHighlight() {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            this.highlightStars(parseInt(selectedRating.value));
        } else {
            const labels = document.querySelectorAll('.rating-input label i');
            labels.forEach(star => {
                star.style.color = '#ddd';
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const testimonialData = Object.fromEntries(formData);
        
        // Add timestamp
        testimonialData.timestamp = new Date().toISOString();
        
        try {
            // In a real implementation, send to your backend
            console.log('Testimonial submitted:', testimonialData);
            
            // Show success message
            alert('Thank you for your testimonial! It will be reviewed and published soon.');
            
            this.closeModal();
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            alert('There was an error submitting your testimonial. Please try again.');
        }
    }
}

// Social Sharing for Testimonials
class TestimonialSharing {
    constructor() {
        this.addShareButtons();
    }

    addShareButtons() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            const shareContainer = document.createElement('div');
            shareContainer.className = 'testimonial-share';
            shareContainer.innerHTML = `
                <button class="share-btn" title="Share this testimonial">
                    <i class="fas fa-share-alt"></i>
                </button>
                <div class="share-options" style="display: none;">
                    <button class="share-option" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="share-option" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i>
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
            
            card.appendChild(shareContainer);
            
            // Add event listeners
            const shareBtn = shareContainer.querySelector('.share-btn');
            const shareOptions = shareContainer.querySelector('.share-options');
            
            shareBtn.addEventListener('click', () => {
                shareOptions.style.display = shareOptions.style.display === 'none' ? 'flex' : 'none';
            });
            
            shareContainer.addEventListener('click', (e) => {
                if (e.target.closest('.share-option')) {
                    const platform = e.target.closest('.share-option').dataset.platform;
                    this.shareTestimonial(card, platform);
                }
            });
        });
    }

    shareTestimonial(card, platform) {
        const testimonialText = card.querySelector('.testimonial-text').textContent;
        const authorName = card.querySelector('.author-details h4').textContent;
        const shareText = `"${testimonialText}" - ${authorName}`;
        const url = window.location.href;
        
        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(`${shareText}\n\n${url}`).then(() => {
                    alert('Testimonial copied to clipboard!');
                });
                break;
        }
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsManager();
    new StatsCounter();
    new TestimonialForm();
    new TestimonialSharing();
});

// Add CSS for new features
const additionalStyles = `
<style>
.testimonial-fab {
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 1000;
}

.fab-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(40, 167, 69, 0.3);
    transition: all 0.3s ease;
}

.fab-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(40, 167, 69, 0.4);
}

.testimonial-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2000;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.testimonial-modal .modal-content {
    background: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.close-btn:hover {
    background: #f0f0f0;
}

.rating-input {
    display: flex;
    flex-direction: row-reverse;
    gap: 5px;
    margin-top: 5px;
}

.rating-input input {
    display: none;
}

.rating-input label {
    cursor: pointer;
    font-size: 20px;
    color: #ddd;
    transition: color 0.3s ease;
}

.rating-input label:hover,
.rating-input input:checked ~ label {
    color: #FFD700;
}

.testimonial-share {
    position: absolute;
    top: 15px;
    right: 15px;
}

.share-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.share-btn:hover {
    background: #f0f0f0;
    color: #007BFF;
}

.share-options {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 10px;
    gap: 5px;
    z-index: 10;
}

.share-option {
    background: none;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.share-option:hover {
    background: #f0f0f0;
    color: #007BFF;
}

.animate-in {
    animation: testimonialSlideIn 0.6s ease-out;
}

/* Dark mode styles for new elements */
body.dark-mode .testimonial-modal .modal-content {
    background: #2d2d2d;
    color: #e0e0e0;
}

body.dark-mode .modal-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

body.dark-mode .modal-header h3 {
    color: #4A90E2;
}

body.dark-mode .close-btn {
    color: #b0b0b0;
}

body.dark-mode .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

body.dark-mode .share-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

body.dark-mode .share-options {
    background: #3d3d3d;
}

body.dark-mode .share-option:hover {
    background: rgba(255, 255, 255, 0.1);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);