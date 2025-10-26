// Advanced Security Features
class SecuritySimulator {
    constructor() {
        this.activeIncident = null;
        this.auditScore = 0;
        this.initializeDashboard();
        this.startThreatMonitoring();
    }

    // Port Scanning Simulator
    scanPorts() {
        const results = document.getElementById('scan-results');
        results.innerHTML = '<div class="scanning">Scanning ports...</div>';
        
        setTimeout(() => {
            const ports = [
                { port: 22, service: 'SSH', status: 'OPEN', risk: 'LOW' },
                { port: 80, service: 'HTTP', status: 'OPEN', risk: 'MEDIUM' },
                { port: 443, service: 'HTTPS', status: 'OPEN', risk: 'LOW' },
                { port: 21, service: 'FTP', status: 'OPEN', risk: 'HIGH' },
                { port: 23, service: 'TELNET', status: 'FILTERED', risk: 'HIGH' }
            ];
            
            let output = 'PORT SCAN RESULTS:\n\n';
            ports.forEach(p => {
                output += `Port ${p.port}/${p.service}: ${p.status} [${p.risk} RISK]\n`;
            });
            
            results.innerHTML = `<pre>${output}</pre>`;
        }, 3000);
    }

    // Vulnerability Scanner
    runVulnScan() {
        const scanType = document.getElementById('scan-type').value;
        const results = document.getElementById('vuln-results');
        
        results.innerHTML = '<div class="scanning">Running vulnerability scan...</div>';
        
        setTimeout(() => {
            const vulnerabilities = [
                { id: 'CVE-2023-1234', severity: 'CRITICAL', description: 'Buffer overflow in SSH service' },
                { id: 'CVE-2023-5678', severity: 'HIGH', description: 'SQL injection vulnerability' },
                { id: 'CVE-2023-9012', severity: 'MEDIUM', description: 'Cross-site scripting (XSS)' },
                { id: 'CVE-2023-3456', severity: 'LOW', description: 'Information disclosure' }
            ];
            
            let output = `VULNERABILITY SCAN (${scanType.toUpperCase()}):\n\n`;
            vulnerabilities.forEach(v => {
                output += `${v.id} [${v.severity}]: ${v.description}\n`;
            });
            
            results.innerHTML = `<pre>${output}</pre>`;
        }, 4000);
    }

    // Exploit Framework
    launchExploit() {
        const exploitType = document.getElementById('exploit-type').value;
        const results = document.getElementById('exploit-results');
        
        results.innerHTML = '<div class="scanning">Launching exploit...</div>';
        
        setTimeout(() => {
            const success = Math.random() > 0.3;
            let output = `EXPLOIT: ${exploitType.toUpperCase()}\n\n`;
            
            if (success) {
                output += 'STATUS: SUCCESS\n';
                output += 'ACCESS: Shell obtained\n';
                output += 'PRIVILEGES: User level\n';
                output += 'NEXT: Privilege escalation recommended\n';
            } else {
                output += 'STATUS: FAILED\n';
                output += 'REASON: Target patched\n';
                output += 'RECOMMENDATION: Try alternative exploit\n';
            }
            
            results.innerHTML = `<pre>${output}</pre>`;
        }, 2500);
    }

    // Security Audit Score
    updateAuditScore() {
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        const checked = document.querySelectorAll('.checklist input[type="checkbox"]:checked');
        
        this.auditScore = Math.round((checked.length / checkboxes.length) * 100);
        
        const scoreValue = document.getElementById('security-score');
        const scoreFill = document.getElementById('score-fill');
        
        if (scoreValue && scoreFill) {
            scoreValue.textContent = `${this.auditScore}%`;
            scoreFill.style.width = `${this.auditScore}%`;
            
            // Update color based on score
            if (this.auditScore >= 80) {
                scoreValue.style.color = '#00ff00';
            } else if (this.auditScore >= 60) {
                scoreValue.style.color = '#ffff00';
            } else {
                scoreValue.style.color = '#ff0000';
            }
        }
    }

    // Incident Response Simulator
    simulateIncident(type) {
        this.activeIncident = {
            type: type,
            startTime: new Date(),
            status: 'ACTIVE',
            severity: this.getIncidentSeverity(type)
        };
        
        this.updateIncidentTimeline();
        this.enableResponseActions();
    }

    getIncidentSeverity(type) {
        const severities = {
            'malware': 'HIGH',
            'ddos': 'CRITICAL',
            'breach': 'CRITICAL'
        };
        return severities[type] || 'MEDIUM';
    }

    updateIncidentTimeline() {
        const timeline = document.getElementById('incident-timeline');
        
        if (this.activeIncident) {
            const timeStr = this.activeIncident.startTime.toLocaleTimeString();
            timeline.innerHTML = `
                <h3>Incident Timeline</h3>
                <div class="timeline-event">
                    <strong>${timeStr}</strong> - ${this.activeIncident.type.toUpperCase()} incident detected
                    <br>Severity: ${this.activeIncident.severity}
                    <br>Status: ${this.activeIncident.status}
                </div>
            `;
        }
    }

    enableResponseActions() {
        document.getElementById('contain-btn').disabled = false;
        document.getElementById('investigate-btn').disabled = false;
        document.getElementById('recover-btn').disabled = false;
    }

    containThreat() {
        if (this.activeIncident) {
            const timeline = document.getElementById('incident-timeline');
            const timeStr = new Date().toLocaleTimeString();
            
            timeline.innerHTML += `
                <div class="timeline-event">
                    <strong>${timeStr}</strong> - Threat containment initiated
                    <br>Action: Isolated affected systems
                </div>
            `;
            
            document.getElementById('contain-btn').disabled = true;
        }
    }

    investigateIncident() {
        if (this.activeIncident) {
            const timeline = document.getElementById('incident-timeline');
            const timeStr = new Date().toLocaleTimeString();
            
            timeline.innerHTML += `
                <div class="timeline-event">
                    <strong>${timeStr}</strong> - Investigation started
                    <br>Action: Analyzing logs and forensic data
                </div>
            `;
            
            document.getElementById('investigate-btn').disabled = true;
        }
    }

    recoverSystems() {
        if (this.activeIncident) {
            const timeline = document.getElementById('incident-timeline');
            const timeStr = new Date().toLocaleTimeString();
            
            timeline.innerHTML += `
                <div class="timeline-event">
                    <strong>${timeStr}</strong> - System recovery completed
                    <br>Action: All systems restored and secured
                </div>
            `;
            
            this.activeIncident.status = 'RESOLVED';
            document.getElementById('recover-btn').disabled = true;
        }
    }

    // Live Dashboard Updates
    initializeDashboard() {
        setInterval(() => {
            this.updateDashboardStats();
        }, 5000);
    }

    updateDashboardStats() {
        const firewallBlocked = document.getElementById('firewall-blocked');
        const idsAlerts = document.getElementById('ids-alerts');
        const vpnConnections = document.getElementById('vpn-connections');
        
        if (firewallBlocked) {
            const current = parseInt(firewallBlocked.textContent.replace(',', ''));
            firewallBlocked.textContent = (current + Math.floor(Math.random() * 10)).toLocaleString();
        }
        
        if (idsAlerts) {
            idsAlerts.textContent = Math.floor(Math.random() * 20) + 5;
        }
        
        if (vpnConnections) {
            vpnConnections.textContent = Math.floor(Math.random() * 20) + 40;
        }
    }

    // Threat Monitoring
    startThreatMonitoring() {
        setInterval(() => {
            this.updateThreatStats();
        }, 3000);
        
        // Add threat indicator tooltips
        document.querySelectorAll('.threat-indicator').forEach(indicator => {
            indicator.addEventListener('mouseenter', (e) => {
                const threat = e.target.getAttribute('data-threat');
                e.target.title = threat;
            });
        });
    }

    updateThreatStats() {
        const activeThreats = document.getElementById('active-threats');
        const blockedAttacks = document.getElementById('blocked-attacks');
        
        if (activeThreats) {
            const current = parseInt(activeThreats.textContent.replace(',', ''));
            activeThreats.textContent = (current + Math.floor(Math.random() * 50) - 25).toLocaleString();
        }
        
        if (blockedAttacks) {
            const current = parseInt(blockedAttacks.textContent.replace(',', ''));
            blockedAttacks.textContent = (current + Math.floor(Math.random() * 100)).toLocaleString();
        }
    }
}

// Network Security Tools
class NetworkSecurityTools {
    constructor() {
        this.initializeTools();
    }

    initializeTools() {
        console.log('Network Security Tools initialized');
    }

    // Firewall Rule Generator
    generateFirewallRules(config) {
        const rules = [
            'iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
            'iptables -A INPUT -p tcp --dport 80 -j ACCEPT',
            'iptables -A INPUT -p tcp --dport 443 -j ACCEPT',
            'iptables -A INPUT -j DROP'
        ];
        return rules;
    }

    // IDS Signature Generator
    generateIDSSignatures() {
        return [
            'alert tcp any any -> any 80 (msg:"Possible SQL Injection"; content:"SELECT"; sid:1001;)',
            'alert tcp any any -> any any (msg:"Suspicious PowerShell"; content:"powershell"; sid:1002;)',
            'alert icmp any any -> any any (msg:"ICMP Ping Sweep"; threshold:type both,track by_src,count 10,seconds 60; sid:1003;)'
        ];
    }
}

// Global functions for HTML buttons
window.scanPorts = () => securitySim.scanPorts();
window.runVulnScan = () => securitySim.runVulnScan();
window.launchExploit = () => securitySim.launchExploit();
window.updateAuditScore = () => securitySim.updateAuditScore();
window.simulateIncident = (type) => securitySim.simulateIncident(type);
window.containThreat = () => securitySim.containThreat();
window.investigateIncident = () => securitySim.investigateIncident();
window.recoverSystems = () => securitySim.recoverSystems();

// Initialize Security Simulator
let securitySim;
document.addEventListener('DOMContentLoaded', () => {
    securitySim = new SecuritySimulator();
    new NetworkSecurityTools();
});