// Function to toggle sidebar visibility on button click
function toggleSidebar() {
    const sidebar = document.getElementById('main-nav');
    const container = document.querySelector('.container');

    // If sidebar is hidden, show it, else hide it
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        if (container) {
            container.style.marginLeft = '0';
        }
    } else {
        sidebar.classList.add('show');
        if (container) {
            container.style.marginLeft = '280px';
        }
    }
}

// Function to close sidebar if clicked outside
function closeSidebarOnClickOutside(event) {
    const sidebar = document.getElementById('main-nav');
    const toggleButton = document.getElementById('toggle-btn');
    const container = document.querySelector('.container');

    // Close the sidebar if click occurs outside the sidebar and button
    if (!sidebar.contains(event.target) && event.target !== toggleButton && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        if (container) {
            container.style.marginLeft = '0';
        }
    }
}

// Event listener for toggling the sidebar on button click
document.getElementById('toggle-btn').addEventListener('click', toggleSidebar);

// Event listener to close sidebar if clicking outside
document.addEventListener('click', closeSidebarOnClickOutside);

// Optional: Sidebar hover functionality to make it show/hide when hovered over
document.getElementById('main-nav').addEventListener('mouseenter', function () {
    this.classList.add('show');
});

document.getElementById('main-nav').addEventListener('mouseleave', function () {
    if (this.classList.contains('show')) {
        this.classList.remove('show');
    }
});

// Function to open the feedback modal
function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'block';
}

// Function to close the feedback modal
function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
}

// Event listener to open the modal when the button is clicked
document.getElementById('openFeedback').addEventListener('click', openFeedbackModal);

// Event listener to close the modal when the close (X) button is clicked
document.querySelector('.close').addEventListener('click', closeFeedbackModal);

// Event listener to close the modal when the cancel button is clicked
document.getElementById('cancelFeedback').addEventListener('click', closeFeedbackModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target === modal) {
        closeFeedbackModal();
    }
});

// Event listener to handle the form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting to a server

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('feedback').value.trim();
    const rating = document.getElementById('rating').value;

    // Basic validation
    if (!name || !email || !feedback) {
        alert('Please fill in all required fields (Name, Email, and Feedback).');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate form submission (replace with actual submission logic)
    console.log('Feedback submitted:', {
        name: name,
        email: email,
        feedback: feedback,
        rating: rating || 'No rating provided',
        timestamp: new Date().toISOString()
    });

    // Show success message
    alert('Thank you for your feedback! Your message has been received.');

    // Reset form
    this.reset();

    // Close the modal after submitting feedback
    closeFeedbackModal();
});

// Function to toggle visibility of the "learner" and "student" text
function toggleVisibility() {
    const learner = document.getElementById('learner');
    const student = document.getElementById('student');
    
    // Toggle the 'visible' class between the two elements
    learner.classList.toggle('visible');
    student.classList.toggle('visible');
}

// Toggle visibility every 3 seconds
setInterval(toggleVisibility, 3000);

// Function to toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Update the button icon and class
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-moon';
        themeToggle.classList.add('dark-mode');
        themeToggle.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-sun';
        themeToggle.classList.remove('dark-mode');
        themeToggle.title = 'Switch to Dark Mode';
    }

    // Save the current theme to localStorage
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// Event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Load the saved theme from localStorage
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    document.body.classList.add(savedTheme + '-mode');

    // Set the correct icon based on the saved theme
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-moon';
        themeToggle.classList.add('dark-mode');
        themeToggle.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-sun';
        themeToggle.classList.remove('dark-mode');
        themeToggle.title = 'Switch to Dark Mode';
    }
});

// Function to toggle collapsible sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = section.querySelector('.section-arrow');

    if (section.classList.contains('section-collapsed')) {
        // Expand the section
        section.classList.remove('section-collapsed');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        // Collapse the section
        section.classList.add('section-collapsed');
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Function to toggle project details
function toggleDetails(projectBox) {
    const details = projectBox.querySelector('.project-details');
    const isVisible = details.style.display === 'block';

    if (isVisible) {
        details.style.display = 'none';
        projectBox.style.backgroundColor = '#f8f9fa';
    } else {
        details.style.display = 'block';
        projectBox.style.backgroundColor = '#e3f2fd';
    }
}

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

            // Close sidebar if open (on mobile)
            const sidebar = document.getElementById('main-nav');
            if (sidebar.classList.contains('show') && window.innerWidth <= 768) {
                sidebar.classList.remove('show');
                const container = document.querySelector('.container');
                if (container) {
                    container.style.marginLeft = '0';
                }
            }
        }
    });
});

// Function to toggle project details
function toggleDetails(element) {
    const details = element.querySelector('.project-details');
    if (details) {
        details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
    }
}

// Make toggleDetails function globally available
window.toggleDetails = toggleDetails;

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate progress bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }

                // Animate statistics when hero section is visible
                if (entry.target.classList.contains('hero-section')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Animate progress bars
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.style.width; // Trigger the CSS transition
        }, index * 200); // Stagger the animations
    });
}

// Animate statistics counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateStat = () => {
            if (current < target) {
                current += increment;
                statNumber.textContent = Math.ceil(current);
                setTimeout(updateStat, 20);
            } else {
                statNumber.textContent = target;
            }
        };

        updateStat();
    });
}

// Add error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('JavaScript error:', e.error);
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments if needed
        const sidebar = document.getElementById('main-nav');
        const container = document.querySelector('.container');

        if (window.innerWidth > 768 && sidebar.classList.contains('show')) {
            // Desktop view - ensure proper spacing
            if (container) {
                container.style.marginLeft = '280px';
            }
        } else if (window.innerWidth <= 768 && sidebar.classList.contains('show')) {
            // Mobile view - full width sidebar
            if (container) {
                container.style.marginLeft = '0';
            }
        }
    }, 250);
});

// Social Media Links Toggle Functionality
function toggleSocialLinks() {
    const socialLinks = document.getElementById('socialLinks');
    const mainContent = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (socialLinks.classList.contains('show')) {
        // Hide social links
        socialLinks.classList.remove('show');
        // Show main content
        mainContent.style.display = 'block';
        header.style.display = 'block';
        footer.style.display = 'block';
    } else {
        // Show social links
        socialLinks.classList.add('show');
        // Hide main content
        mainContent.style.display = 'none';
        header.style.display = 'none';
        footer.style.display = 'none';
    }
}

// Show social links on hover
function showSocialLinks() {
    const socialLinks = document.getElementById('socialLinks');
    const mainContent = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Show social links
    socialLinks.classList.add('show');
    // Hide main content
    mainContent.style.display = 'none';
    header.style.display = 'none';
    footer.style.display = 'none';
}

// Hide social links when not hovering
function hideSocialLinks() {
    const socialLinks = document.getElementById('socialLinks');
    const mainContent = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Hide social links
    socialLinks.classList.remove('show');
    // Show main content
    mainContent.style.display = 'block';
    header.style.display = 'block';
    footer.style.display = 'block';
}

// Close social links when clicking the close button
document.getElementById('closeSocial').addEventListener('click', function(e) {
    e.stopPropagation();
    toggleSocialLinks();
});

// Close social links when clicking outside
document.addEventListener('click', function(e) {
    const socialLinks = document.getElementById('socialLinks');
    const profilePicture = document.getElementById('profilePicture');
    const closeButton = document.getElementById('closeSocial');

    if (socialLinks.classList.contains('show') &&
        !socialLinks.contains(e.target) &&
        !profilePicture.contains(e.target) &&
        !closeButton.contains(e.target)) {
        toggleSocialLinks();
    }
});

// Toggle social links when clicking profile picture
document.getElementById('profilePicture').addEventListener('click', function(e) {
    e.stopPropagation();
    toggleSocialLinks();
});

// Show social links on hover
document.getElementById('profilePicture').addEventListener('mouseenter', function(e) {
    e.stopPropagation();
    showSocialLinks();
});

// Hide social links when mouse leaves profile picture
document.getElementById('profilePicture').addEventListener('mouseleave', function(e) {
    e.stopPropagation();
    hideSocialLinks();
});

// Interactive Skills Assessment Functionality
class SkillsAssessment {
    constructor() {
        this.assessmentActive = false;
        this.userRatings = {};
        this.skillLevels = {
            'it-support': 95,
            'system-admin': 90,
            'cloud-tech': 80,
            'linux-systems': 85,
            'networking': 75,
            'programming': 70
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAssessment();
    }

    bindEvents() {
        // Start assessment button
        const startBtn = document.getElementById('start-assessment');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startAssessment());
        }

        // Reset assessment button
        const resetBtn = document.getElementById('reset-assessment');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAssessment());
        }

        // Skill sliders
        const skillRanges = document.querySelectorAll('.skill-range');
        skillRanges.forEach(range => {
            range.addEventListener('input', (e) => this.updateSkillRating(e));
        });

        // Interactive skill items
        const skillItems = document.querySelectorAll('.interactive-skill');
        skillItems.forEach(item => {
            item.addEventListener('click', () => this.toggleSkillSlider(item));
        });
    }

    initializeAssessment() {
        // Set initial state
        this.updateAssessmentResults();
    }

    startAssessment() {
        this.assessmentActive = true;

        // Show sliders and user skill percentages
        const sliders = document.querySelectorAll('.skill-slider');
        const userSkills = document.querySelectorAll('.user-skill');

        sliders.forEach(slider => {
            slider.style.display = 'block';
            slider.style.animation = 'slideIn 0.5s ease-out';
        });

        userSkills.forEach(skill => {
            skill.style.display = 'inline-block';
        });

        // Update button states
        const startBtn = document.getElementById('start-assessment');
        const resetBtn = document.getElementById('reset-assessment');

        if (startBtn) startBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-block';

        // Add active class to first skill
        const firstSkill = document.querySelector('.interactive-skill');
        if (firstSkill) {
            firstSkill.classList.add('active');
        }

        // Show assessment results
        this.showAssessmentResults();
    }

    resetAssessment() {
        this.assessmentActive = false;
        this.userRatings = {};

        // Hide sliders and reset user skill percentages
        const sliders = document.querySelectorAll('.skill-slider');
        const userSkills = document.querySelectorAll('.user-skill');
        const userFills = document.querySelectorAll('.user-fill');

        sliders.forEach(slider => {
            slider.style.display = 'none';
            const range = slider.querySelector('.skill-range');
            if (range) range.value = 0;
        });

        userSkills.forEach(skill => {
            skill.style.display = 'none';
            skill.textContent = '0%';
        });

        userFills.forEach(fill => {
            fill.style.width = '0%';
        });

        // Remove active class from all skills
        const skillItems = document.querySelectorAll('.interactive-skill');
        skillItems.forEach(item => {
            item.classList.remove('active');
        });

        // Update button states
        const startBtn = document.getElementById('start-assessment');
        const resetBtn = document.getElementById('reset-assessment');

        if (startBtn) startBtn.style.display = 'inline-block';
        if (resetBtn) resetBtn.style.display = 'none';

        // Hide assessment results
        this.hideAssessmentResults();

        // Reset results
        this.updateAssessmentResults();
    }

    toggleSkillSlider(skillItem) {
        if (!this.assessmentActive) return;

        // Remove active class from all skills
        const skillItems = document.querySelectorAll('.interactive-skill');
        skillItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked skill
        skillItem.classList.add('active');
    }

    updateSkillRating(event) {
        const range = event.target;
        const skillKey = range.dataset.skill;
        const value = parseInt(range.value);

        // Update user rating
        this.userRatings[skillKey] = value;

        // Update display
        const userSkillElement = document.querySelector(`[data-skill="${skillKey}"] .user-skill`);
        const userFill = document.querySelector(`[data-skill="${skillKey}"] .user-fill`);

        if (userSkillElement) {
            userSkillElement.textContent = `${value}%`;
        }

        if (userFill) {
            userFill.style.width = `${value}%`;
        }

        // Update assessment results
        this.updateAssessmentResults();
    }

    updateAssessmentResults() {
        const userAverage = document.getElementById('user-average');
        const actualAverage = document.getElementById('actual-average');
        const accuracyScore = document.getElementById('accuracy-score');
        const feedback = document.getElementById('assessment-feedback');

        if (!this.assessmentActive) {
            if (userAverage) userAverage.textContent = '0%';
            if (accuracyScore) accuracyScore.textContent = '0%';
            return;
        }

        // Calculate averages
        const userValues = Object.values(this.userRatings);
        const actualValues = Object.values(this.skillLevels);

        const userAvg = userValues.length > 0 ? Math.round(userValues.reduce((a, b) => a + b, 0) / userValues.length) : 0;
        const actualAvg = Math.round(actualValues.reduce((a, b) => a + b, 0) / actualValues.length);

        // Calculate accuracy
        let accuracy = 0;
        if (userValues.length > 0) {
            const totalDifference = Object.keys(this.userRatings).reduce((sum, key) => {
                const userRating = this.userRatings[key];
                const actualRating = this.skillLevels[key];
                return sum + Math.abs(userRating - actualRating);
            }, 0);
            const maxPossibleDifference = Object.keys(this.userRatings).length * 100;
            accuracy = Math.max(0, 100 - (totalDifference / maxPossibleDifference) * 100);
            accuracy = Math.round(accuracy);
        }

        // Update display
        if (userAverage) userAverage.textContent = `${userAvg}%`;
        if (actualAverage) actualAverage.textContent = `${actualAvg}%`;
        if (accuracyScore) accuracyScore.textContent = `${accuracy}%`;

        // Update feedback
        if (feedback) {
            let feedbackText = '';
            if (userValues.length === 0) {
                feedbackText = 'Start the assessment to see how well you know my skills!';
            } else if (accuracy >= 90) {
                feedbackText = '🎯 Excellent assessment! You have a great understanding of my technical skills.';
            } else if (accuracy >= 75) {
                feedbackText = '👍 Good job! You have a solid grasp of my technical capabilities.';
            } else if (accuracy >= 60) {
                feedbackText = '📊 Not bad! There are some areas where my skills might surprise you.';
            } else {
                feedbackText = '💡 Interesting! My actual skill levels are quite different from what you expected.';
            }
            feedback.textContent = feedbackText;
        }
    }

    showAssessmentResults() {
        const results = document.getElementById('assessment-results');
        if (results) {
            results.style.display = 'block';
            results.style.animation = 'slideIn 0.5s ease-out';
        }
    }

    hideAssessmentResults() {
        const results = document.getElementById('assessment-results');
        if (results) {
            results.style.display = 'none';
        }
    }
}

// Initialize the skills assessment when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SkillsAssessment();
});
