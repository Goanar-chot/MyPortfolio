// Mini Games for Portfolio
class PortfolioGames {
    constructor() {
        this.init();
    }

    init() {
        this.createSkillsMemoryGame();
        this.createTypingChallenge();
    }

    createSkillsMemoryGame() {
        const gameHTML = `
            <div id="memory-game" class="mini-game" style="display: none;">
                <h3>🧠 Skills Memory Game</h3>
                <p>Match the skills with their categories!</p>
                <div class="memory-board"></div>
                <button onclick="portfolioGames.startMemoryGame()">Start Game</button>
                <div class="game-score">Score: <span id="memory-score">0</span></div>
            </div>
        `;
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.querySelector('.section-content').insertAdjacentHTML('beforeend', gameHTML);
        }
    }

    startMemoryGame() {
        const skills = ['JavaScript', 'Python', 'AWS', 'Linux', 'Security', 'Docker'];
        const board = document.querySelector('.memory-board');
        board.innerHTML = '';
        
        const cards = [...skills, ...skills].sort(() => Math.random() - 0.5);
        let flipped = [];
        let matches = 0;
        
        cards.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">${skill}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (flipped.length < 2 && !card.classList.contains('flipped')) {
                    card.classList.add('flipped');
                    flipped.push({card, skill, index});
                    
                    if (flipped.length === 2) {
                        setTimeout(() => {
                            if (flipped[0].skill === flipped[1].skill) {
                                matches++;
                                document.getElementById('memory-score').textContent = matches;
                                if (matches === skills.length) {
                                    alert('🎉 Congratulations! You matched all skills!');
                                }
                            } else {
                                flipped.forEach(f => f.card.classList.remove('flipped'));
                            }
                            flipped = [];
                        }, 1000);
                    }
                }
            });
            
            board.appendChild(card);
        });
        
        document.getElementById('memory-game').style.display = 'block';
    }

    createTypingChallenge() {
        const gameHTML = `
            <div id="typing-game" class="mini-game" style="display: none;">
                <h3>⌨️ Coding Speed Challenge</h3>
                <div class="typing-text">const portfolio = new AwesomePortfolio();</div>
                <input type="text" id="typing-input" placeholder="Type the code above...">
                <div class="typing-stats">
                    <span>WPM: <span id="wpm">0</span></span>
                    <span>Accuracy: <span id="accuracy">100%</span></span>
                </div>
                <button onclick="portfolioGames.startTypingGame()">Start Challenge</button>
            </div>
        `;
        
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.querySelector('.section-content').insertAdjacentHTML('beforeend', gameHTML);
        }
    }

    startTypingGame() {
        const texts = [
            'const portfolio = new AwesomePortfolio();',
            'function deployToAWS() { return success; }',
            'sudo systemctl restart nginx',
            'git commit -m "Added amazing features"'
        ];
        
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        document.querySelector('.typing-text').textContent = randomText;
        
        const input = document.getElementById('typing-input');
        input.value = '';
        input.focus();
        
        let startTime = Date.now();
        
        input.addEventListener('input', () => {
            const typed = input.value;
            const target = randomText;
            
            // Calculate accuracy
            let correct = 0;
            for (let i = 0; i < typed.length; i++) {
                if (typed[i] === target[i]) correct++;
            }
            const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
            document.getElementById('accuracy').textContent = accuracy + '%';
            
            // Calculate WPM
            const timeElapsed = (Date.now() - startTime) / 1000 / 60;
            const wordsTyped = typed.length / 5;
            const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
            document.getElementById('wpm').textContent = wpm;
            
            if (typed === target) {
                alert(`🎉 Perfect! WPM: ${wpm}, Accuracy: ${accuracy}%`);
            }
        });
        
        document.getElementById('typing-game').style.display = 'block';
    }
}

const portfolioGames = new PortfolioGames();