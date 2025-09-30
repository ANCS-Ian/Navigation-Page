// ANCS Landing Page JavaScript

class ANCSApp {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupJobRoleToggles();
        this.setupQuickLinks();
        this.handleInitialTheme();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        if (themeToggle && themeIcon) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Keyboard accessibility
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }

toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const logoImg = document.getElementById('mainLogo'); // Add this line

    if (this.currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        this.currentTheme = 'dark';
        if (logoImg) logoImg.src = 'ancs-logo-whitetext.png'; // Swap for dark mode
    } else {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        this.currentTheme = 'light';
        if (logoImg) logoImg.src = 'ancs-logo-blacktext.png'; // Swap for light mode
    }

    // Add smooth transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

    handleInitialTheme() {
        // Set initial theme based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const themeIcon = document.querySelector('.theme-icon');
        
        if (prefersDark) {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            this.currentTheme = 'dark';
        } else {
            themeIcon.textContent = '🌙';
            this.currentTheme = 'light';
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches && this.currentTheme === 'light') {
                this.toggleTheme();
            } else if (!e.matches && this.currentTheme === 'dark') {
                this.toggleTheme();
            }
        });
    }

    // Job Role Expandable Sections
    setupJobRoleToggles() {
        const jobRoleHeaders = document.querySelectorAll('.job-role-header');
        
        jobRoleHeaders.forEach(header => {
            header.addEventListener('click', () => {
                this.toggleJobRole(header);
            });

            // Keyboard accessibility
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleJobRole(header);
                }
            });
        });
    }

    toggleJobRole(header) {
        const roleId = header.getAttribute('data-role');
        const content = document.getElementById(roleId);
        const expandIcon = header.querySelector('.expand-icon');
        
        if (content && expandIcon) {
            const isExpanded = header.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse
                header.classList.remove('expanded');
                content.classList.remove('expanded');
                header.setAttribute('aria-expanded', 'false');
                expandIcon.style.transform = 'rotate(0deg)';
            } else {
                // Expand
                header.classList.add('expanded');
                content.classList.add('expanded');
                header.setAttribute('aria-expanded', 'true');
                expandIcon.style.transform = 'rotate(180deg)';
            }
        }
    }

    // Quick Links Functionality
    setupQuickLinks() {
        const quickLinks = document.querySelectorAll('.quick-link-card');
        
        quickLinks.forEach(link => {
            // Add click animation
            link.addEventListener('click', (e) => {
                this.animateClick(link);
            });

            // Add hover effects for better UX
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.02)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });

            // Keyboard accessibility
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.animateClick(link);
                }
            });
        });
    }

    animateClick(element) {
        // Add click animation
        element.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            element.style.transform = 'translateY(-5px) scale(1.02)';
        }, 100);
    }

    // Utility Methods
    addRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Smooth scroll to sections (if needed for future enhancements)
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Accessibility enhancements
    enhanceAccessibility() {
        // Add ARIA labels and roles where needed
        const jobRoleHeaders = document.querySelectorAll('.job-role-header');
        jobRoleHeaders.forEach(header => {
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            const roleId = header.getAttribute('data-role');
            const content = document.getElementById(roleId);
            if (content) {
                content.setAttribute('role', 'region');
                content.setAttribute('aria-labelledby', header.id || `header-${roleId}`);
            }
        });

        // Enhance quick links accessibility
        const quickLinks = document.querySelectorAll('.quick-link-card');
        quickLinks.forEach((link, index) => {
            link.setAttribute('role', 'link');
            link.setAttribute('tabindex', '0');
        });
    }

    // Performance optimization - debounce resize events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize for responsive adjustments
    handleResize() {
        const debouncedResize = this.debounce(() => {
            // Any resize-specific logic can go here
            this.adjustLayoutForMobile();
        }, 250);

        window.addEventListener('resize', debouncedResize);
    }

    adjustLayoutForMobile() {
        const isMobile = window.innerWidth <= 768;
        const quickLinksGrid = document.querySelector('.quick-links-grid');
        
        if (quickLinksGrid) {
            if (isMobile) {
                quickLinksGrid.style.gridTemplateColumns = '1fr';
            } else {
                quickLinksGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ANCSApp();
    
    // Add any additional initialization here
    app.enhanceAccessibility();
    app.handleResize();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 174, 239, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);