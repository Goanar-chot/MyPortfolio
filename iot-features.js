// IoT & Hardware Features
class IoTShowcase {
    constructor() {
        this.deviceStates = {};
        this.sensorData = {
            temperature: 23.5,
            humidity: 65,
            lightLevel: 450
        };
        this.motorState = 'stopped';
        this.motorSpeed = 50;
        
        this.initializeDevices();
        this.startSensorSimulation();
        this.initializeTrafficMonitoring();
    }

    // LED Control Functions
    toggleLED(color) {
        const led = document.getElementById(`led-${color}`);
        if (led) {
            led.classList.toggle('on');
            
            // Simulate Arduino communication
            console.log(`Arduino Command: digitalWrite(${color.toUpperCase()}_PIN, ${led.classList.contains('on') ? 'HIGH' : 'LOW'})`);
        }
    }

    runLightShow() {
        const colors = ['red', 'green', 'blue'];
        let sequence = 0;
        
        // Turn off all LEDs first
        colors.forEach(color => {
            const led = document.getElementById(`led-${color}`);
            if (led) led.classList.remove('on');
        });
        
        const lightShowInterval = setInterval(() => {
            // Turn off previous LED
            if (sequence > 0) {
                const prevLed = document.getElementById(`led-${colors[sequence - 1]}`);
                if (prevLed) prevLed.classList.remove('on');
            }
            
            // Turn on current LED
            const currentLed = document.getElementById(`led-${colors[sequence]}`);
            if (currentLed) currentLed.classList.add('on');
            
            sequence++;
            
            if (sequence >= colors.length) {
                sequence = 0;
            }
            
            // Stop after 10 cycles
            if (sequence === 0) {
                setTimeout(() => {
                    clearInterval(lightShowInterval);
                    colors.forEach(color => {
                        const led = document.getElementById(`led-${color}`);
                        if (led) led.classList.remove('on');
                    });
                }, 500);
            }
        }, 300);
    }

    // Motor Control Functions
    controlMotor(action) {
        const motor = document.getElementById('motor-display');
        
        switch(action) {
            case 'forward':
                this.motorState = 'forward';
                motor.classList.add('spinning');
                motor.style.animationDirection = 'normal';
                break;
            case 'reverse':
                this.motorState = 'reverse';
                motor.classList.add('spinning');
                motor.style.animationDirection = 'reverse';
                break;
            case 'stop':
                this.motorState = 'stopped';
                motor.classList.remove('spinning');
                break;
        }
        
        console.log(`Motor Control: ${action.toUpperCase()} at ${this.motorSpeed}% speed`);
    }

    updateMotorSpeed() {
        const speedSlider = document.getElementById('motor-speed');
        const speedDisplay = document.getElementById('speed-display');
        
        this.motorSpeed = speedSlider.value;
        speedDisplay.textContent = `${this.motorSpeed}%`;
        
        // Update motor animation speed based on slider
        const motor = document.getElementById('motor-display');
        const animationDuration = (101 - this.motorSpeed) / 100 * 2; // 0.02s to 2s
        motor.style.animationDuration = `${animationDuration}s`;
    }

    // Sensor Data Simulation
    startSensorSimulation() {
        setInterval(() => {
            this.updateSensorReadings();
        }, 2000);
    }

    updateSensorReadings() {
        // Simulate realistic sensor fluctuations
        this.sensorData.temperature += (Math.random() - 0.5) * 2;
        this.sensorData.humidity += (Math.random() - 0.5) * 5;
        this.sensorData.lightLevel += (Math.random() - 0.5) * 50;
        
        // Keep values in realistic ranges
        this.sensorData.temperature = Math.max(15, Math.min(35, this.sensorData.temperature));
        this.sensorData.humidity = Math.max(30, Math.min(90, this.sensorData.humidity));
        this.sensorData.lightLevel = Math.max(0, Math.min(1000, this.sensorData.lightLevel));
        
        // Update display
        const tempReading = document.getElementById('temp-reading');
        const humidityReading = document.getElementById('humidity-reading');
        const lightReading = document.getElementById('light-reading');
        
        if (tempReading) tempReading.textContent = `${this.sensorData.temperature.toFixed(1)}°C`;
        if (humidityReading) humidityReading.textContent = `${this.sensorData.humidity.toFixed(0)}%`;
        if (lightReading) lightReading.textContent = `${this.sensorData.lightLevel.toFixed(0)} lux`;
    }

    // Smart Home Device Control
    toggleDevice(deviceId) {
        const button = event.target;
        const isOn = button.classList.contains('active');
        
        if (isOn) {
            button.classList.remove('active');
            button.textContent = 'OFF';
            button.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        } else {
            button.classList.add('active');
            button.textContent = 'ON';
            button.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        }
        
        this.deviceStates[deviceId] = !isOn;
        console.log(`Device ${deviceId}: ${!isOn ? 'ON' : 'OFF'}`);
    }

    // Automation Scenarios
    runScenario(scenario) {
        console.log(`Running ${scenario} scenario...`);
        
        const scenarios = {
            morning: {
                'living-lights': true,
                'kitchen-lights': true,
                'kitchen-coffee': true,
                'bedroom-lights': false
            },
            evening: {
                'living-lights': true,
                'living-tv': true,
                'kitchen-lights': true,
                'bedroom-lights': false
            },
            away: {
                'living-lights': false,
                'living-tv': false,
                'living-ac': false,
                'kitchen-lights': false,
                'kitchen-coffee': false,
                'bedroom-lights': false,
                'bedroom-fan': false
            },
            sleep: {
                'living-lights': false,
                'living-tv': false,
                'kitchen-lights': false,
                'bedroom-lights': false,
                'bedroom-fan': true
            }
        };
        
        const scenarioDevices = scenarios[scenario];
        
        Object.keys(scenarioDevices).forEach(deviceId => {
            const button = document.querySelector(`[onclick="toggleDevice('${deviceId}')"]`);
            if (button) {
                const shouldBeOn = scenarioDevices[deviceId];
                
                if (shouldBeOn) {
                    button.classList.add('active');
                    button.textContent = 'ON';
                    button.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
                } else {
                    button.classList.remove('active');
                    button.textContent = 'OFF';
                    button.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
                }
                
                this.deviceStates[deviceId] = shouldBeOn;
            }
        });
        
        // Show notification
        this.showNotification(`${scenario.charAt(0).toUpperCase() + scenario.slice(1)} scenario activated!`);
    }

    // Hardware Troubleshooting
    showTroubleshooting() {
        const problem = document.getElementById('hardware-problem').value;
        const stepsDiv = document.getElementById('troubleshooting-steps');
        
        const troubleshootingSteps = {
            'boot-failure': [
                '1. Check power supply connections',
                '2. Verify SD card is properly inserted',
                '3. Check for corrupted boot files',
                '4. Test with known good SD card',
                '5. Check GPIO connections for shorts',
                '6. Verify power supply voltage (5V ±0.25V)'
            ],
            'overheating': [
                '1. Check ambient temperature',
                '2. Verify heat sink installation',
                '3. Clean dust from components',
                '4. Check for adequate ventilation',
                '5. Monitor CPU temperature (should be <80°C)',
                '6. Consider adding cooling fan'
            ],
            'network-connectivity': [
                '1. Check Ethernet cable connections',
                '2. Verify network configuration',
                '3. Test with ping command',
                '4. Check router/switch status',
                '5. Verify IP address assignment',
                '6. Test with different network cable'
            ],
            'sensor-malfunction': [
                '1. Check sensor wiring connections',
                '2. Verify power supply to sensor',
                '3. Test sensor with multimeter',
                '4. Check for loose connections',
                '5. Verify sensor compatibility',
                '6. Test with known good sensor'
            ],
            'power-issues': [
                '1. Check power adapter specifications',
                '2. Measure voltage at power input',
                '3. Check for voltage drops under load',
                '4. Verify current capacity of supply',
                '5. Check for loose power connections',
                '6. Test with different power adapter'
            ]
        };
        
        if (problem && troubleshootingSteps[problem]) {
            const steps = troubleshootingSteps[problem];
            stepsDiv.innerHTML = `
                <h4>Troubleshooting Steps for ${problem.replace('-', ' ').toUpperCase()}:</h4>
                <ol>
                    ${steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
                <p><strong>Note:</strong> Always ensure power is disconnected before making hardware changes.</p>
            `;
        } else {
            stepsDiv.innerHTML = '<p>Select a problem to see troubleshooting steps...</p>';
        }
    }

    // Project Viewers
    viewProject(projectType) {
        const projectData = {
            security: {
                title: 'Smart Home Security System',
                description: 'Live camera feed and motion detection system',
                status: 'Active monitoring - 3 cameras online'
            },
            weather: {
                title: 'Weather Monitoring Station',
                description: 'Real-time environmental data collection',
                status: 'Collecting data every 30 seconds'
            },
            network: {
                title: 'Network Monitoring Tool',
                description: 'Network traffic analysis and intrusion detection',
                status: 'Monitoring 47 devices on network'
            }
        };
        
        const project = projectData[projectType];
        if (project) {
            this.showNotification(`${project.title}: ${project.status}`);
        }
    }

    // Traffic Monitoring
    initializeTrafficMonitoring() {
        setInterval(() => {
            this.updateTrafficStats();
        }, 3000);
    }

    updateTrafficStats() {
        const inbound = document.getElementById('inbound-traffic');
        const outbound = document.getElementById('outbound-traffic');
        const suspicious = document.getElementById('suspicious-traffic');
        
        if (inbound) {
            const inboundValue = (Math.random() * 3 + 1).toFixed(1);
            inbound.textContent = `${inboundValue} MB/s`;
        }
        
        if (outbound) {
            const outboundValue = (Math.random() * 2 + 0.5).toFixed(1);
            outbound.textContent = `${outboundValue} MB/s`;
        }
        
        if (suspicious) {
            const suspiciousValue = Math.floor(Math.random() * 5);
            suspicious.textContent = `${suspiciousValue} packets`;
        }
    }

    // Initialize Devices
    initializeDevices() {
        console.log('IoT devices initialized');
        console.log('Raspberry Pi projects: 3 active');
        console.log('Arduino demonstrations: 3 ready');
        console.log('Smart home devices: 9 connected');
    }

    // Utility Functions
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #2ecc71, #27ae60);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            font-weight: bold;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for HTML buttons
window.toggleLED = (color) => iotShowcase.toggleLED(color);
window.runLightShow = () => iotShowcase.runLightShow();
window.controlMotor = (action) => iotShowcase.controlMotor(action);
window.updateMotorSpeed = () => iotShowcase.updateMotorSpeed();
window.toggleDevice = (deviceId) => iotShowcase.toggleDevice(deviceId);
window.runScenario = (scenario) => iotShowcase.runScenario(scenario);
window.showTroubleshooting = () => iotShowcase.showTroubleshooting();
window.viewProject = (projectType) => iotShowcase.viewProject(projectType);

// Initialize IoT Showcase
let iotShowcase;
document.addEventListener('DOMContentLoaded', () => {
    iotShowcase = new IoTShowcase();
});