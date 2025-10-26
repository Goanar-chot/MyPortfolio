// Advanced Gamification System
class AdvancedGamification {
    constructor() {
        this.achievements = [];
        this.progress = {
            sectionsVisited: new Set(),
            timeSpent: 0,
            interactionsCount: 0,
            challengesCompleted: 0
        };
        this.init();
    }

    init() {
        this.createAchievementSystem();
        this.createProgressTracker();
        this.createChallenges();
        this.createLeaderboard();
        this.startTracking();
    }

    createAchievementSystem() {
        const achievements = document.createElement('div');
        achievements.className = 'achievement-system';
        achievements.innerHTML = `
            <div class="achievement-panel" id="achievement-panel">
                <div class="panel-header">
                    <h3>🏆 Achievements</h3>
                    <button onclick="advancedGamification.togglePanel()">×</button>
                </div>
                <div class="achievements-grid" id="achievements-grid">
                    <!-- Achievements will be populated here -->
                </div>
                <div class="progress-overview">
                    <div class="progress-item">
                        <span>Exploration: </span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="exploration-progress"></div>
                        </div>
                        <span id="exploration-percent">0%</span>
                    </div>
                </div>
            </div>
            <div class="achievement-trigger" onclick="advancedGamification.togglePanel()">
                🏆 <span id="achievement-count">0</span>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .achievement-system { position: fixed; top: 20px; left: 20px; z-index: 1000; }
            .achievement-trigger { background: #28a745; color: white; padding: 10px 15px; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 12px rgba(40,167,69,0.3); }
            .achievement-panel { position: absolute; top: 50px; left: 0; width: 350px; max-height: 500px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: none; overflow-y: auto; }
            .panel-header { background: #28a745; color: white; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; }
            .achievements-grid { padding: 15px; }
            .achievement-item { display: flex; align-items: center; padding: 10px; margin: 5px 0; border-radius: 10px; transition: all 0.3s ease; }
            .achievement-item.unlocked { background: #d4edda; border: 2px solid #28a745; }
            .achievement-item.locked { background: #f8f9fa; border: 2px solid #dee2e6; opacity: 0.6; }
            .achievement-icon { font-size: 2em; margin-right: 15px; }
            .achievement-info h4 { margin: 0; color: #333; }
            .achievement-info p { margin: 5px 0 0 0; font-size: 0.9em; color: #666; }
            .progress-overview { padding: 15px; border-top: 1px solid #eee; }
            .progress-item { display: flex; align-items: center; gap: 10px; margin: 10px 0; }
            .progress-bar { flex: 1; height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden; }
            .progress-fill { height: 100%; background: #28a745; transition: width 0.3s ease; }
            .achievement-notification { position: fixed; top: 100px; right: 20px; background: #28a745; color: white; padding: 15px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(40,167,69,0.3); animation: slideInRight 0.5s ease-out; z-index: 1001; }
            @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(achievements);

        this.setupAchievements();
    }

    setupAchievements() {
        const achievementsList = [
            { id: 'explorer', icon: '🗺️', title: 'Explorer', desc: 'Visit 5 different sections', target: 5 },
            { id: 'dedicated', icon: '⏰', title: 'Dedicated Visitor', desc: 'Spend 5 minutes on the site', target: 300 },
            { id: 'interactive', icon: '🎯', title: 'Interactive User', desc: 'Complete 10 interactions', target: 10 },
            { id: 'challenger', icon: '🎮', title: 'Challenge Master', desc: 'Complete 3 challenges', target: 3 },
            { id: 'completionist', icon: '💯', title: 'Completionist', desc: 'Visit all sections', target: 12 },
            { id: 'speedster', icon: '⚡', title: 'Speedster', desc: 'Navigate quickly between sections', target: 1 },
            { id: 'curious', icon: '🔍', title: 'Curious Mind', desc: 'Click on 20 different elements', target: 20 },
            { id: 'social', icon: '📱', title: 'Social Connector', desc: 'Check social media links', target: 1 }
        ];

        const grid = document.getElementById('achievements-grid');
        achievementsList.forEach(achievement => {
            const item = document.createElement('div');
            item.className = 'achievement-item locked';
            item.id = `achievement-${achievement.id}`;
            item.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.desc}</p>
                </div>
            `;
            grid.appendChild(item);
        });
    }

    createProgressTracker() {
        this.startTime = Date.now();
        
        // Track section visits
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const sectionId = header.parentElement.id;
                this.progress.sectionsVisited.add(sectionId);
                this.checkAchievements();
            });
        });

        // Track interactions
        document.addEventListener('click', () => {
            this.progress.interactionsCount++;
            this.checkAchievements();
        });

        // Track time spent
        setInterval(() => {
            this.progress.timeSpent = (Date.now() - this.startTime) / 1000;
            this.checkAchievements();
        }, 1000);
    }

    createChallenges() {
        const challenges = document.createElement('div');
        challenges.className = 'challenge-system';
        challenges.innerHTML = `
            <div class="challenge-popup" id="challenge-popup" style="display: none;">
                <div class="challenge-content">
                    <h3>🎯 Daily Challenge</h3>
                    <div id="current-challenge">
                        <h4>IT Knowledge Quiz</h4>
                        <p>What does "SSH" stand for?</p>
                        <div class="challenge-options">
                            <button onclick="advancedGamification.answerChallenge('a')">A) Secure Shell</button>
                            <button onclick="advancedGamification.answerChallenge('b')">B) System Security Hub</button>
                            <button onclick="advancedGamification.answerChallenge('c')">C) Server Side Hosting</button>
                        </div>
                    </div>
                    <button onclick="advancedGamification.closeChallenge()">Close</button>
                </div>
            </div>
        `;

        const challengeStyles = document.createElement('style');
        challengeStyles.textContent = `
            .challenge-popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center; }
            .challenge-content { background: white; padding: 30px; border-radius: 15px; max-width: 500px; text-align: center; }
            .challenge-options { margin: 20px 0; }
            .challenge-options button { display: block; width: 100%; margin: 10px 0; padding: 10px; border: 2px solid #007BFF; background: white; color: #007BFF; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }
            .challenge-options button:hover { background: #007BFF; color: white; }
        `;
        document.head.appendChild(challengeStyles);
        document.body.appendChild(challenges);

        // Show challenge after 30 seconds
        setTimeout(() => this.showChallenge(), 30000);
    }

    createLeaderboard() {
        const leaderboard = document.createElement('div');
        leaderboard.className = 'leaderboard';
        leaderboard.innerHTML = `
            <div class="leaderboard-widget">
                <h4>🏅 Top Explorers</h4>
                <div class="leaderboard-list">
                    <div class="leader-item">
                        <span class="rank">1.</span>
                        <span class="name">TechExplorer</span>
                        <span class="score">2,450 pts</span>
                    </div>
                    <div class="leader-item">
                        <span class="rank">2.</span>
                        <span class="name">CodeMaster</span>
                        <span class="score">2,100 pts</span>
                    </div>
                    <div class="leader-item">
                        <span class="rank">3.</span>
                        <span class="name">ITGuru</span>
                        <span class="score">1,890 pts</span>
                    </div>
                    <div class="leader-item current-user">
                        <span class="rank">You</span>
                        <span class="name">Visitor</span>
                        <span class="score" id="user-score">0 pts</span>
                    </div>
                </div>
            </div>
        `;

        const leaderboardStyles = document.createElement('style');
        leaderboardStyles.textContent = `
            .leaderboard-widget { background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 20px; border-radius: 15px; margin: 20px 0; }
            .leaderboard-list { margin-top: 15px; }
            .leader-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); }
            .leader-item.current-user { background: rgba(255,255,255,0.3); padding: 8px; border-radius: 8px; font-weight: bold; }
            .rank { font-weight: bold; width: 30px; }
            .name { flex: 1; }
            .score { font-weight: bold; color: #b8860b; }
        `;
        document.head.appendChild(leaderboardStyles);

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.querySelector('.section-content').appendChild(leaderboard);
        }
    }

    startTracking() {
        // Update progress every second
        setInterval(() => {
            this.updateProgress();
        }, 1000);
    }

    checkAchievements() {
        const achievements = [
            { id: 'explorer', condition: () => this.progress.sectionsVisited.size >= 5 },
            { id: 'dedicated', condition: () => this.progress.timeSpent >= 300 },
            { id: 'interactive', condition: () => this.progress.interactionsCount >= 10 },
            { id: 'completionist', condition: () => this.progress.sectionsVisited.size >= 12 },
            { id: 'curious', condition: () => this.progress.interactionsCount >= 20 },
            { id: 'challenger', condition: () => this.progress.challengesCompleted >= 3 }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition() && !this.achievements.includes(achievement.id)) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    unlockAchievement(id) {
        this.achievements.push(id);
        const element = document.getElementById(`achievement-${id}`);
        if (element) {
            element.classList.remove('locked');
            element.classList.add('unlocked');
        }

        document.getElementById('achievement-count').textContent = this.achievements.length;

        // Show notification
        this.showAchievementNotification(id);
    }

    showAchievementNotification(id) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `🏆 Achievement Unlocked: ${id.charAt(0).toUpperCase() + id.slice(1)}!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateProgress() {
        const explorationPercent = Math.round((this.progress.sectionsVisited.size / 12) * 100);
        document.getElementById('exploration-progress').style.width = explorationPercent + '%';
        document.getElementById('exploration-percent').textContent = explorationPercent + '%';

        // Update user score
        const score = this.achievements.length * 100 + this.progress.sectionsVisited.size * 50 + Math.floor(this.progress.timeSpent / 10);
        document.getElementById('user-score').textContent = score + ' pts';
    }

    togglePanel() {
        const panel = document.getElementById('achievement-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }

    showChallenge() {
        document.getElementById('challenge-popup').style.display = 'flex';
    }

    answerChallenge(answer) {
        if (answer === 'a') {
            this.progress.challengesCompleted++;
            alert('Correct! SSH stands for Secure Shell. 🎉');
        } else {
            alert('Not quite right. SSH stands for Secure Shell.');
        }
        this.closeChallenge();
        this.checkAchievements();
    }

    closeChallenge() {
        document.getElementById('challenge-popup').style.display = 'none';
    }
}

const advancedGamification = new AdvancedGamification();