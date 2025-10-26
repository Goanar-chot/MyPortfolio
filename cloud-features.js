// Cloud Architecture Features
class CloudArchitectureVisualizer {
    constructor() {
        this.currentProvider = 'aws';
        this.currentIaC = 'terraform';
        this.costs = {
            compute: 16.56,
            storage: 7.30,
            network: 45.00
        };
        
        this.initializeServiceDetails();
        this.calculateCosts();
    }

    // Cloud Provider Switching
    showCloudProvider(provider) {
        // Hide all diagrams
        document.querySelectorAll('.architecture-diagram').forEach(diagram => {
            diagram.classList.add('hidden');
        });
        
        // Show selected diagram
        document.getElementById(`${provider}-diagram`).classList.remove('hidden');
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.currentProvider = provider;
        console.log(`Switched to ${provider.toUpperCase()} architecture`);
    }

    // Service Details Display
    showServiceDetails(serviceType) {
        event.stopPropagation(); // Prevent event bubbling
        
        const serviceDetails = {
            'ec2': {
                name: 'Amazon EC2',
                description: 'Elastic Compute Cloud - Virtual servers in the cloud',
                specs: 'Instance Type: t3.micro, vCPUs: 2, Memory: 1 GiB',
                cost: '$8.28/month',
                features: ['Auto Scaling', 'Load Balancing', 'Security Groups', 'Key Pairs']
            },
            'rds': {
                name: 'Amazon RDS',
                description: 'Relational Database Service - Managed database service',
                specs: 'Engine: MySQL 8.0, Instance: db.t3.micro, Storage: 20 GB',
                cost: '$15.84/month',
                features: ['Automated Backups', 'Multi-AZ', 'Read Replicas', 'Encryption']
            },
            's3': {
                name: 'Amazon S3',
                description: 'Simple Storage Service - Object storage service',
                specs: 'Storage Class: Standard, Capacity: 100 GB',
                cost: '$2.30/month',
                features: ['99.999999999% Durability', 'Versioning', 'Lifecycle Policies', 'Cross-Region Replication']
            },
            'lambda': {
                name: 'AWS Lambda',
                description: 'Serverless compute service',
                specs: 'Runtime: Python 3.9, Memory: 128 MB, Timeout: 30s',
                cost: '$0.20/month (1M requests)',
                features: ['Event-driven', 'Auto Scaling', 'Pay per Request', 'No Server Management']
            },
            'alb': {
                name: 'Application Load Balancer',
                description: 'Layer 7 load balancing for HTTP/HTTPS traffic',
                specs: 'Type: Application, Scheme: Internet-facing',
                cost: '$22.27/month',
                features: ['Path-based Routing', 'Host-based Routing', 'SSL Termination', 'Health Checks']
            },
            'cloudfront': {
                name: 'Amazon CloudFront',
                description: 'Content Delivery Network (CDN)',
                specs: 'Edge Locations: 400+, Data Transfer: 1 TB/month',
                cost: '$85.00/month',
                features: ['Global Edge Network', 'DDoS Protection', 'SSL/TLS', 'Real-time Metrics']
            },
            'azure-vm': {
                name: 'Azure Virtual Machine',
                description: 'Scalable compute resources in Azure',
                specs: 'Size: Standard_B1s, vCPUs: 1, Memory: 1 GB',
                cost: '$7.59/month',
                features: ['Availability Sets', 'Scale Sets', 'Managed Disks', 'Azure Security Center']
            },
            'app-service': {
                name: 'Azure App Service',
                description: 'Platform-as-a-Service for web apps',
                specs: 'Tier: Basic B1, Instances: 1',
                cost: '$54.75/month',
                features: ['Auto Scaling', 'Deployment Slots', 'Custom Domains', 'SSL Certificates']
            },
            'gce': {
                name: 'Google Compute Engine',
                description: 'Virtual machines running in Google Cloud',
                specs: 'Machine Type: e2-micro, vCPUs: 2, Memory: 1 GB',
                cost: '$6.11/month',
                features: ['Preemptible Instances', 'Custom Machine Types', 'Live Migration', 'Sustained Use Discounts']
            }
        };
        
        const service = serviceDetails[serviceType];
        if (service) {
            const detailsPanel = document.getElementById('service-details');
            detailsPanel.innerHTML = `
                <h3>${service.name}</h3>
                <p><strong>Description:</strong> ${service.description}</p>
                <p><strong>Specifications:</strong> ${service.specs}</p>
                <p><strong>Estimated Cost:</strong> ${service.cost}</p>
                <div class="service-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="service-actions">
                    <button onclick="cloudViz.deployService('${serviceType}')">Deploy Service</button>
                    <button onclick="cloudViz.configureService('${serviceType}')">Configure</button>
                </div>
            `;
        }
    }

    // Cost Calculator
    calculateCosts() {
        const ec2Count = parseInt(document.getElementById('ec2-count')?.value || 2);
        const ec2Type = document.getElementById('ec2-type')?.value || 't3.micro';
        const s3Storage = parseInt(document.getElementById('s3-storage')?.value || 100);
        const ebsStorage = parseInt(document.getElementById('ebs-storage')?.value || 50);
        const dataTransfer = parseInt(document.getElementById('data-transfer')?.value || 500);
        const cloudfrontData = parseInt(document.getElementById('cloudfront-data')?.value || 200);
        
        // EC2 pricing (simplified)
        const ec2Prices = {
            't3.micro': 8.28,
            't3.small': 16.56,
            'm5.large': 69.12
        };
        
        // Calculate costs
        this.costs.compute = ec2Count * ec2Prices[ec2Type];
        this.costs.storage = (s3Storage * 0.023) + (ebsStorage * 0.10);
        this.costs.network = (dataTransfer * 0.09) + (cloudfrontData * 0.085);
        
        // Update display
        document.getElementById('compute-cost').textContent = this.costs.compute.toFixed(2);
        document.getElementById('storage-cost').textContent = this.costs.storage.toFixed(2);
        document.getElementById('network-cost').textContent = this.costs.network.toFixed(2);
        
        const total = this.costs.compute + this.costs.storage + this.costs.network;
        document.getElementById('total-cost').textContent = total.toFixed(2);
    }

    // Cost Breakdown
    showCostBreakdown() {
        const total = this.costs.compute + this.costs.storage + this.costs.network;
        const breakdown = `
            <h3>Detailed Cost Breakdown</h3>
            <div class="breakdown-item">
                <span>Compute (${((this.costs.compute/total)*100).toFixed(1)}%)</span>
                <span>$${this.costs.compute.toFixed(2)}</span>
            </div>
            <div class="breakdown-item">
                <span>Storage (${((this.costs.storage/total)*100).toFixed(1)}%)</span>
                <span>$${this.costs.storage.toFixed(2)}</span>
            </div>
            <div class="breakdown-item">
                <span>Network (${((this.costs.network/total)*100).toFixed(1)}%)</span>
                <span>$${this.costs.network.toFixed(2)}</span>
            </div>
            <hr>
            <div class="breakdown-total">
                <span><strong>Total Monthly Cost</strong></span>
                <span><strong>$${total.toFixed(2)}</strong></span>
            </div>
        `;
        
        this.showModal('Cost Breakdown', breakdown);
    }

    // Export Cost Report
    exportCostReport() {
        const total = this.costs.compute + this.costs.storage + this.costs.network;
        const report = {
            date: new Date().toISOString().split('T')[0],
            provider: this.currentProvider.toUpperCase(),
            costs: {
                compute: this.costs.compute,
                storage: this.costs.storage,
                network: this.costs.network,
                total: total
            },
            services: {
                ec2_instances: document.getElementById('ec2-count')?.value || 2,
                ec2_type: document.getElementById('ec2-type')?.value || 't3.micro',
                s3_storage_gb: document.getElementById('s3-storage')?.value || 100,
                ebs_storage_gb: document.getElementById('ebs-storage')?.value || 50
            }
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cloud-cost-report-${report.date}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Cost report exported successfully!');
    }

    // Infrastructure as Code Examples
    showIaCExample(type) {
        // Hide all examples
        document.querySelectorAll('.iac-example').forEach(example => {
            example.classList.add('hidden');
        });
        
        // Show selected example
        document.getElementById(`${type}-example`).classList.remove('hidden');
        
        // Update tab buttons
        document.querySelectorAll('.iac-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.currentIaC = type;
    }

    // Deployment Scenarios
    showScenario(scenarioType) {
        const scenarios = {
            'hybrid': {
                title: 'Hybrid Cloud Architecture',
                description: 'Seamless integration between on-premises infrastructure and AWS cloud services.',
                components: [
                    'On-premises Active Directory integration with AWS SSO',
                    'Direct Connect for dedicated network connection',
                    'AWS Storage Gateway for hybrid storage',
                    'CloudFormation for infrastructure automation'
                ],
                benefits: [
                    'Gradual cloud migration strategy',
                    'Maintain sensitive data on-premises',
                    'Leverage cloud scalability when needed',
                    'Consistent security and compliance'
                ]
            },
            'multi-cloud': {
                title: 'Multi-Cloud Strategy',
                description: 'Distributed architecture across AWS, Azure, and Google Cloud platforms.',
                components: [
                    'AWS for primary compute and storage',
                    'Azure for Active Directory and Office 365 integration',
                    'Google Cloud for AI/ML workloads',
                    'Terraform for cross-cloud infrastructure management'
                ],
                benefits: [
                    'Avoid vendor lock-in',
                    'Leverage best-of-breed services',
                    'Geographic redundancy',
                    'Cost optimization opportunities'
                ]
            },
            'disaster-recovery': {
                title: 'Disaster Recovery Architecture',
                description: 'Cross-region backup and failover strategy for business continuity.',
                components: [
                    'Primary region: US-East-1',
                    'DR region: US-West-2',
                    'RDS Cross-Region Automated Backups',
                    'Route 53 health checks and failover routing'
                ],
                benefits: [
                    'RTO: 15 minutes',
                    'RPO: 5 minutes',
                    'Automated failover process',
                    '99.99% availability SLA'
                ]
            },
            'edge-computing': {
                title: 'Edge Computing Architecture',
                description: 'Distributed computing with CloudFront and AWS Lambda@Edge.',
                components: [
                    'CloudFront global edge locations',
                    'Lambda@Edge for request processing',
                    'AWS IoT Greengrass for edge devices',
                    'ElastiCache for edge caching'
                ],
                benefits: [
                    'Ultra-low latency (<50ms)',
                    'Reduced bandwidth costs',
                    'Improved user experience',
                    'Real-time data processing'
                ]
            }
        };
        
        const scenario = scenarios[scenarioType];
        if (scenario) {
            const detailsDiv = document.getElementById('scenario-details');
            detailsDiv.innerHTML = `
                <h3>${scenario.title}</h3>
                <p>${scenario.description}</p>
                
                <div class="scenario-section">
                    <h4>Key Components:</h4>
                    <ul>
                        ${scenario.components.map(component => `<li>${component}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="scenario-section">
                    <h4>Benefits:</h4>
                    <ul>
                        ${scenario.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="scenario-actions">
                    <button onclick="cloudViz.deployScenario('${scenarioType}')">Deploy Architecture</button>
                    <button onclick="cloudViz.estimateScenarioCost('${scenarioType}')">Cost Estimate</button>
                </div>
            `;
        }
    }

    // Service Actions
    deployService(serviceType) {
        this.showNotification(`Deploying ${serviceType.toUpperCase()}... This would trigger actual deployment in a real environment.`);
        
        // Simulate deployment progress
        setTimeout(() => {
            this.showNotification(`${serviceType.toUpperCase()} deployed successfully!`);
        }, 3000);
    }

    configureService(serviceType) {
        this.showNotification(`Opening configuration panel for ${serviceType.toUpperCase()}...`);
    }

    deployScenario(scenarioType) {
        this.showNotification(`Initiating deployment of ${scenarioType} architecture...`);
    }

    estimateScenarioCost(scenarioType) {
        const estimates = {
            'hybrid': '$2,450/month',
            'multi-cloud': '$4,200/month',
            'disaster-recovery': '$1,800/month',
            'edge-computing': '$3,100/month'
        };
        
        this.showNotification(`Estimated cost for ${scenarioType}: ${estimates[scenarioType]}`);
    }

    // Initialize Service Details
    initializeServiceDetails() {
        // Add CSS for service actions
        const style = document.createElement('style');
        style.textContent = `
            .service-features ul {
                list-style-type: none;
                padding-left: 0;
            }
            .service-features li {
                background: rgba(78, 205, 196, 0.1);
                margin: 5px 0;
                padding: 8px 12px;
                border-radius: 5px;
                border-left: 3px solid #4ecdc4;
            }
            .service-actions {
                margin-top: 20px;
                display: flex;
                gap: 10px;
            }
            .service-actions button {
                background: linear-gradient(45deg, #3498db, #2980b9);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .service-actions button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
            }
            .breakdown-item, .breakdown-total {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .scenario-section {
                margin: 20px 0;
            }
            .scenario-actions {
                margin-top: 20px;
                display: flex;
                gap: 10px;
            }
            .scenario-actions button {
                background: linear-gradient(45deg, #2ecc71, #27ae60);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Utility Functions
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #2c3e50, #34495e); padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; color: white;">
                <h2>${title}</h2>
                ${content}
                <button onclick="this.closest('.modal').remove()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">Close</button>
            </div>
        `;
        
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    showNotification(message) {
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
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Global functions for HTML buttons
window.showCloudProvider = (provider) => cloudViz.showCloudProvider(provider);
window.showServiceDetails = (serviceType) => cloudViz.showServiceDetails(serviceType);
window.calculateCosts = () => cloudViz.calculateCosts();
window.showCostBreakdown = () => cloudViz.showCostBreakdown();
window.exportCostReport = () => cloudViz.exportCostReport();
window.showIaCExample = (type) => cloudViz.showIaCExample(type);
window.showScenario = (scenarioType) => cloudViz.showScenario(scenarioType);

// Initialize Cloud Architecture Visualizer
let cloudViz;
document.addEventListener('DOMContentLoaded', () => {
    cloudViz = new CloudArchitectureVisualizer();
});