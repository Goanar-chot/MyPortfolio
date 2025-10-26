// Project Showcase Interactive Features

class ProjectShowcase {
    constructor() {
        this.projects = {};
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadProjectData();
        this.setupFilters();
        this.setupModal();
        this.setupAnimations();
    }

    loadProjectData() {
        // Detailed project information
        this.projects = {
            'aws-infrastructure': {
                title: 'AWS Cloud Infrastructure Setup',
                category: 'infrastructure',
                overview: {
                    description: 'Designed and implemented a comprehensive cloud infrastructure solution using AWS services to support a growing business with scalable, secure, and cost-effective computing resources.',
                    duration: '3 months',
                    team: '5 members',
                    role: 'Lead Infrastructure Engineer'
                },
                challenge: 'The organization needed to migrate from on-premises infrastructure to cloud-based solutions to improve scalability, reduce costs, and enhance security while maintaining 99.9% uptime.',
                solution: 'Implemented a multi-tier AWS architecture using EC2 instances, VPC networking, S3 storage, and RDS databases with automated backup and monitoring systems.',
                technologies: {
                    'Cloud Services': ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS VPC', 'AWS IAM'],
                    'Operating Systems': ['Red Hat Enterprise Linux 8', 'Ubuntu Server 20.04'],
                    'Networking': ['VPC Configuration', 'Security Groups', 'Load Balancers'],
                    'Monitoring': ['CloudWatch', 'CloudTrail', 'AWS Config']
                },
                metrics: [
                    { label: 'Uptime Achieved', value: '99.9%' },
                    { label: 'Cost Reduction', value: '35%' },
                    { label: 'Performance Improvement', value: '50%' },
                    { label: 'Security Score', value: '95/100' }
                ],
                challenges: [
                    {
                        challenge: 'Data Migration',
                        solution: 'Implemented phased migration approach with AWS DataSync and Database Migration Service to ensure zero data loss and minimal downtime.'
                    },
                    {
                        challenge: 'Security Compliance',
                        solution: 'Configured comprehensive security groups, IAM policies, and encryption at rest and in transit to meet industry compliance standards.'
                    },
                    {
                        challenge: 'Cost Optimization',
                        solution: 'Implemented auto-scaling groups, reserved instances, and lifecycle policies to optimize costs while maintaining performance.'
                    }
                ],
                results: [
                    'Successfully migrated 500GB of data with zero downtime',
                    'Reduced infrastructure costs by 35% compared to on-premises',
                    'Improved system performance by 50% with auto-scaling',
                    'Achieved 99.9% uptime SLA compliance',
                    'Enhanced security posture with AWS security best practices'
                ],
                links: [
                    { text: 'View Architecture Diagram', url: '#', type: 'primary' },
                    { text: 'AWS Documentation', url: 'https://docs.aws.amazon.com', type: 'secondary' }
                ]
            },
            'security-monitoring': {
                title: 'Security Monitoring Dashboard',
                category: 'security',
                overview: {
                    description: 'Developed a comprehensive security monitoring solution with real-time threat detection, automated incident response, and detailed security analytics for enterprise environment.',
                    duration: '2 months',
                    team: '3 members',
                    role: 'Security Analyst & Developer'
                },
                challenge: 'The organization lacked centralized security monitoring and was experiencing delayed threat detection, leading to potential security vulnerabilities and compliance issues.',
                solution: 'Built a custom SIEM solution using Python, integrated with multiple security tools, providing real-time monitoring, automated alerting, and comprehensive security dashboards.',
                technologies: {
                    'Programming': ['Python', 'JavaScript', 'SQL'],
                    'Security Tools': ['Splunk', 'Nessus', 'Wireshark', 'OSSEC'],
                    'Databases': ['Elasticsearch', 'PostgreSQL'],
                    'Visualization': ['Grafana', 'Kibana', 'D3.js']
                },
                metrics: [
                    { label: 'Threats Detected', value: '500+' },
                    { label: 'Response Time', value: '< 5 min' },
                    { label: 'False Positives', value: '< 2%' },
                    { label: 'Coverage', value: '100%' }
                ],
                challenges: [
                    {
                        challenge: 'Data Integration',
                        solution: 'Developed custom APIs and parsers to integrate data from multiple security tools and log sources into a unified dashboard.'
                    },
                    {
                        challenge: 'Real-time Processing',
                        solution: 'Implemented stream processing with Apache Kafka and real-time analytics to ensure immediate threat detection and alerting.'
                    },
                    {
                        challenge: 'Alert Fatigue',
                        solution: 'Created intelligent filtering and correlation rules to reduce false positives and prioritize critical security events.'
                    }
                ],
                results: [
                    'Reduced mean time to detection (MTTD) from hours to minutes',
                    'Achieved 98% accuracy in threat detection with minimal false positives',
                    'Automated 80% of routine security monitoring tasks',
                    'Improved compliance reporting efficiency by 70%',
                    'Enhanced security team productivity by 60%'
                ],
                links: [
                    { text: 'View Dashboard Demo', url: '#', type: 'primary' },
                    { text: 'Security Framework Guide', url: '#', type: 'secondary' }
                ]
            },
            'automation-suite': {
                title: 'IT Automation Suite',
                category: 'automation',
                overview: {
                    description: 'Developed comprehensive automation scripts and tools to streamline IT operations, reduce manual tasks, and improve system reliability across the organization.',
                    duration: '4 months',
                    team: '2 members',
                    role: 'Automation Developer'
                },
                challenge: 'IT team was spending 60% of time on repetitive manual tasks, leading to inefficiency, human errors, and delayed response to critical issues.',
                solution: 'Created a suite of automation scripts using Python, Bash, and PowerShell to automate system maintenance, user management, monitoring, and reporting tasks.',
                technologies: {
                    'Scripting': ['Python', 'Bash', 'PowerShell', 'Ansible'],
                    'Scheduling': ['Cron', 'Task Scheduler', 'Jenkins'],
                    'APIs': ['REST APIs', 'Active Directory API', 'AWS CLI'],
                    'Monitoring': ['Nagios', 'Zabbix', 'Custom Scripts']
                },
                metrics: [
                    { label: 'Time Saved', value: '80%' },
                    { label: 'Error Reduction', value: '95%' },
                    { label: 'Tasks Automated', value: '15' },
                    { label: 'ROI', value: '300%' }
                ],
                challenges: [
                    {
                        challenge: 'Legacy System Integration',
                        solution: 'Developed custom adapters and APIs to integrate automation scripts with legacy systems that lacked modern interfaces.'
                    },
                    {
                        challenge: 'Error Handling',
                        solution: 'Implemented comprehensive error handling, logging, and rollback mechanisms to ensure reliable automation execution.'
                    },
                    {
                        challenge: 'Security Concerns',
                        solution: 'Designed secure automation workflows with proper authentication, authorization, and audit trails for all automated actions.'
                    }
                ],
                results: [
                    'Reduced manual IT tasks by 80%, saving 32 hours per week',
                    'Decreased system errors by 95% through automated processes',
                    'Improved system uptime from 95% to 99.5%',
                    'Enhanced security through consistent automated configurations',
                    'Enabled IT team to focus on strategic initiatives'
                ],
                links: [
                    { text: 'View Script Repository', url: '#', type: 'primary' },
                    { text: 'Automation Best Practices', url: '#', type: 'secondary' }
                ]
            },
            'portfolio-website': {
                title: 'Professional Portfolio Website',
                category: 'web-development',
                overview: {
                    description: 'Designed and developed a modern, responsive portfolio website showcasing technical skills, projects, and professional experience with advanced features and optimal performance.',
                    duration: '1 month',
                    team: '1 member (Solo Project)',
                    role: 'Full-Stack Developer & Designer'
                },
                challenge: 'Needed a professional online presence to showcase technical skills and projects while demonstrating web development capabilities and modern design principles.',
                solution: 'Built a comprehensive portfolio website using modern web technologies with responsive design, interactive features, PWA capabilities, and performance optimization.',
                technologies: {
                    'Frontend': ['HTML5', 'CSS3', 'JavaScript ES6+', 'CSS Grid & Flexbox'],
                    'Features': ['Progressive Web App', 'Service Workers', 'Local Storage'],
                    'Performance': ['Lazy Loading', 'Code Splitting', 'Image Optimization'],
                    'Analytics': ['Google Analytics', 'Core Web Vitals', 'Performance Monitoring']
                },
                metrics: [
                    { label: 'Performance Score', value: '95+' },
                    { label: 'Accessibility Score', value: '100' },
                    { label: 'SEO Score', value: '100' },
                    { label: 'Load Time', value: '< 2s' }
                ],
                challenges: [
                    {
                        challenge: 'Performance Optimization',
                        solution: 'Implemented lazy loading, image optimization, code minification, and efficient caching strategies to achieve sub-2-second load times.'
                    },
                    {
                        challenge: 'Cross-Browser Compatibility',
                        solution: 'Used progressive enhancement and feature detection to ensure consistent experience across all modern browsers and devices.'
                    },
                    {
                        challenge: 'SEO Optimization',
                        solution: 'Implemented structured data, meta tags, semantic HTML, and sitemap to improve search engine visibility and ranking.'
                    }
                ],
                results: [
                    'Achieved 95+ performance score on Google PageSpeed Insights',
                    'Perfect accessibility and SEO scores',
                    'Fully responsive design working on all device sizes',
                    'PWA capabilities enabling offline functionality',
                    'Professional online presence showcasing technical expertise'
                ],
                links: [
                    { text: 'View Live Site', url: 'index.html', type: 'primary' },
                    { text: 'Source Code', url: '#', type: 'secondary' }
                ]
            },
            'network-security': {
                title: 'Network Security Assessment',
                category: 'security',
                overview: {
                    description: 'Conducted comprehensive network security assessment and implemented security hardening measures to protect organizational infrastructure from cyber threats.',
                    duration: '6 weeks',
                    team: '4 members',
                    role: 'Security Analyst'
                },
                challenge: 'Organization had outdated security measures and potential vulnerabilities that could expose sensitive data and systems to cyber attacks.',
                solution: 'Performed thorough security assessment using industry-standard tools and methodologies, then implemented comprehensive security hardening measures.',
                technologies: {
                    'Assessment Tools': ['Nmap', 'Nessus', 'OpenVAS', 'Metasploit'],
                    'Network Security': ['Firewalls', 'IDS/IPS', 'VPN', 'Network Segmentation'],
                    'Compliance': ['NIST Framework', 'ISO 27001', 'CIS Controls'],
                    'Monitoring': ['SIEM', 'Log Analysis', 'Traffic Monitoring']
                },
                metrics: [
                    { label: 'Vulnerabilities Found', value: '25' },
                    { label: 'Vulnerabilities Fixed', value: '25' },
                    { label: 'Security Score Improvement', value: '+40%' },
                    { label: 'Compliance Achievement', value: '100%' }
                ],
                challenges: [
                    {
                        challenge: 'Legacy System Vulnerabilities',
                        solution: 'Developed compensating controls and network segmentation strategies to protect legacy systems that could not be immediately updated.'
                    },
                    {
                        challenge: 'Business Continuity',
                        solution: 'Implemented security improvements in phases to ensure minimal disruption to business operations while maintaining security posture.'
                    },
                    {
                        challenge: 'Compliance Requirements',
                        solution: 'Mapped security controls to compliance frameworks and implemented comprehensive documentation and reporting processes.'
                    }
                ],
                results: [
                    'Identified and remediated 25 critical security vulnerabilities',
                    'Improved overall security posture by 40%',
                    'Achieved 100% compliance with industry standards',
                    'Reduced potential attack surface by 60%',
                    'Implemented continuous monitoring and alerting systems'
                ],
                links: [
                    { text: 'Security Assessment Report', url: '#', type: 'primary' },
                    { text: 'Security Best Practices', url: '#', type: 'secondary' }
                ]
            },
            'system-migration': {
                title: 'Legacy System Migration',
                category: 'infrastructure',
                overview: {
                    description: 'Led comprehensive migration of legacy systems to modern infrastructure, ensuring zero downtime, data integrity, and improved performance.',
                    duration: '8 weeks',
                    team: '6 members',
                    role: 'Migration Lead'
                },
                challenge: 'Legacy systems were becoming unreliable, expensive to maintain, and posed security risks while lacking modern features and scalability.',
                solution: 'Planned and executed phased migration approach with comprehensive testing, data validation, and rollback procedures to ensure successful transition.',
                technologies: {
                    'Migration Tools': ['AWS DMS', 'Azure Migrate', 'VMware vMotion'],
                    'Data Transfer': ['Robocopy', 'rsync', 'AWS DataSync'],
                    'Testing': ['Automated Testing Scripts', 'Load Testing', 'Data Validation'],
                    'Monitoring': ['Real-time Monitoring', 'Performance Metrics', 'Error Tracking']
                },
                metrics: [
                    { label: 'Data Migrated', value: '500GB' },
                    { label: 'Downtime', value: '0 hours' },
                    { label: 'Performance Improvement', value: '+75%' },
                    { label: 'Cost Reduction', value: '45%' }
                ],
                challenges: [
                    {
                        challenge: 'Data Integrity',
                        solution: 'Implemented comprehensive data validation scripts and checksum verification to ensure 100% data integrity during migration.'
                    },
                    {
                        challenge: 'Zero Downtime Requirement',
                        solution: 'Used live migration techniques and database replication to maintain service availability throughout the migration process.'
                    },
                    {
                        challenge: 'Application Compatibility',
                        solution: 'Conducted thorough compatibility testing and developed custom adapters for applications that required legacy system interfaces.'
                    }
                ],
                results: [
                    'Successfully migrated 500GB of critical business data',
                    'Achieved zero downtime during migration process',
                    'Improved system performance by 75%',
                    'Reduced operational costs by 45%',
                    'Enhanced security and compliance posture'
                ],
                links: [
                    { text: 'Migration Plan Document', url: '#', type: 'primary' },
                    { text: 'Migration Best Practices', url: '#', type: 'secondary' }
                ]
            }
        };
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.dataset.filter;
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        const projectCards = document.querySelectorAll('.project-showcase-card');
        
        projectCards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'projectSlideIn 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update URL hash for bookmarking
        if (filter !== 'all') {
            window.location.hash = `filter-${filter}`;
        } else {
            window.location.hash = '';
        }
    }

    setupModal() {
        const modal = document.getElementById('projectModal');
        const closeBtn = modal.querySelector('.close-modal');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        
        // Open modal
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = btn.dataset.project;
                this.openProjectModal(projectId);
            });
        });
        
        // Close modal
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openProjectModal(projectId) {
        const project = this.projects[projectId];
        if (!project) return;
        
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = project.title;
        modalBody.innerHTML = this.generateProjectDetailHTML(project);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Update URL for bookmarking
        window.location.hash = `project-${projectId}`;
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear URL hash
        if (window.location.hash.startsWith('#project-')) {
            window.location.hash = '';
        }
    }

    generateProjectDetailHTML(project) {
        return `
            <div class="project-overview">
                <h4><i class="fas fa-info-circle"></i> Project Overview</h4>
                <p>${project.overview.description}</p>
                <div class="project-metrics">
                    <div class="metric-item">
                        <div class="metric-value">${project.overview.duration}</div>
                        <div class="metric-label">Duration</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${project.overview.team}</div>
                        <div class="metric-label">Team Size</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${project.overview.role}</div>
                        <div class="metric-label">My Role</div>
                    </div>
                </div>
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Challenge</h3>
                <p>${project.challenge}</p>
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-lightbulb"></i> Solution</h3>
                <p>${project.solution}</p>
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-cogs"></i> Technologies Used</h3>
                <div class="tech-stack">
                    ${Object.entries(project.technologies).map(([category, techs]) => `
                        <div class="tech-category">
                            <h5><i class="fas fa-tools"></i> ${category}</h5>
                            <div class="tech-list">
                                ${techs.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-chart-bar"></i> Key Metrics</h3>
                <div class="project-metrics">
                    ${project.metrics.map(metric => `
                        <div class="metric-item">
                            <div class="metric-value">${metric.value}</div>
                            <div class="metric-label">${metric.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-puzzle-piece"></i> Challenges & Solutions</h3>
                ${project.challenges.map(item => `
                    <div class="challenge-solution">
                        <h5><i class="fas fa-exclamation-circle"></i> Challenge: ${item.challenge}</h5>
                        <p><strong>Solution:</strong> ${item.solution}</p>
                    </div>
                `).join('')}
            </div>

            <div class="project-detail-section">
                <h3><i class="fas fa-trophy"></i> Results & Impact</h3>
                <ul>
                    ${project.results.map(result => `<li>${result}</li>`).join('')}
                </ul>
            </div>

            ${project.links && project.links.length > 0 ? `
                <div class="project-detail-section">
                    <h3><i class="fas fa-external-link-alt"></i> Project Links</h3>
                    <div class="project-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link ${link.type}" target="_blank">
                                <i class="fas fa-external-link-alt"></i> ${link.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe project cards
        document.querySelectorAll('.project-showcase-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Handle URL hash on page load
    handleInitialHash() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#filter-')) {
            const filter = hash.replace('#filter-', '');
            const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        } else if (hash.startsWith('#project-')) {
            const projectId = hash.replace('#project-', '');
            if (this.projects[projectId]) {
                this.openProjectModal(projectId);
            }
        }
    }
}

// Project Search Functionality
class ProjectSearch {
    constructor() {
        this.createSearchInterface();
        this.bindEvents();
    }

    createSearchInterface() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'project-search';
        searchContainer.innerHTML = `
            <div class="search-input-container">
                <input type="text" id="projectSearch" placeholder="Search projects by name, technology, or description...">
                <button id="clearSearch" class="clear-search" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-suggestions" id="searchSuggestions" style="display: none;"></div>
        `;

        // Insert after project filters
        const filtersContainer = document.querySelector('.project-filters');
        filtersContainer.parentNode.insertBefore(searchContainer, filtersContainer.nextSibling);
    }

    bindEvents() {
        const searchInput = document.getElementById('projectSearch');
        const clearBtn = document.getElementById('clearSearch');
        const suggestions = document.getElementById('searchSuggestions');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                clearBtn.style.display = 'block';
                this.performSearch(query);
                this.showSuggestions(query);
            } else {
                clearBtn.style.display = 'none';
                this.clearSearch();
                suggestions.style.display = 'none';
            }
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            suggestions.style.display = 'none';
            this.clearSearch();
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.project-search')) {
                suggestions.style.display = 'none';
            }
        });
    }

    performSearch(query) {
        const projectCards = document.querySelectorAll('.project-showcase-card');
        const searchTerms = query.toLowerCase().split(' ');

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const searchableText = [title, description, ...tags].join(' ');
            const matches = searchTerms.every(term => searchableText.includes(term));

            if (matches) {
                card.style.display = 'block';
                this.highlightSearchTerms(card, searchTerms);
            } else {
                card.style.display = 'none';
            }
        });
    }

    highlightSearchTerms(card, terms) {
        // Remove previous highlights
        card.querySelectorAll('.highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });

        // Add new highlights
        terms.forEach(term => {
            if (term.length > 2) { // Only highlight terms longer than 2 characters
                const walker = document.createTreeWalker(
                    card,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );

                const textNodes = [];
                let node;
                while (node = walker.nextNode()) {
                    textNodes.push(node);
                }

                textNodes.forEach(textNode => {
                    const text = textNode.textContent;
                    const regex = new RegExp(`(${term})`, 'gi');
                    if (regex.test(text)) {
                        const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = highlightedText;
                        textNode.parentNode.replaceChild(wrapper.firstChild, textNode);
                    }
                });
            }
        });
    }

    showSuggestions(query) {
        const suggestions = document.getElementById('searchSuggestions');
        const allTags = new Set();
        
        // Collect all tags from projects
        document.querySelectorAll('.tag').forEach(tag => {
            allTags.add(tag.textContent);
        });

        // Filter suggestions based on query
        const matchingSuggestions = Array.from(allTags)
            .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);

        if (matchingSuggestions.length > 0) {
            suggestions.innerHTML = matchingSuggestions
                .map(suggestion => `
                    <div class="suggestion-item" data-suggestion="${suggestion}">
                        <i class="fas fa-tag"></i> ${suggestion}
                    </div>
                `).join('');
            
            suggestions.style.display = 'block';

            // Add click handlers for suggestions
            suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    document.getElementById('projectSearch').value = item.dataset.suggestion;
                    this.performSearch(item.dataset.suggestion);
                    suggestions.style.display = 'none';
                });
            });
        } else {
            suggestions.style.display = 'none';
        }
    }

    clearSearch() {
        // Show all project cards
        document.querySelectorAll('.project-showcase-card').forEach(card => {
            card.style.display = 'block';
        });

        // Remove highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });
    }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const showcase = new ProjectShowcase();
    new ProjectSearch();
    
    // Handle initial URL hash
    showcase.handleInitialHash();
});

// Add CSS for search functionality
const searchStyles = `
<style>
.project-search {
    max-width: 600px;
    margin: 0 auto 30px;
    position: relative;
}

.search-input-container {
    position: relative;
    display: flex;
    align-items: center;
}

#projectSearch {
    width: 100%;
    padding: 15px 50px 15px 20px;
    border: 2px solid #ddd;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

#projectSearch:focus {
    border-color: #007BFF;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.clear-search {
    position: absolute;
    right: 15px;
    background: none;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.clear-search:hover {
    background: #f0f0f0;
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
    margin-top: 5px;
}

.suggestion-item {
    padding: 12px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.3s ease;
}

.suggestion-item:hover {
    background: #f8f9fa;
}

.suggestion-item:first-child {
    border-radius: 8px 8px 0 0;
}

.suggestion-item:last-child {
    border-radius: 0 0 8px 8px;
}

.highlight {
    background: #ffeb3b;
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: 600;
}

/* Dark mode styles */
body.dark-mode #projectSearch {
    background: #3d3d3d;
    border-color: #555;
    color: #e0e0e0;
}

body.dark-mode #projectSearch:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

body.dark-mode .clear-search {
    color: #b0b0b0;
}

body.dark-mode .clear-search:hover {
    background: rgba(255, 255, 255, 0.1);
}

body.dark-mode .search-suggestions {
    background: #3d3d3d;
    border-color: #555;
}

body.dark-mode .suggestion-item {
    color: #e0e0e0;
}

body.dark-mode .suggestion-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

body.dark-mode .highlight {
    background: #ffc107;
    color: #000;
}

@media (max-width: 768px) {
    .project-search {
        margin: 0 20px 30px;
    }
    
    #projectSearch {
        font-size: 14px;
        padding: 12px 40px 12px 15px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', searchStyles);