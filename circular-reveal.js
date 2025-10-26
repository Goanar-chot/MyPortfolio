// Simple Circular Reveal Animation
function initCircularReveal() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'circular-reveal-overlay';
    document.body.appendChild(overlay);
    
    let isAnimating = false;
    
    // Override toggleSection function
    window.toggleSection = function(sectionId, event) {
        if (isAnimating) return;
        
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const sectionContent = section.querySelector('.section-content');
        const arrow = section.querySelector('.section-arrow');
        
        // Get click position
        let clickX = 50, clickY = 50;
        if (event && event.clientX && event.clientY) {
            clickX = (event.clientX / window.innerWidth) * 100;
            clickY = (event.clientY / window.innerHeight) * 100;
        }
        
        isAnimating = true;
        
        // Set animation origin
        overlay.style.setProperty('--click-x', clickX + '%');
        overlay.style.setProperty('--click-y', clickY + '%');
        
        // Show overlay
        overlay.style.setProperty('--reveal-size', '0%');
        overlay.classList.add('active');
        
        setTimeout(() => {
            overlay.style.setProperty('--reveal-size', '100%');
        }, 50);
        
        setTimeout(() => {
            // Toggle section
            if (section.classList.contains('section-collapsed')) {
                section.classList.remove('section-collapsed');
                section.classList.add('section-expanded');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                section.classList.remove('section-expanded');
                section.classList.add('section-collapsed');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
            
            setTimeout(() => {
                overlay.classList.remove('active');
                isAnimating = false;
            }, 300);
        }, 400);
    };
    
    // Add click listeners to all section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', function(e) {
            const sectionId = this.parentElement.id;
            if (sectionId) {
                window.toggleSection(sectionId, e);
            }
        });
    });
}



// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCircularReveal, 100);
});

