// Dynamic Theme Generator
class ThemeGenerator {
    constructor() {
        this.themes = {
            cyberpunk: {
                primary: '#ff0080',
                secondary: '#00ff80',
                background: '#0a0a0a',
                text: '#ffffff',
                accent: '#ff8000'
            },
            ocean: {
                primary: '#0077be',
                secondary: '#00a8cc',
                background: '#f0f8ff',
                text: '#2c3e50',
                accent: '#17a2b8'
            },
            sunset: {
                primary: '#ff6b35',
                secondary: '#f7931e',
                background: '#fff8f0',
                text: '#2c3e50',
                accent: '#ff8c42'
            },
            forest: {
                primary: '#2d5016',
                secondary: '#4a7c59',
                background: '#f8fff8',
                text: '#2c3e50',
                accent: '#6ab04c'
            }
        };
        this.init();
    }

    init() {
        this.createThemeSelector();
        this.createCustomColorPicker();
    }

    createThemeSelector() {
        const themeSelector = document.createElement('div');
        themeSelector.className = 'theme-selector';
        themeSelector.innerHTML = `
            <div class="theme-toggle-btn" onclick="this.parentElement.classList.toggle('open')">
                🎨 Themes
            </div>
            <div class="theme-options">
                <div class="theme-option" onclick="themeGenerator.applyTheme('default')">Default</div>
                <div class="theme-option" onclick="themeGenerator.applyTheme('cyberpunk')">Cyberpunk</div>
                <div class="theme-option" onclick="themeGenerator.applyTheme('ocean')">Ocean</div>
                <div class="theme-option" onclick="themeGenerator.applyTheme('sunset')">Sunset</div>
                <div class="theme-option" onclick="themeGenerator.applyTheme('forest')">Forest</div>
                <div class="theme-option" onclick="themeGenerator.showColorPicker()">Custom</div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-selector {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1000;
                background: rgba(255,255,255,0.9);
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                backdrop-filter: blur(10px);
            }
            .theme-toggle-btn {
                padding: 10px 15px;
                cursor: pointer;
                font-weight: bold;
                border-radius: 10px;
                transition: all 0.3s ease;
            }
            .theme-toggle-btn:hover {
                background: rgba(0,123,255,0.1);
            }
            .theme-options {
                display: none;
                padding: 10px 0;
            }
            .theme-selector.open .theme-options {
                display: block;
            }
            .theme-option {
                padding: 8px 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .theme-option:hover {
                background: rgba(0,123,255,0.1);
            }
            .color-picker-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .color-picker-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 50px rgba(0,0,0,0.3);
            }
            .color-input {
                margin: 10px;
                padding: 10px;
                border: 2px solid #ddd;
                border-radius: 5px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(themeSelector);
    }

    applyTheme(themeName) {
        if (themeName === 'default') {
            document.documentElement.style.removeProperty('--primary-color');
            document.documentElement.style.removeProperty('--secondary-color');
            document.documentElement.style.removeProperty('--background-color');
            document.documentElement.style.removeProperty('--text-color');
            return;
        }

        const theme = this.themes[themeName];
        if (theme) {
            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.secondary);
            document.documentElement.style.setProperty('--background-color', theme.background);
            document.documentElement.style.setProperty('--text-color', theme.text);
            document.documentElement.style.setProperty('--accent-color', theme.accent);
            
            // Apply to existing elements
            document.querySelectorAll('.btn-primary').forEach(btn => {
                btn.style.background = theme.primary;
            });
            
            document.querySelectorAll('.section-header').forEach(header => {
                header.style.borderLeft = `4px solid ${theme.primary}`;
            });
        }
    }

    showColorPicker() {
        const modal = document.createElement('div');
        modal.className = 'color-picker-modal';
        modal.innerHTML = `
            <div class="color-picker-content">
                <h3>Create Custom Theme</h3>
                <label>Primary Color: <input type="color" class="color-input" id="primary-color" value="#007BFF"></label><br>
                <label>Secondary Color: <input type="color" class="color-input" id="secondary-color" value="#6c757d"></label><br>
                <label>Background Color: <input type="color" class="color-input" id="background-color" value="#ffffff"></label><br>
                <label>Text Color: <input type="color" class="color-input" id="text-color" value="#333333"></label><br>
                <button onclick="themeGenerator.applyCustomTheme()" class="btn btn-primary">Apply Theme</button>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-secondary">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    applyCustomTheme() {
        const primary = document.getElementById('primary-color').value;
        const secondary = document.getElementById('secondary-color').value;
        const background = document.getElementById('background-color').value;
        const text = document.getElementById('text-color').value;

        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        document.documentElement.style.setProperty('--background-color', background);
        document.documentElement.style.setProperty('--text-color', text);

        document.querySelector('.color-picker-modal').remove();
    }

    generateRandomTheme() {
        const hue = Math.floor(Math.random() * 360);
        const primary = `hsl(${hue}, 70%, 50%)`;
        const secondary = `hsl(${(hue + 60) % 360}, 70%, 60%)`;
        const background = `hsl(${hue}, 20%, 95%)`;
        const text = `hsl(${hue}, 30%, 20%)`;

        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        document.documentElement.style.setProperty('--background-color', background);
        document.documentElement.style.setProperty('--text-color', text);
    }
}

const themeGenerator = new ThemeGenerator();