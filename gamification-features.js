// Gamification System for Portfolio

class GamificationSystem {
    constructor() {
        this.achievements = {
            'first-visit': { unlocked: false, progress: 0, max: 1, points: 100 },
            'section-explorer': { unlocked: false, progress: 0, max: 8, points: 200 },
            'deep-diver': { unlocked: false, progress: 0, max: 300, points: 300 },
            'skill-master': { unlocked: false, progress: 0, max: 1, points: 250 },
            'quiz-champion': { unlocked: false, progress: 0, max: 1, points: 400 },
            'security-expert': { unlocked: false, progress: 0, max: 1, points: 350 },
            'easter-egg': { unlocked: false, progress: 0, max: 1, points: 500 },
            'social-connector': { unlocked: false, progress: 0, max: 1, points: 150 },
            'portfolio-master': { unlocked: false, progress: 0, max: 8, points: 1000 }
        };
        
        this.visitedSections = new Set();
        this.startTime = Date.now();
        this.totalPoints = 0;
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.trackFirstVisit();
        this.setupSectionTracking();
        this.setupTimeTracking();
        this.updateUI();
        this.setupQuizSystem();
    }

    loadProgress() {
        const saved = localStorage.getItem('portfolioGameProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.achievements = { ...this.achievements, ...data.achievements };
            this.visitedSections = new Set(data.visitedSections || []);
            this.totalPoints = data.totalPoints || 0;
        }
    }

    saveProgress() {
        const data = {
            achievements: this.achievements,
            visitedSections: Array.from(this.visitedSections),
            totalPoints: this.totalPoints,
            lastUpdate: Date.now()
        };
        localStorage.setItem('portfolioGameProgress', JSON.stringify(data));
    }

    trackFirstVisit() {
        if (!this.achievements['first-visit'].unlocked) {
            this.unlockAchievement('first-visit');
        }
    }

    setupSectionTracking() {
        // Track section visits when user navigates
        const sections = ['summary', 'education', 'work-experience', 'skills', 'projects', 'cybersecurity', 'certifications', 'contact'];
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.visitedSections.has(sectionId)) {
                            this.visitedSections.add(sectionId);
                            this.updateAchievement('section-explorer', this.visitedSections.size);
                            this.saveProgress();
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(element);
            }
        });
    }

    setupTimeTracking() {
        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateAchievement('deep-diver', timeSpent);
        }, 1000);
    }

    unlockAchievement(achievementId) {
        if (!this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.achievements[achievementId].progress = this.achievements[achievementId].max;
            this.totalPoints += this.achievements[achievementId].points;
            
            this.showAchievementNotification(achievementId);
            this.updateUI();
            this.saveProgress();
            
            // Check for portfolio master achievement
            this.checkPortfolioMaster();
        }
    }

    updateAchievement(achievementId, progress) {
        const achievement = this.achievements[achievementId];
        if (!achievement.unlocked && progress >= achievement.max) {
            this.unlockAchievement(achievementId);
        } else if (!achievement.unlocked) {
            achievement.progress = Math.min(progress, achievement.max);
            this.updateUI();
        }
    }

    checkPortfolioMaster() {
        const unlockedCount = Object.values(this.achievements).filter(a => a.unlocked && a !== this.achievements['portfolio-master']).length;
        this.updateAchievement('portfolio-master', unlockedCount);
    }

    showAchievementNotification(achievementId) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🏆</div>
                <div class="notification-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${this.getAchievementName(achievementId)}</p>
                </div>
                <div class="notification-points">+${this.achievements[achievementId].points} pts</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getAchievementName(achievementId) {
        const names = {
            'first-visit': 'First Steps',
            'section-explorer': 'Section Explorer',
            'deep-diver': 'Deep Diver',
            'skill-master': 'Skill Master',
            'quiz-champion': 'Quiz Champion',
            'security-expert': 'Security Expert',
            'easter-egg': 'Easter Egg Hunter',
            'social-connector': 'Social Connector',
            'portfolio-master': 'Portfolio Master'
        };
        return names[achievementId] || 'Unknown Achievement';
    }

    updateUI() {
        // Update progress circle
        const unlockedCount = Object.values(this.achievements).filter(a => a.unlocked).length;
        const totalAchievements = Object.keys(this.achievements).length;
        const percentage = Math.round((unlockedCount / totalAchievements) * 100);
        
        const progressCircle = document.querySelector('.progress-ring-circle');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 52;
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        const progressText = document.querySelector('.progress-percentage');
        if (progressText) progressText.textContent = `${percentage}%`;
        
        // Update stats
        const badgesEarned = document.getElementById('badgesEarned');
        if (badgesEarned) badgesEarned.textContent = unlockedCount;
        
        const sectionsVisited = document.getElementById('sectionsVisited');
        if (sectionsVisited) sectionsVisited.textContent = this.visitedSections.size;
        
        // Update badge UI
        Object.keys(this.achievements).forEach(achievementId => {
            const badge = document.querySelector(`[data-badge="${achievementId}"]`);
            if (badge) {
                const achievement = this.achievements[achievementId];
                const progressElement = badge.querySelector('.badge-progress');
                
                if (achievement.unlocked) {
                    badge.classList.remove('locked');
                    badge.classList.add('unlocked');
                    if (progressElement) progressElement.textContent = `${achievement.max}/${achievement.max}`;
                } else {
                    if (progressElement) progressElement.textContent = `${achievement.progress}/${achievement.max}`;
                }
            }
        });
    }

    setupQuizSystem() {
        this.quizQuestions = [
            {
                question: "What does SOC stand for in cybersecurity?",
                answers: ["Security Operations Center", "System Operations Control", "Software Operations Center", "Security Officer Command"],
                correct: 0
            },
            {
                question: "Which AWS service is primarily used for object storage?",
                answers: ["EC2", "RDS", "S3", "Lambda"],
                correct: 2
            },
            {
                question: "What port does HTTPS typically use?",
                answers: ["80", "443", "22", "3389"],
                correct: 1
            },
            {
                question: "What does SIEM stand for?",
                answers: ["Security Information Event Management", "System Information Event Monitoring", "Security Information and Event Management", "System Integration Event Management"],
                correct: 2
            },
            {
                question: "Which command is used to check network connectivity in Linux?",
                answers: ["netstat", "ping", "ifconfig", "route"],
                correct: 1
            }
        ];
        
        this.currentQuiz = {
            questionIndex: 0,
            score: 0,
            answers: []
        };
    }
}

// Quiz System
function startQuiz() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'flex';
    
    gamification.currentQuiz = {
        questionIndex: 0,
        score: 0,
        answers: []
    };
    
    showQuestion();
}

function showQuestion() {
    const quiz = gamification.currentQuiz;
    const questions = gamification.quizQuestions;
    
    if (quiz.questionIndex >= questions.length) {
        showQuizResults();
        return;
    }
    
    const question = questions[quiz.questionIndex];
    document.getElementById('questionNumber').textContent = quiz.questionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.innerHTML = `
            <input type="radio" name="answer" value="${index}" id="answer${index}">
            <label for="answer${index}">${answer}</label>
        `;
        answersContainer.appendChild(answerElement);
    });
    
    document.getElementById('nextQuestion').onclick = nextQuestion;
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer');
        return;
    }
    
    const quiz = gamification.currentQuiz;
    const questions = gamification.quizQuestions;
    const answerIndex = parseInt(selectedAnswer.value);
    
    quiz.answers.push(answerIndex);
    
    if (answerIndex === questions[quiz.questionIndex].correct) {
        quiz.score++;
    }
    
    quiz.questionIndex++;
    showQuestion();
}

function showQuizResults() {
    const quiz = gamification.currentQuiz;
    const percentage = Math.round((quiz.score / gamification.quizQuestions.length) * 100);
    
    document.getElementById('questionText').innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>You scored ${quiz.score} out of ${gamification.quizQuestions.length} (${percentage}%)</p>
        ${percentage >= 80 ? '<p class="success">Congratulations! You passed!</p>' : '<p class="fail">Keep studying and try again!</p>'}
    `;
    
    document.getElementById('answersContainer').innerHTML = '';
    document.getElementById('nextQuestion').textContent = 'Close';
    document.getElementById('nextQuestion').onclick = closeQuiz;
    
    if (percentage >= 80) {
        gamification.unlockAchievement('quiz-champion');
    }
}

function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
}

// Network Simulation
function startNetworkSim() {
    alert('Network Troubleshooting Simulator coming soon! This will include interactive network diagrams and real-world scenarios.');
    // TODO: Implement network simulation
}

// Security Simulation
function startSecuritySim() {
    alert('Security Incident Response Simulator coming soon! Practice handling real cybersecurity incidents.');
    gamification.unlockAchievement('security-expert');
}

// Initialize gamification system
let gamification;
document.addEventListener('DOMContentLoaded', () => {
    gamification = new GamificationSystem();
    
    // Setup quiz modal close events
    document.querySelector('.close-quiz').addEventListener('click', closeQuiz);
    document.getElementById('quizModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeQuiz();
    });
});

// Add achievement notification styles
const achievementStyles = `
<style>
.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
}

.achievement-notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.notification-icon {
    font-size: 2em;
    animation: bounce 0.6s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.notification-text h4 {
    margin: 0 0 5px 0;
    font-size: 1.1em;
}

.notification-text p {
    margin: 0;
    opacity: 0.9;
}

.notification-points {
    font-weight: 700;
    font-size: 1.2em;
    color: #FFD700;
}

.quiz-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    align-items: center;
    justify-content: center;
}

.quiz-content {
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.quiz-progress {
    background: #f0f0f0;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
}

.close-quiz {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.question-container h4 {
    font-size: 1.3em;
    margin-bottom: 20px;
    color: #333;
}

.answer-option {
    margin-bottom: 15px;
    padding: 15px;
    border: 2px solid #eee;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.answer-option:hover {
    border-color: #667eea;
    background: #f8f9ff;
}

.answer-option input {
    margin-right: 10px;
}

.answer-option label {
    cursor: pointer;
    font-weight: 500;
}

.quiz-controls {
    text-align: center;
    margin-top: 30px;
}

.quiz-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quiz-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.success {
    color: #28a745;
    font-weight: 600;
}

.fail {
    color: #dc3545;
    font-weight: 600;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', achievementStyles);