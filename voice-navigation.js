// Voice Navigation System
class VoiceNavigation {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = {};
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.setupSpeechRecognition();
            this.setupCommands();
            this.createVoiceInterface();
        } else {
            console.log('Speech recognition not supported');
        }
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            if (event.results[event.results.length - 1].isFinal) {
                this.processCommand(transcript.toLowerCase());
            }
        };

        this.recognition.onerror = (event) => {
            console.log('Speech recognition error:', event.error);
        };
    }

    setupCommands() {
        this.commands = {
            'go to summary': () => this.navigateToSection('summary'),
            'show summary': () => this.navigateToSection('summary'),
            'go to experience': () => this.navigateToSection('work-experience'),
            'show work experience': () => this.navigateToSection('work-experience'),
            'go to skills': () => this.navigateToSection('skills'),
            'show skills': () => this.navigateToSection('skills'),
            'go to projects': () => this.navigateToSection('projects'),
            'show projects': () => this.navigateToSection('projects'),
            'go to education': () => this.navigateToSection('education'),
            'show education': () => this.navigateToSection('education'),
            'go to contact': () => this.navigateToSection('contact'),
            'show contact': () => this.navigateToSection('contact'),
            'scroll up': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            'scroll down': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
            'toggle dark mode': () => this.toggleTheme(),
            'download resume': () => this.downloadResume(),
            'open github': () => window.open('https://github.com', '_blank'),
            'open linkedin': () => window.open('https://linkedin.com/in/goanar-chot-9b6154206/', '_blank'),
            'help': () => this.showHelp(),
            'stop listening': () => this.stopListening()
        };
    }

    createVoiceInterface() {
        const voiceUI = document.createElement('div');
        voiceUI.className = 'voice-navigation';
        voiceUI.innerHTML = `
            <div class="voice-toggle" onclick="voiceNav.toggleListening()">
                <i class="fas fa-microphone" id="voice-icon"></i>
                <span id="voice-status">Voice Off</span>
            </div>
            <div class="voice-feedback" id="voice-feedback" style="display: none;">
                <div class="listening-animation">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
                <div class="voice-text" id="voice-text">Listening...</div>
            </div>
            <div class="voice-commands" id="voice-commands" style="display: none;">
                <h4>Voice Commands:</h4>
                <ul>
                    <li>"Go to [section]" - Navigate to sections</li>
                    <li>"Scroll up/down" - Page navigation</li>
                    <li>"Toggle dark mode" - Switch themes</li>
                    <li>"Download resume" - Get resume</li>
                    <li>"Open GitHub/LinkedIn" - Social links</li>
                    <li>"Help" - Show commands</li>
                    <li>"Stop listening" - Turn off voice</li>
                </ul>
            </div>
        `;

        const voiceStyles = document.createElement('style');
        voiceStyles.textContent = `
            .voice-navigation {
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 1000;
            }
            .voice-toggle {
                background: #17a2b8;
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(23,162,184,0.3);
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }
            .voice-toggle:hover {
                background: #138496;
                transform: translateY(-2px);
            }
            .voice-toggle.listening {
                background: #dc3545;
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .voice-feedback {
                position: absolute;
                bottom: 60px;
                right: 0;
                background: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                min-width: 200px;
                text-align: center;
            }
            .listening-animation {
                display: flex;
                justify-content: center;
                gap: 4px;
                margin-bottom: 10px;
            }
            .wave {
                width: 4px;
                height: 20px;
                background: #17a2b8;
                border-radius: 2px;
                animation: wave 1.2s infinite ease-in-out;
            }
            .wave:nth-child(2) { animation-delay: 0.1s; }
            .wave:nth-child(3) { animation-delay: 0.2s; }
            @keyframes wave {
                0%, 40%, 100% { transform: scaleY(0.4); }
                20% { transform: scaleY(1); }
            }
            .voice-text {
                color: #333;
                font-size: 0.9em;
            }
            .voice-commands {
                position: absolute;
                bottom: 60px;
                right: 0;
                background: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                width: 300px;
            }
            .voice-commands h4 {
                margin: 0 0 15px 0;
                color: #17a2b8;
            }
            .voice-commands ul {
                margin: 0;
                padding-left: 20px;
            }
            .voice-commands li {
                margin: 8px 0;
                font-size: 0.9em;
                color: #666;
            }
            .voice-notification {
                position: fixed;
                top: 150px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(40,167,69,0.3);
                animation: slideInRight 0.5s ease-out;
                z-index: 1001;
            }
        `;
        document.head.appendChild(voiceStyles);
        document.body.appendChild(voiceUI);
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (!this.recognition) return;

        this.isListening = true;
        this.recognition.start();
        
        document.getElementById('voice-icon').className = 'fas fa-microphone-slash';
        document.getElementById('voice-status').textContent = 'Listening...';
        document.querySelector('.voice-toggle').classList.add('listening');
        document.getElementById('voice-feedback').style.display = 'block';
        
        this.showNotification('🎤 Voice navigation activated. Say "help" for commands.');
    }

    stopListening() {
        if (!this.recognition) return;

        this.isListening = false;
        this.recognition.stop();
        
        document.getElementById('voice-icon').className = 'fas fa-microphone';
        document.getElementById('voice-status').textContent = 'Voice Off';
        document.querySelector('.voice-toggle').classList.remove('listening');
        document.getElementById('voice-feedback').style.display = 'none';
        document.getElementById('voice-commands').style.display = 'none';
    }

    processCommand(transcript) {
        document.getElementById('voice-text').textContent = `"${transcript}"`;
        
        const command = Object.keys(this.commands).find(cmd => 
            transcript.includes(cmd) || this.fuzzyMatch(transcript, cmd)
        );

        if (command) {
            this.commands[command]();
            this.showNotification(`✅ Executed: ${command}`);
        } else {
            this.showNotification('❓ Command not recognized. Say "help" for available commands.');
        }
    }

    fuzzyMatch(input, command) {
        const words = command.split(' ');
        return words.every(word => input.includes(word));
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Open section if collapsed
            if (section.classList.contains('section-collapsed')) {
                const header = section.querySelector('.section-header');
                if (header) {
                    header.click();
                }
            }
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }

    downloadResume() {
        const resumeLink = document.getElementById('resume-link');
        if (resumeLink) {
            resumeLink.click();
        }
    }

    showHelp() {
        const commands = document.getElementById('voice-commands');
        commands.style.display = commands.style.display === 'none' ? 'block' : 'none';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'voice-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

const voiceNav = new VoiceNavigation();