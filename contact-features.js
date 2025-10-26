// Contact Page Advanced Features

// Calendar Widget for Appointment Booking
class AppointmentCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = null;
        this.availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('currentMonth').textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.background = '#f0f0f0';
            dayHeader.style.padding = '10px';
            calendarGrid.appendChild(dayHeader);
        });

        // Add calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();

            const today = new Date();
            const isCurrentMonth = date.getMonth() === this.currentDate.getMonth();
            const isPastDate = date < today.setHours(0, 0, 0, 0);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            if (!isCurrentMonth) {
                dayElement.classList.add('disabled');
            } else if (isPastDate) {
                dayElement.classList.add('disabled');
            } else if (isWeekend) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => this.selectDate(date, dayElement));
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    selectDate(date, element) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });

        // Add selection to clicked day
        element.classList.add('selected');
        this.selectedDate = date;

        // Show time slots
        this.renderTimeSlots();
    }

    renderTimeSlots() {
        const timeSlotsContainer = document.getElementById('timeSlots');
        const timeSlotGrid = timeSlotsContainer.querySelector('.time-slot-grid');
        
        timeSlotGrid.innerHTML = '';
        
        this.availableTimes.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => this.selectTime(time, timeSlot));
            timeSlotGrid.appendChild(timeSlot);
        });

        timeSlotsContainer.style.display = 'block';
    }

    selectTime(time, element) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });

        // Add selection to clicked time
        element.classList.add('selected');
        this.selectedTime = time;

        // Show booking confirmation
        this.showBookingConfirmation();
    }

    showBookingConfirmation() {
        const dateStr = this.selectedDate.toLocaleDateString();
        const message = `Book appointment for ${dateStr} at ${this.selectedTime}?`;
        
        if (confirm(message)) {
            this.bookAppointment();
        }
    }

    bookAppointment() {
        // In a real implementation, this would send data to your backend
        const appointmentData = {
            date: this.selectedDate.toISOString(),
            time: this.selectedTime,
            timestamp: new Date().toISOString()
        };

        console.log('Appointment booked:', appointmentData);
        alert('Appointment request sent! I will confirm via email within 24 hours.');

        // Reset selection
        this.selectedDate = null;
        this.selectedTime = null;
        document.getElementById('timeSlots').style.display = 'none';
        document.querySelectorAll('.calendar-day.selected, .time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }
}

// Live Chat Widget
class LiveChat {
    constructor() {
        this.isMinimized = false;
        this.messages = [];
        this.responses = [
            "Thanks for reaching out! I typically respond within a few hours.",
            "I'd be happy to discuss your IT or cybersecurity needs. What specific challenges are you facing?",
            "Feel free to share more details about your project. I'll get back to you soon!",
            "That sounds interesting! Let me know the best way to follow up with you.",
            "I appreciate your message. I'll review this and respond via email shortly."
        ];
        this.init();
    }

    init() {
        this.bindEvents();
        this.addWelcomeMessage();
    }

    bindEvents() {
        const chatHeader = document.getElementById('chatHeader');
        const chatToggle = document.getElementById('chatToggle');
        const sendButton = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');

        chatHeader.addEventListener('click', () => this.toggleChat());
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChat();
        });

        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-resize input
        chatInput.addEventListener('input', () => {
            const sendBtn = document.getElementById('sendMessage');
            sendBtn.disabled = chatInput.value.trim().length === 0;
        });
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage("Hi! I'm Goanar. How can I help you today?");
        }, 1000);
    }

    toggleChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        const icon = chatToggle.querySelector('i');

        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            chatWidget.classList.add('minimized');
            icon.className = 'fas fa-chevron-down';
        } else {
            chatWidget.classList.remove('minimized');
            icon.className = 'fas fa-chevron-up';
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (message) {
            this.addUserMessage(message);
            input.value = '';
            document.getElementById('sendMessage').disabled = true;

            // Simulate bot response
            setTimeout(() => {
                const response = this.responses[Math.floor(Math.random() * this.responses.length)];
                this.addBotMessage(response);
            }, 1000 + Math.random() * 2000);
        }
    }

    addUserMessage(message) {
        this.addMessage(message, 'user');
    }

    addBotMessage(message) {
        this.addMessage(message, 'bot');
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${timeString}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.messages.push({
            content,
            sender,
            timestamp: now.toISOString()
        });
    }
}

// Enhanced Form Validation
class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');

        let isValid = true;

        if (!this.validateField(name)) isValid = false;
        if (!this.validateField(email)) isValid = false;
        if (!this.validateField(message)) isValid = false;

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters and spaces';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message must be less than 1000 characters';
                    isValid = false;
                }
                break;
        }

        this.showFieldError(field, errorMessage, !isValid);
        return isValid;
    }

    showFieldError(field, message, hasError) {
        const errorElement = document.getElementById(field.name + '-error');
        
        if (hasError) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    async submitForm() {
        const statusElement = document.getElementById('contact-form-status');
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        statusElement.textContent = '';
        statusElement.className = '';

        try {
            // Create FormData object
            const formData = new FormData(this.form);
            
            // Add timestamp and additional data
            formData.append('timestamp', new Date().toISOString());
            formData.append('source', 'portfolio-contact-page');

            // For demo purposes, simulate form submission
            // In production, replace with actual Formspree or backend endpoint
            await this.simulateFormSubmission(formData);

            // Show success message
            statusElement.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.';
            statusElement.className = 'success-message';
            
            // Reset form
            this.form.reset();
            
            // Clear any remaining errors
            const errorElements = this.form.querySelectorAll('.error-message');
            errorElements.forEach(el => el.style.display = 'none');
            
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => input.classList.remove('error'));

        } catch (error) {
            console.error('Form submission error:', error);
            statusElement.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly via email.';
            statusElement.className = 'error-message';
        } finally {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Clear status message after 10 seconds
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = '';
            }, 10000);
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }
}

// Performance Analytics
class PerformanceAnalytics {
    constructor() {
        this.startTime = performance.now();
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.trackUserInteractions();
        this.trackFormEngagement();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track Core Web Vitals
            this.trackCoreWebVitals();
        });
    }

    trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                console.log('Button clicked:', button.textContent.trim());
            }
        });

        // Track form field focus
        document.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                console.log('Field focused:', e.target.name || e.target.id);
            }
        }, true);
    }

    trackFormEngagement() {
        const form = document.getElementById('contactForm');
        if (form) {
            let formStartTime = null;
            let fieldInteractions = {};

            form.addEventListener('focusin', (e) => {
                if (!formStartTime) {
                    formStartTime = Date.now();
                }
                
                const fieldName = e.target.name || e.target.id;
                if (!fieldInteractions[fieldName]) {
                    fieldInteractions[fieldName] = {
                        firstFocus: Date.now(),
                        focusCount: 0
                    };
                }
                fieldInteractions[fieldName].focusCount++;
            });

            form.addEventListener('submit', () => {
                const engagementTime = Date.now() - formStartTime;
                console.log('Form engagement:', {
                    totalTime: engagementTime,
                    fieldInteractions: fieldInteractions
                });
            });
        }
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentCalendar();
    new LiveChat();
    new ContactFormValidator();
    new PerformanceAnalytics();
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}