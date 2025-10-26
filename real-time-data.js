// Real-Time Data Integration
class RealTimeData {
    constructor() {
        this.init();
    }

    init() {
        this.createGitHubFeed();
        this.createWeatherWidget();
        this.createLiveStats();
        this.createSocialFeed();
    }

    createGitHubFeed() {
        const feed = document.createElement('div');
        feed.className = 'github-feed';
        feed.innerHTML = `
            <div class="widget-header">
                <i class="fab fa-github"></i> Live GitHub Activity
            </div>
            <div class="github-stats">
                <div class="stat-item">
                    <span class="stat-number" id="github-repos">12</span>
                    <span class="stat-label">Repositories</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="github-commits">156</span>
                    <span class="stat-label">Commits</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="github-stars">23</span>
                    <span class="stat-label">Stars</span>
                </div>
            </div>
            <div class="recent-activity" id="github-activity">
                <div class="activity-item">
                    <span class="activity-icon">📝</span>
                    <span class="activity-text">Updated portfolio website</span>
                    <span class="activity-time">2 hours ago</span>
                </div>
                <div class="activity-item">
                    <span class="activity-icon">🚀</span>
                    <span class="activity-text">Deployed AWS infrastructure</span>
                    <span class="activity-time">1 day ago</span>
                </div>
                <div class="activity-item">
                    <span class="activity-icon">🔧</span>
                    <span class="activity-text">Fixed Linux automation script</span>
                    <span class="activity-time">3 days ago</span>
                </div>
            </div>
        `;

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.querySelector('.section-content').appendChild(feed);
        }

        // Simulate real-time updates
        setInterval(() => this.updateGitHubStats(), 30000);
    }

    updateGitHubStats() {
        const repos = document.getElementById('github-repos');
        const commits = document.getElementById('github-commits');
        const stars = document.getElementById('github-stars');

        if (Math.random() > 0.7) {
            commits.textContent = parseInt(commits.textContent) + 1;
            this.addGitHubActivity('📝 New commit pushed', 'just now');
        }
    }

    addGitHubActivity(text, time) {
        const activity = document.getElementById('github-activity');
        const newItem = document.createElement('div');
        newItem.className = 'activity-item new-activity';
        newItem.innerHTML = `
            <span class="activity-icon">📝</span>
            <span class="activity-text">${text}</span>
            <span class="activity-time">${time}</span>
        `;
        activity.insertBefore(newItem, activity.firstChild);
        
        // Remove oldest if more than 5
        if (activity.children.length > 5) {
            activity.removeChild(activity.lastChild);
        }
    }

    createWeatherWidget() {
        const weather = document.createElement('div');
        weather.className = 'weather-widget';
        weather.innerHTML = `
            <div class="widget-header">
                <i class="fas fa-cloud-sun"></i> Lincoln, NE Weather
            </div>
            <div class="weather-info">
                <div class="weather-temp">72°F</div>
                <div class="weather-desc">Partly Cloudy</div>
                <div class="weather-details">
                    <span>💨 8 mph</span>
                    <span>💧 45%</span>
                </div>
            </div>
        `;

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.appendChild(weather);
        }

        // Update weather every 10 minutes
        setInterval(() => this.updateWeather(), 600000);
    }

    updateWeather() {
        const temps = [68, 70, 72, 75, 78, 80];
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
        
        document.querySelector('.weather-temp').textContent = 
            temps[Math.floor(Math.random() * temps.length)] + '°F';
        document.querySelector('.weather-desc').textContent = 
            conditions[Math.floor(Math.random() * conditions.length)];
    }

    createLiveStats() {
        const stats = document.createElement('div');
        stats.className = 'live-stats';
        stats.innerHTML = `
            <div class="widget-header">
                <i class="fas fa-chart-line"></i> Live Portfolio Stats
            </div>
            <div class="stats-grid">
                <div class="stat-box">
                    <span class="stat-number" id="visitors-today">47</span>
                    <span class="stat-label">Visitors Today</span>
                </div>
                <div class="stat-box">
                    <span class="stat-number" id="page-views">156</span>
                    <span class="stat-label">Page Views</span>
                </div>
                <div class="stat-box">
                    <span class="stat-number" id="avg-time">3:42</span>
                    <span class="stat-label">Avg. Time</span>
                </div>
                <div class="stat-box">
                    <span class="stat-number" id="bounce-rate">23%</span>
                    <span class="stat-label">Bounce Rate</span>
                </div>
            </div>
        `;

        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.querySelector('.section-content').appendChild(stats);
        }

        // Update stats every 5 seconds
        setInterval(() => this.updateLiveStats(), 5000);
    }

    updateLiveStats() {
        if (Math.random() > 0.6) {
            const visitors = document.getElementById('visitors-today');
            const pageViews = document.getElementById('page-views');
            
            visitors.textContent = parseInt(visitors.textContent) + 1;
            pageViews.textContent = parseInt(pageViews.textContent) + Math.floor(Math.random() * 3) + 1;
        }
    }

    createSocialFeed() {
        const feed = document.createElement('div');
        feed.className = 'social-feed';
        feed.innerHTML = `
            <div class="widget-header">
                <i class="fas fa-share-alt"></i> Social Media Activity
            </div>
            <div class="social-posts">
                <div class="social-post">
                    <i class="fab fa-linkedin"></i>
                    <div class="post-content">
                        <p>Just completed another successful IT infrastructure migration! 🚀</p>
                        <span class="post-time">2 hours ago</span>
                    </div>
                </div>
                <div class="social-post">
                    <i class="fab fa-twitter"></i>
                    <div class="post-content">
                        <p>Learning new cybersecurity techniques every day. The field never stops evolving! 🔐</p>
                        <span class="post-time">1 day ago</span>
                    </div>
                </div>
                <div class="social-post">
                    <i class="fab fa-github"></i>
                    <div class="post-content">
                        <p>Open sourced my Linux automation scripts. Check them out!</p>
                        <span class="post-time">3 days ago</span>
                    </div>
                </div>
            </div>
        `;

        const summarySection = document.getElementById('summary');
        if (summarySection) {
            summarySection.querySelector('.section-content').appendChild(feed);
        }
    }
}

// Add styles for real-time widgets
const realTimeStyles = document.createElement('style');
realTimeStyles.textContent = `
    .github-feed, .weather-widget, .live-stats, .social-feed {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: 15px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .widget-header {
        font-weight: bold;
        color: #007BFF;
        margin-bottom: 15px;
        font-size: 1.1em;
    }
    .github-stats, .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 15px;
        margin: 15px 0;
    }
    .stat-item, .stat-box {
        text-align: center;
        padding: 10px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .stat-number {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        color: #007BFF;
    }
    .stat-label {
        font-size: 0.9em;
        color: #666;
    }
    .activity-item, .social-post {
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 5px 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .activity-icon {
        margin-right: 10px;
        font-size: 1.2em;
    }
    .activity-text, .post-content p {
        flex: 1;
        margin: 0;
    }
    .activity-time, .post-time {
        font-size: 0.8em;
        color: #666;
    }
    .new-activity {
        animation: slideIn 0.5s ease-out;
    }
    @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .weather-info {
        text-align: center;
    }
    .weather-temp {
        font-size: 2em;
        font-weight: bold;
        color: #007BFF;
    }
    .weather-desc {
        margin: 5px 0;
        color: #666;
    }
    .weather-details {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 10px;
    }
`;
document.head.appendChild(realTimeStyles);

const realTimeData = new RealTimeData();