// AI-Powered Features
class AIFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.createAIChatbot();
        this.createResumeScanner();
        this.createJobMatcher();
    }

    createAIChatbot() {
        const chatbot = document.createElement('div');
        chatbot.className = 'ai-chatbot';
        chatbot.innerHTML = `
            <div class="chatbot-toggle" onclick="aiFeatures.toggleChatbot()">
                🤖 AI Assistant
            </div>
            <div class="chatbot-window" style="display: none;">
                <div class="chatbot-header">
                    <span>AI Assistant - Ask me about Goanar!</span>
                    <button onclick="aiFeatures.toggleChatbot()">×</button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="bot-message">Hi! I'm Goanar's AI assistant. Ask me about his experience, skills, or projects!</div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Ask me anything..." onkeypress="if(event.key==='Enter') aiFeatures.sendMessage()">
                    <button onclick="aiFeatures.sendMessage()">Send</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .ai-chatbot { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
            .chatbot-toggle { background: #007BFF; color: white; padding: 12px 20px; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,123,255,0.3); }
            .chatbot-window { position: absolute; bottom: 60px; right: 0; width: 350px; height: 400px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: flex; flex-direction: column; }
            .chatbot-header { background: #007BFF; color: white; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; }
            .chatbot-messages { flex: 1; padding: 15px; overflow-y: auto; }
            .bot-message, .user-message { margin: 10px 0; padding: 10px; border-radius: 10px; }
            .bot-message { background: #f1f3f4; }
            .user-message { background: #007BFF; color: white; margin-left: 50px; }
            .chatbot-input { display: flex; padding: 15px; border-top: 1px solid #eee; }
            .chatbot-input input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; margin-right: 10px; }
            .chatbot-input button { background: #007BFF; color: white; border: none; padding: 10px 15px; border-radius: 20px; cursor: pointer; }
        `;
        document.head.appendChild(style);
        document.body.appendChild(chatbot);
    }

    toggleChatbot() {
        const window = document.querySelector('.chatbot-window');
        window.style.display = window.style.display === 'none' ? 'block' : 'none';
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const messages = document.getElementById('chatbot-messages');
        const message = input.value.trim();
        
        if (!message) return;

        messages.innerHTML += `<div class="user-message">${message}</div>`;
        input.value = '';

        setTimeout(() => {
            const response = this.generateAIResponse(message);
            messages.innerHTML += `<div class="bot-message">${response}</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }

    generateAIResponse(message) {
        const responses = {
            'experience': "Goanar has 3+ years of IT support experience at Nelnet, Apex Systems, and NTT Data. He's resolved 500+ tickets with 95% satisfaction!",
            'skills': "His key skills include IT Support, Linux, AWS Cloud, Python, JavaScript, and Cybersecurity. He's currently pursuing Google Cybersecurity certification!",
            'education': "He has an Associate's in Computer Information Technology (GPA 3.0) and is completing a Bachelor's in IT - Network Management (GPA 3.95).",
            'projects': "Check out his AWS infrastructure setup, portfolio website, and Linux administration projects. Each shows real technical expertise!",
            'contact': "You can reach Goanar at Goanarchot@gmail.com or +1-402-617-1668. He's based in Lincoln, NE.",
            'default': "I can tell you about Goanar's experience, skills, education, projects, or contact info. What would you like to know?"
        };

        const key = Object.keys(responses).find(k => message.toLowerCase().includes(k)) || 'default';
        return responses[key];
    }

    createResumeScanner() {
        const scanner = document.createElement('div');
        scanner.innerHTML = `
            <div id="resume-scanner" class="ai-tool" style="display: none;">
                <h3>🔍 AI Resume Scanner</h3>
                <p>Upload your resume to see how well it matches Goanar's skills!</p>
                <input type="file" id="resume-upload" accept=".pdf,.doc,.docx">
                <div id="scan-results"></div>
            </div>
        `;
        document.body.appendChild(scanner);
    }

    createJobMatcher() {
        const matcher = document.createElement('div');
        matcher.innerHTML = `
            <div id="job-matcher" class="ai-tool" style="display: none;">
                <h3>🎯 Smart Job Matching</h3>
                <textarea placeholder="Paste a job description here..." id="job-description"></textarea>
                <button onclick="aiFeatures.analyzeJobMatch()">Analyze Match</button>
                <div id="match-results"></div>
            </div>
        `;
        document.body.appendChild(matcher);
    }

    analyzeJobMatch() {
        const jobDesc = document.getElementById('job-description').value;
        const results = document.getElementById('match-results');
        
        if (!jobDesc) return;

        const skills = ['IT Support', 'Linux', 'AWS', 'Python', 'Cybersecurity', 'Troubleshooting'];
        const matches = skills.filter(skill => jobDesc.toLowerCase().includes(skill.toLowerCase()));
        const score = Math.round((matches.length / skills.length) * 100);

        results.innerHTML = `
            <div class="match-score">Match Score: ${score}%</div>
            <div class="matched-skills">Matched Skills: ${matches.join(', ')}</div>
            <div class="recommendation">${score > 70 ? 'Excellent match! Goanar would be perfect for this role.' : 'Good potential match with room for growth.'}</div>
        `;
    }
}

const aiFeatures = new AIFeatures();