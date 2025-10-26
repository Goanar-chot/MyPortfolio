// Machine Learning Features
class MLShowcase {
    constructor() {
        this.initializeMLDemos();
        this.initializeComputerVision();
        this.initializeNLP();
        this.animateMetrics();
    }

    // Sentiment Analysis
    analyzeSentiment() {
        const input = document.getElementById('sentiment-input').value;
        const result = document.getElementById('sentiment-result');
        
        if (!input.trim()) {
            result.innerHTML = '<p style="color: #f87171;">Please enter some text to analyze.</p>';
            return;
        }

        result.innerHTML = '<p>Analyzing sentiment...</p>';
        result.className = 'result-display processing';

        setTimeout(() => {
            const sentiments = ['Positive', 'Negative', 'Neutral'];
            const confidence = (Math.random() * 30 + 70).toFixed(1);
            const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            
            result.innerHTML = `
                <h4>Sentiment Analysis Result:</h4>
                <p><strong>Sentiment:</strong> ${sentiment}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
                <div class="sentiment-bar">
                    <div class="sentiment-fill" style="width: ${confidence}%"></div>
                </div>
            `;
            result.className = 'result-display success';
        }, 2000);
    }

    // Text Classification
    classifyText() {
        const input = document.getElementById('classification-input').value;
        const result = document.getElementById('classification-result');
        
        if (!input.trim()) {
            result.innerHTML = '<p style="color: #f87171;">Please enter text to classify.</p>';
            return;
        }

        result.innerHTML = '<p>Classifying text...</p>';
        result.className = 'result-display processing';

        setTimeout(() => {
            const categories = ['Technology', 'Business', 'Science', 'Sports', 'Entertainment'];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const confidence = (Math.random() * 25 + 75).toFixed(1);
            
            result.innerHTML = `
                <h4>Classification Result:</h4>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
                <p><strong>Keywords:</strong> ${this.extractSampleKeywords(input)}</p>
            `;
            result.className = 'result-display success';
        }, 1800);
    }

    // Predictive Analytics
    predictValue() {
        const input = document.getElementById('data-input').value;
        const canvas = document.getElementById('prediction-chart');
        
        if (!input || isNaN(input)) {
            alert('Please enter a valid numeric value.');
            return;
        }

        this.drawPredictionChart(canvas, parseFloat(input));
    }

    drawPredictionChart(canvas, baseValue) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(40, 180);
        ctx.lineTo(280, 180);
        ctx.stroke();

        // Generate prediction data
        const points = [];
        for (let i = 0; i < 10; i++) {
            const x = 40 + (i * 24);
            const trend = baseValue * (1 + (Math.random() - 0.3) * 0.2);
            const y = 180 - (trend / baseValue) * 80;
            points.push({x, y});
        }

        // Draw prediction line
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#ff6b6b';
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Computer Vision
    initializeComputerVision() {
        const imageInput = document.getElementById('image-input');
        const dropZone = document.getElementById('image-drop-zone');
        
        if (dropZone) {
            dropZone.addEventListener('click', () => imageInput.click());
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.style.borderColor = '#4ecdc4';
            });
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.processImage(e.dataTransfer.files[0]);
            });
        }

        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                this.processImage(e.target.files[0]);
            });
        }
    }

    processImage(file) {
        if (!file) return;
        
        const results = document.getElementById('image-results');
        results.innerHTML = '<p>Processing image...</p>';
        
        setTimeout(() => {
            const objects = ['Person', 'Car', 'Building', 'Tree', 'Animal'];
            const detected = objects[Math.floor(Math.random() * objects.length)];
            const confidence = (Math.random() * 20 + 80).toFixed(1);
            
            results.innerHTML = `
                <h4>Image Recognition Results:</h4>
                <p><strong>Detected:</strong> ${detected}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
                <p><strong>Processing Time:</strong> 1.2s</p>
            `;
        }, 2000);
    }

    // Face Detection
    startFaceDetection() {
        const video = document.getElementById('video-feed');
        const canvas = document.getElementById('face-canvas');
        
        // Simulate face detection (in real implementation, would use webcam)
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                this.simulateFaceDetection(canvas);
            })
            .catch(() => {
                // Fallback for demo
                this.simulateFaceDetection(canvas);
            });
    }

    simulateFaceDetection(canvas) {
        const ctx = canvas.getContext('2d');
        
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw simulated face detection box
            const x = Math.random() * 200 + 60;
            const y = Math.random() * 150 + 45;
            
            ctx.strokeStyle = '#4ecdc4';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, 80, 100);
            
            ctx.fillStyle = '#4ecdc4';
            ctx.font = '14px Arial';
            ctx.fillText('Face Detected', x, y - 10);
        }, 2000);
    }

    // NLP Functions
    summarizeText() {
        const input = document.getElementById('text-to-summarize').value;
        const result = document.getElementById('summary-result');
        
        if (!input.trim()) {
            result.innerHTML = '<p style="color: #f87171;">Please enter text to summarize.</p>';
            return;
        }

        result.innerHTML = '<p>Generating summary...</p>';
        
        setTimeout(() => {
            const sentences = input.split('.').filter(s => s.trim().length > 0);
            const summary = sentences.slice(0, Math.min(2, sentences.length)).join('. ') + '.';
            
            result.innerHTML = `
                <h4>Text Summary:</h4>
                <p>${summary}</p>
                <p><strong>Compression Ratio:</strong> ${((summary.length / input.length) * 100).toFixed(1)}%</p>
            `;
        }, 1500);
    }

    detectLanguage() {
        const input = document.getElementById('language-input').value;
        const result = document.getElementById('language-result');
        
        if (!input.trim()) {
            result.innerHTML = '<p style="color: #f87171;">Please enter text to detect language.</p>';
            return;
        }

        result.innerHTML = '<p>Detecting language...</p>';
        
        setTimeout(() => {
            const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
            const language = languages[Math.floor(Math.random() * languages.length)];
            const confidence = (Math.random() * 15 + 85).toFixed(1);
            
            result.innerHTML = `
                <h4>Language Detection:</h4>
                <p><strong>Language:</strong> ${language}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
            `;
        }, 1000);
    }

    extractKeywords() {
        const input = document.getElementById('keyword-input').value;
        const result = document.getElementById('keywords-result');
        
        if (!input.trim()) {
            result.innerHTML = '<p style="color: #f87171;">Please enter text to extract keywords.</p>';
            return;
        }

        result.innerHTML = '<p>Extracting keywords...</p>';
        
        setTimeout(() => {
            const keywords = this.extractSampleKeywords(input);
            
            result.innerHTML = `
                <h4>Extracted Keywords:</h4>
                <div class="keywords-list">
                    ${keywords.split(', ').map(keyword => 
                        `<span class="keyword-tag">${keyword}</span>`
                    ).join('')}
                </div>
            `;
        }, 1200);
    }

    extractSampleKeywords(text) {
        const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
        const keywords = words.slice(0, 5);
        return keywords.join(', ');
    }

    // Initialize ML Demos
    initializeMLDemos() {
        // Add global functions for button clicks
        window.analyzeSentiment = () => this.analyzeSentiment();
        window.classifyText = () => this.classifyText();
        window.predictValue = () => this.predictValue();
        window.summarizeText = () => this.summarizeText();
        window.detectLanguage = () => this.detectLanguage();
        window.extractKeywords = () => this.extractKeywords();
        window.startFaceDetection = () => this.startFaceDetection();
    }

    // Initialize NLP
    initializeNLP() {
        // Add keyword tag styles
        const style = document.createElement('style');
        style.textContent = `
            .keywords-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            .keyword-tag {
                background: linear-gradient(45deg, #4ecdc4, #44a08d);
                color: white;
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: bold;
            }
            .sentiment-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-top: 8px;
            }
            .sentiment-fill {
                height: 100%;
                background: linear-gradient(90deg, #4ecdc4, #44a08d);
                border-radius: 4px;
                transition: width 1s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Animate Performance Metrics
    animateMetrics() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.metric-fill');
                    fills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 500);
                    });
                }
            });
        });

        const metricsSection = document.querySelector('.performance-section');
        if (metricsSection) {
            observer.observe(metricsSection);
        }
    }
}

// Initialize ML Showcase
document.addEventListener('DOMContentLoaded', () => {
    new MLShowcase();
});