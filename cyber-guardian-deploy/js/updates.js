/**
 * CyberGuardian - Updates Page JavaScript
 * Handles system update checking and display
 */

// ============================================
// Sample Update Data (Mock Backend)
// ============================================
const sampleUpdates = [
    {
        id: 1,
        name: 'Windows Security Update',
        type: 'critical',
        description: 'Critical security patch that fixes vulnerabilities that could allow hackers to access your computer.',
        date: '2024-01-15',
        size: '245 MB',
        icon: 'security'
    },
    {
        id: 2,
        name: 'Google Chrome Browser',
        type: 'critical',
        description: 'Important browser update that protects you from malicious websites and phishing attacks.',
        date: '2024-01-14',
        size: '89 MB',
        icon: 'browser'
    },
    {
        id: 3,
        name: 'Microsoft Office Security',
        type: 'important',
        description: 'Security improvements for Word, Excel, and Outlook to protect your documents.',
        date: '2024-01-13',
        size: '156 MB',
        icon: 'document'
    },
    {
        id: 4,
        name: 'Adobe Acrobat Reader',
        type: 'important',
        description: 'PDF reader update with improved security for opening documents safely.',
        date: '2024-01-12',
        size: '67 MB',
        icon: 'pdf'
    },
    {
        id: 5,
        name: 'Zoom Video',
        type: 'optional',
        description: 'New features and minor improvements for video calls.',
        date: '2024-01-11',
        size: '45 MB',
        icon: 'video'
    },
    {
        id: 6,
        name: 'Spotify Music',
        type: 'optional',
        description: 'Performance improvements and bug fixes for the music app.',
        date: '2024-01-10',
        size: '32 MB',
        icon: 'music'
    }
];

// ============================================
// DOM Elements
// ============================================
let updatesList;
let scanBtn;
let scanAnimation;
let connectionStatus;
let statsCards;

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    updatesList = document.getElementById('updates-list');
    scanBtn = document.getElementById('scan-btn');
    scanAnimation = document.getElementById('scan-animation');
    connectionStatus = document.getElementById('connection-status');
    statsCards = document.querySelectorAll('.stat-number');
    
    // Initialize event listeners
    if (scanBtn) {
        scanBtn.addEventListener('click', startScan);
    }
    
    // Show initial state
    showConnectionStatus(true);
    displayUpdates(sampleUpdates);
    updateStats(sampleUpdates);
});

// ============================================
// Scan Functions
// ============================================
function startScan() {
    // Show scanning animation
    if (scanAnimation) {
        scanAnimation.classList.add('active');
    }
    if (updatesList) {
        updatesList.style.display = 'none';
    }
    if (scanBtn) {
        scanBtn.disabled = true;
        scanBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Scanning...
        `;
    }
    
    // Simulate scan (in real app, this would check for actual updates)
    setTimeout(() => {
        completeScan();
    }, 3000);
}

function completeScan() {
    // Hide scanning animation
    if (scanAnimation) {
        scanAnimation.classList.remove('active');
    }
    if (updatesList) {
        updatesList.style.display = 'block';
    }
    if (scanBtn) {
        scanBtn.disabled = false;
        scanBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
            Scan for Updates
        `;
    }
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('Scan complete! Found ' + sampleUpdates.length + ' updates.', 'success');
    }
    
    // Refresh the display
    displayUpdates(sampleUpdates);
    updateStats(sampleUpdates);
}

// ============================================
// Display Functions
// ============================================
function displayUpdates(updates) {
    if (!updatesList) return;
    
    updatesList.innerHTML = '';
    
    // Sort by priority: critical first, then important, then optional
    const sortOrder = { critical: 0, important: 1, optional: 2 };
    const sortedUpdates = [...updates].sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);
    
    sortedUpdates.forEach(update => {
        const updateItem = createUpdateItem(update);
        updatesList.appendChild(updateItem);
    });
}

function createUpdateItem(update) {
    const item = document.createElement('div');
    item.className = `update-item ${update.type}`;
    item.setAttribute('role', 'article');
    item.setAttribute('aria-label', `${update.type} update: ${update.name}`);
    
    const iconSVG = getUpdateIcon(update.icon);
    const badgeText = getBadgeText(update.type);
    const badgeClass = getBadgeClass(update.type);
    
    item.innerHTML = `
        <div class="update-icon">
            ${iconSVG}
        </div>
        <div class="update-info">
            <h3>${update.name}</h3>
            <p>${update.description}</p>
            <div style="display: flex; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
                <span class="badge ${badgeClass}">${badgeText}</span>
                <span style="color: var(--text-secondary);">Size: ${update.size}</span>
            </div>
        </div>
        <div class="update-action">
            <button class="btn btn-primary" onclick="installUpdate(${update.id})" aria-label="Install ${update.name}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Install
            </button>
        </div>
    `;
    
    return item;
}

function getUpdateIcon(type) {
    const icons = {
        security: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        browser: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        document: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
        pdf: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        video: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
        music: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
    };
    return icons[type] || icons.security;
}

function getBadgeText(type) {
    const texts = {
        critical: '⚠️ Critical - Install Now',
        important: '📌 Important',
        optional: '✓ Optional'
    };
    return texts[type] || type;
}

function getBadgeClass(type) {
    const classes = {
        critical: 'badge-critical',
        important: 'badge-important',
        optional: 'badge-optional'
    };
    return classes[type] || 'badge-optional';
}

// ============================================
// Stats Functions
// ============================================
function updateStats(updates) {
    const critical = updates.filter(u => u.type === 'critical').length;
    const important = updates.filter(u => u.type === 'important').length;
    const optional = updates.filter(u => u.type === 'optional').length;
    
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length >= 4) {
        statElements[0].textContent = updates.length;
        statElements[1].textContent = critical;
        statElements[2].textContent = important;
        statElements[3].textContent = optional;
    }
}

// ============================================
// Connection Status
// ============================================
function showConnectionStatus(connected) {
    if (!connectionStatus) return;
    
    if (connected) {
        connectionStatus.className = 'connection-status connected';
        connectionStatus.innerHTML = `
            <div class="status-indicator"></div>
            <span><strong>Connected</strong> - Your device is connected and ready for scanning</span>
        `;
    } else {
        connectionStatus.className = 'connection-status disconnected';
        connectionStatus.innerHTML = `
            <div class="status-indicator"></div>
            <span><strong>Not Connected</strong> - Please connect your device to scan for updates</span>
        `;
    }
}

// ============================================
// Install Function
// ============================================
function installUpdate(updateId) {
    const update = sampleUpdates.find(u => u.id === updateId);
    if (!update) return;
    
    // Show installing notification
    if (typeof showNotification === 'function') {
        showNotification(`Installing ${update.name}... This may take a few minutes.`, 'info');
    }
    
    // Find the button and disable it
    const buttons = document.querySelectorAll('.update-item button');
    buttons.forEach(btn => {
        if (btn.getAttribute('aria-label') === `Install ${update.name}`) {
            btn.disabled = true;
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Installing...
            `;
        }
    });
    
    // Simulate installation
    setTimeout(() => {
        // Remove the update from the list
        const index = sampleUpdates.findIndex(u => u.id === updateId);
        if (index > -1) {
            sampleUpdates.splice(index, 1);
        }
        
        // Refresh display
        displayUpdates(sampleUpdates);
        updateStats(sampleUpdates);
        
        if (typeof showNotification === 'function') {
            showNotification(`${update.name} installed successfully!`, 'success');
        }
    }, 2000);
}

// Add keyframe animation for spinning
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
