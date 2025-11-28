/**
 * CyberGuardian - Main JavaScript
 * Handles navigation, theme management, and shared functionality
 */

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadSettings();
    highlightCurrentPage();
});

// ============================================
// Navigation
// ============================================
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (mobileMenuBtn && navbarNav) {
        mobileMenuBtn.addEventListener('click', () => {
            navbarNav.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navbarNav.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navbarNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navbarNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Settings Management
// ============================================
function loadSettings() {
    const settings = getSettings();
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    applyPrimaryColor(settings.primaryColor);
}

function getSettings() {
    const defaultSettings = {
        theme: 'light',
        fontSize: 'medium',
        primaryColor: 'green',
        updateFrequency: 'daily',
        notifications: true,
        autoScan: false,
        language: 'en'
    };
    
    try {
        const saved = localStorage.getItem('cyberGuardianSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (e) {
        return defaultSettings;
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem('cyberGuardianSettings', JSON.stringify(settings));
    } catch (e) {
        console.warn('Could not save settings to localStorage');
    }
}

function updateSetting(key, value) {
    const settings = getSettings();
    settings[key] = value;
    saveSettings(settings);
    
    // Apply changes immediately
    switch (key) {
        case 'theme':
            applyTheme(value);
            break;
        case 'fontSize':
            applyFontSize(value);
            break;
        case 'primaryColor':
            applyPrimaryColor(value);
            break;
    }
}

// ============================================
// Theme Application
// ============================================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
}

function applyPrimaryColor(color) {
    const colors = {
        green: { primary: '#2E7D32', light: '#4CAF50', dark: '#1B5E20' },
        blue: { primary: '#1565C0', light: '#42A5F5', dark: '#0D47A1' },
        purple: { primary: '#6A1B9A', light: '#AB47BC', dark: '#4A148C' },
        orange: { primary: '#E65100', light: '#FF9800', dark: '#BF360C' },
        red: { primary: '#C62828', light: '#EF5350', dark: '#8E0000' },
        teal: { primary: '#00695C', light: '#26A69A', dark: '#004D40' }
    };
    
    const selectedColor = colors[color] || colors.green;
    
    document.documentElement.style.setProperty('--primary-color', selectedColor.primary);
    document.documentElement.style.setProperty('--primary-light', selectedColor.light);
    document.documentElement.style.setProperty('--primary-dark', selectedColor.dark);
}

// ============================================
// Utility Functions
// ============================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 1rem;
                font-weight: 600;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            .notification-info {
                background-color: #E3F2FD;
                color: #1565C0;
                border: 2px solid #1565C0;
            }
            .notification-success {
                background-color: #E8F5E9;
                color: #2E7D32;
                border: 2px solid #2E7D32;
            }
            .notification-warning {
                background-color: #FFF3E0;
                color: #E65100;
                border: 2px solid #E65100;
            }
            .notification-error {
                background-color: #FFEBEE;
                color: #C62828;
                border: 2px solid #C62828;
            }
            .notification button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                padding: 0;
                line-height: 1;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// Accessibility Helpers
// ============================================
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// ============================================
// Export for modules
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getSettings,
        saveSettings,
        updateSetting,
        showNotification,
        formatDate,
        formatTime,
        announceToScreenReader
    };
}
