/**
 * CyberGuardian - Settings Page JavaScript
 * Handles customization and preferences
 */

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    setupEventListeners();
});

// ============================================
// Initialize Settings
// ============================================
function initializeSettings() {
    const settings = getSettings();
    
    // Set theme select
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = settings.theme;
    }
    
    // Set font size select
    const fontSizeSelect = document.getElementById('font-size-select');
    if (fontSizeSelect) {
        fontSizeSelect.value = settings.fontSize;
    }
    
    // Set language select
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = settings.language;
    }
    
    // Set color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.color === settings.primaryColor) {
            option.classList.add('selected');
        }
    });
    
    // Set update frequency
    const updateFrequencySelect = document.getElementById('update-frequency');
    if (updateFrequencySelect) {
        updateFrequencySelect.value = settings.updateFrequency;
    }
    
    // Set toggles
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.checked = settings.notifications;
    }
    
    const autoScanToggle = document.getElementById('auto-scan-toggle');
    if (autoScanToggle) {
        autoScanToggle.checked = settings.autoScan;
    }
    
    const soundsToggle = document.getElementById('sounds-toggle');
    if (soundsToggle) {
        soundsToggle.checked = settings.sounds !== false;
    }
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Theme select
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            updateSetting('theme', e.target.value);
            showSaveConfirmation('Theme updated');
        });
    }
    
    // Font size select
    const fontSizeSelect = document.getElementById('font-size-select');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            updateSetting('fontSize', e.target.value);
            showSaveConfirmation('Font size updated');
        });
    }
    
    // Language select
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            updateSetting('language', e.target.value);
            showSaveConfirmation('Language preference saved');
        });
    }
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            updateSetting('primaryColor', option.dataset.color);
            showSaveConfirmation('Color theme updated');
        });
        
        // Keyboard support
        option.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });
    
    // Update frequency
    const updateFrequencySelect = document.getElementById('update-frequency');
    if (updateFrequencySelect) {
        updateFrequencySelect.addEventListener('change', (e) => {
            updateSetting('updateFrequency', e.target.value);
            showSaveConfirmation('Update frequency saved');
        });
    }
    
    // Notifications toggle
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', (e) => {
            updateSetting('notifications', e.target.checked);
            showSaveConfirmation(e.target.checked ? 'Notifications enabled' : 'Notifications disabled');
        });
    }
    
    // Auto scan toggle
    const autoScanToggle = document.getElementById('auto-scan-toggle');
    if (autoScanToggle) {
        autoScanToggle.addEventListener('change', (e) => {
            updateSetting('autoScan', e.target.checked);
            showSaveConfirmation(e.target.checked ? 'Auto-scan enabled' : 'Auto-scan disabled');
        });
    }
    
    // Sounds toggle
    const soundsToggle = document.getElementById('sounds-toggle');
    if (soundsToggle) {
        soundsToggle.addEventListener('change', (e) => {
            updateSetting('sounds', e.target.checked);
            showSaveConfirmation(e.target.checked ? 'Sound effects enabled' : 'Sound effects disabled');
        });
    }
    
    // Reset button
    const resetBtn = document.getElementById('reset-settings-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSettings);
    }
    
    // Export button
    const exportBtn = document.getElementById('export-settings-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportSettings);
    }
}

// ============================================
// Settings Functions
// ============================================
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
        localStorage.removeItem('cyberGuardianSettings');
        
        // Reload settings
        loadSettings();
        initializeSettings();
        
        if (typeof showNotification === 'function') {
            showNotification('All settings have been reset to default.', 'success');
        }
    }
}

function exportSettings() {
    const settings = getSettings();
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'cyberguardian-settings.json';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    
    if (typeof showNotification === 'function') {
        showNotification('Settings exported successfully!', 'success');
    }
}

function showSaveConfirmation(message) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'success');
    }
}

// ============================================
// Preview Functions
// ============================================
function previewTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function previewFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
}
