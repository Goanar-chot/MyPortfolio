// Advanced Analytics Dashboard
class AnalyticsDashboard {
    constructor() {
        this.analytics = {
            pageViews: 0,
            uniqueVisitors: 0,
            timeSpent: 0,
            bounceRate: 0,
            topSections: {},
            clickHeatmap: [],
            scrollDepth: {},
            deviceTypes: { mobile: 0, desktop: 0, tablet: 0 },
            referrers: {},
            timeOnPage: []
        };
        this.init();
    }

    init() {
        this.createDashboard();
        this.startTracking();
        this.setupHeatmapTracking();
        this.trackScrollDepth();
        this.detectDevice();
    }

    createDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'analytics-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-toggle" onclick="analyticsDashboard.toggleDashboard()">
                📊 Analytics
            </div>
            <div class="dashboard-panel" id="dashboard-panel" style="display: none;">
                <div class="dashboard-header">
                    <h3>📊 Live Analytics</h3>
                    <button onclick="analyticsDashboard.toggleDashboard()">×</button>
                </div>
                <div class="dashboard-content">
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-value" id="page-views">0</div>
                            <div class="metric-label">Page Views</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="time-spent">0:00</div>
                            <div class="metric-label">Time Spent</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="scroll-depth">0%</div>
                            <div class="metric-label">Scroll Depth</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="interactions">0</div>
                            <div class="metric-label">Interactions</div>
                        </div>
                    </div>
                    
                    <div class="chart-section">
                        <h4>Section Popularity</h4>
                        <div class="section-chart" id="section-chart"></div>
                    </div>
                    
                    <div class="heatmap-section">
                        <h4>Click Heatmap</h4>
                        <div class="heatmap-toggle">
                            <button onclick="analyticsDashboard.toggleHeatmap()">Show Heatmap</button>
                        </div>
                    </div>
                    
                    <div class="device-breakdown">
                        <h4>Device Types</h4>
                        <div class="device-chart" id="device-chart"></div>
                    </div>
                </div>
            </div>
        `;

        const dashboardStyles = document.createElement('style');
        dashboardStyles.textContent = `
            .analytics-dashboard {
                position: fixed;
                top: 160px;
                right: 20px;
                z-index: 1000;
            }
            .dashboard-toggle {
                background: #6f42c1;
                color: white;
                padding: 10px 15px;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(111,66,193,0.3);
            }
            .dashboard-panel {
                position: absolute;
                top: 50px;
                right: 0;
                width: 400px;
                max-height: 600px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                overflow-y: auto;
            }
            .dashboard-header {
                background: #6f42c1;
                color: white;
                padding: 15px;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .dashboard-content {
                padding: 20px;
            }
            .metrics-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 20px;
            }
            .metric-card {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                border: 2px solid #e9ecef;
            }
            .metric-value {
                font-size: 1.5em;
                font-weight: bold;
                color: #6f42c1;
            }
            .metric-label {
                font-size: 0.9em;
                color: #666;
                margin-top: 5px;
            }
            .chart-section, .heatmap-section, .device-breakdown {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            .section-chart, .device-chart {
                margin-top: 10px;
            }
            .chart-bar {
                display: flex;
                align-items: center;
                margin: 8px 0;
            }
            .chart-label {
                width: 100px;
                font-size: 0.9em;
            }
            .chart-fill {
                height: 20px;
                background: #6f42c1;
                border-radius: 10px;
                margin: 0 10px;
                transition: width 0.3s ease;
            }
            .chart-value {
                font-size: 0.8em;
                color: #666;
            }
            .heatmap-point {
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255, 0, 0, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                animation: heatmapPulse 2s infinite;
            }
            @keyframes heatmapPulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.5); opacity: 1; }
            }
        `;
        document.head.appendChild(dashboardStyles);
        document.body.appendChild(dashboard);
    }

    startTracking() {
        this.startTime = Date.now();
        this.analytics.pageViews++;
        
        // Update metrics every second
        setInterval(() => {
            this.updateMetrics();
        }, 1000);

        // Track section visits
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const sectionId = header.parentElement.id;
                this.analytics.topSections[sectionId] = (this.analytics.topSections[sectionId] || 0) + 1;
                this.updateSectionChart();
            });
        });

        // Track interactions
        let interactionCount = 0;
        document.addEventListener('click', () => {
            interactionCount++;
            document.getElementById('interactions').textContent = interactionCount;
        });
    }

    setupHeatmapTracking() {
        document.addEventListener('click', (e) => {
            this.analytics.clickHeatmap.push({
                x: e.clientX,
                y: e.clientY + window.scrollY,
                timestamp: Date.now()
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                document.getElementById('scroll-depth').textContent = maxScroll + '%';
            }
        });
    }

    detectDevice() {
        const userAgent = navigator.userAgent;
        let deviceType = 'desktop';
        
        if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
            deviceType = 'tablet';
        } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
            deviceType = 'mobile';
        }
        
        this.analytics.deviceTypes[deviceType]++;
        this.updateDeviceChart();
    }

    updateMetrics() {
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        
        document.getElementById('page-views').textContent = this.analytics.pageViews;
        document.getElementById('time-spent').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updateSectionChart() {
        const chart = document.getElementById('section-chart');
        const sections = Object.entries(this.analytics.topSections)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        const maxViews = Math.max(...sections.map(([,views]) => views));
        
        chart.innerHTML = sections.map(([section, views]) => `
            <div class="chart-bar">
                <div class="chart-label">${section}</div>
                <div class="chart-fill" style="width: ${(views / maxViews) * 200}px;"></div>
                <div class="chart-value">${views}</div>
            </div>
        `).join('');
    }

    updateDeviceChart() {
        const chart = document.getElementById('device-chart');
        const devices = Object.entries(this.analytics.deviceTypes);
        const total = devices.reduce((sum, [,count]) => sum + count, 0);
        
        chart.innerHTML = devices.map(([device, count]) => {
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return `
                <div class="chart-bar">
                    <div class="chart-label">${device}</div>
                    <div class="chart-fill" style="width: ${percentage * 2}px;"></div>
                    <div class="chart-value">${percentage}%</div>
                </div>
            `;
        }).join('');
    }

    toggleDashboard() {
        const panel = document.getElementById('dashboard-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }

    toggleHeatmap() {
        const existingPoints = document.querySelectorAll('.heatmap-point');
        
        if (existingPoints.length > 0) {
            // Remove existing heatmap
            existingPoints.forEach(point => point.remove());
        } else {
            // Show heatmap
            this.analytics.clickHeatmap.forEach(click => {
                const point = document.createElement('div');
                point.className = 'heatmap-point';
                point.style.left = click.x + 'px';
                point.style.top = click.y + 'px';
                document.body.appendChild(point);
            });
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                document.querySelectorAll('.heatmap-point').forEach(point => point.remove());
            }, 10000);
        }
    }

    exportData() {
        const data = {
            ...this.analytics,
            exportTime: new Date().toISOString(),
            sessionDuration: Date.now() - this.startTime
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-analytics.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

const analyticsDashboard = new AnalyticsDashboard();