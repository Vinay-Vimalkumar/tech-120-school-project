/**
 * CyberGuardian - Email Security Page JavaScript
 * Handles Gmail connection and phishing email detection
 */

// ============================================
// Sample Email Data (Mock Backend)
// ============================================
const sampleEmails = [
    {
        id: 1,
        subject: 'URGENT: Your Account Has Been Compromised!',
        from: 'security-alert@amaz0n-secure.com',
        date: '2024-01-15 09:23',
        isPhishing: true,
        reasons: [
            'Suspicious sender domain (amaz0n-secure.com instead of amazon.com)',
            'Creates false urgency with "URGENT" in subject',
            'Generic greeting instead of your name',
            'Contains suspicious links that don\'t go to official Amazon website'
        ],
        preview: 'Dear Customer, We have detected unusual activity on your account. Click here immediately to verify your identity or your account will be suspended...'
    },
    {
        id: 2,
        subject: 'You\'ve Won $1,000,000! Claim Now!',
        from: 'winner-notification@lottery-intl.net',
        date: '2024-01-14 15:45',
        isPhishing: true,
        reasons: [
            'Too good to be true - you cannot win a lottery you didn\'t enter',
            'Unknown sender from suspicious domain',
            'Asks for personal information to "claim" winnings',
            'Poor grammar and spelling throughout the email'
        ],
        preview: 'Congratulations! You have been selected as the lucky winner of our international lottery. To claim your prize of $1,000,000, please reply with your bank details...'
    },
    {
        id: 3,
        subject: 'Your Netflix subscription payment failed',
        from: 'no-reply@netfl1x-billing.com',
        date: '2024-01-14 11:30',
        isPhishing: true,
        reasons: [
            'Fake domain (netfl1x-billing.com uses number "1" instead of letter "i")',
            'Netflix never asks for payment info via email links',
            'Hovering over links shows they go to a different website',
            'Creates urgency by threatening account suspension'
        ],
        preview: 'We were unable to process your payment for your Netflix subscription. Please update your payment information within 24 hours or your account will be cancelled...'
    },
    {
        id: 4,
        subject: 'Your Order #12345 has shipped!',
        from: 'shipping@amazon.com',
        date: '2024-01-13 16:20',
        isPhishing: false,
        reasons: [],
        preview: 'Great news! Your order containing "Wireless Bluetooth Headphones" has shipped and is on its way. Expected delivery: January 16-18...'
    },
    {
        id: 5,
        subject: 'IRS Tax Refund - Action Required',
        from: 'refund@irs-gov-tax.org',
        date: '2024-01-13 08:15',
        isPhishing: true,
        reasons: [
            'The IRS never contacts people by email about refunds',
            'Fake domain (irs-gov-tax.org is not irs.gov)',
            'Asks for Social Security number and bank details',
            'Government agencies don\'t request sensitive info via email'
        ],
        preview: 'Our records indicate you are eligible for a tax refund of $2,847.00. To receive your refund, please verify your identity by providing your Social Security Number...'
    },
    {
        id: 6,
        subject: 'Meeting reminder: Team sync tomorrow',
        from: 'calendar@google.com',
        date: '2024-01-12 14:00',
        isPhishing: false,
        reasons: [],
        preview: 'Reminder: You have "Weekly Team Sync" tomorrow at 10:00 AM. Click to view event details or join the video call...'
    },
    {
        id: 7,
        subject: 'Reset your password immediately',
        from: 'support@paypa1-secure.com',
        date: '2024-01-12 09:30',
        isPhishing: true,
        reasons: [
            'Suspicious domain uses "1" instead of "l" (paypa1 vs paypal)',
            'You didn\'t request a password reset',
            'Link goes to a fake website designed to steal your login',
            'Creates false urgency'
        ],
        preview: 'Someone tried to access your PayPal account. For your security, we have temporarily limited your account. Click here to reset your password and restore access...'
    }
];

// ============================================
// State
// ============================================
let isConnected = false;
let hasScanned = false;

// ============================================
// DOM Elements
// ============================================
let connectBtn;
let scanBtn;
let emailList;
let scanAnimation;
let connectionStatus;
let resultsSection;

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    connectBtn = document.getElementById('connect-gmail-btn');
    scanBtn = document.getElementById('scan-emails-btn');
    emailList = document.getElementById('email-list');
    scanAnimation = document.getElementById('scan-animation');
    connectionStatus = document.getElementById('connection-status');
    resultsSection = document.getElementById('results-section');
    
    // Initialize event listeners
    if (connectBtn) {
        connectBtn.addEventListener('click', connectGmail);
    }
    
    if (scanBtn) {
        scanBtn.addEventListener('click', scanEmails);
    }
    
    // Initial state
    updateUI();
});

// ============================================
// Connection Functions
// ============================================
function connectGmail() {
    // Simulate OAuth connection process
    if (connectBtn) {
        connectBtn.disabled = true;
        connectBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Connecting...
        `;
    }
    
    // Simulate connection delay
    setTimeout(() => {
        isConnected = true;
        updateUI();
        
        if (typeof showNotification === 'function') {
            showNotification('Gmail connected successfully! You can now scan for phishing emails.', 'success');
        }
    }, 2000);
}

function disconnectGmail() {
    isConnected = false;
    hasScanned = false;
    updateUI();
    
    if (emailList) {
        emailList.innerHTML = '';
    }
    
    if (typeof showNotification === 'function') {
        showNotification('Gmail disconnected.', 'info');
    }
}

// ============================================
// Scan Functions
// ============================================
function scanEmails() {
    if (!isConnected) {
        if (typeof showNotification === 'function') {
            showNotification('Please connect your Gmail first.', 'warning');
        }
        return;
    }
    
    // Show scanning animation
    if (scanAnimation) {
        scanAnimation.classList.add('active');
    }
    if (emailList) {
        emailList.style.display = 'none';
    }
    if (scanBtn) {
        scanBtn.disabled = true;
        scanBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Scanning Emails...
        `;
    }
    
    // Simulate scanning
    setTimeout(() => {
        completeScan();
    }, 3500);
}

function completeScan() {
    hasScanned = true;
    
    // Hide scanning animation
    if (scanAnimation) {
        scanAnimation.classList.remove('active');
    }
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }
    if (emailList) {
        emailList.style.display = 'block';
    }
    
    updateUI();
    displayEmails(sampleEmails);
    updateStats();
    
    const phishingCount = sampleEmails.filter(e => e.isPhishing).length;
    if (typeof showNotification === 'function') {
        if (phishingCount > 0) {
            showNotification(`⚠️ Found ${phishingCount} suspicious emails! Please review them carefully.`, 'warning');
        } else {
            showNotification('✓ No phishing emails detected. Your inbox looks safe!', 'success');
        }
    }
}

// ============================================
// Display Functions
// ============================================
function displayEmails(emails) {
    if (!emailList) return;
    
    emailList.innerHTML = '';
    
    // Sort: phishing emails first
    const sortedEmails = [...emails].sort((a, b) => b.isPhishing - a.isPhishing);
    
    sortedEmails.forEach(email => {
        const emailItem = createEmailItem(email);
        emailList.appendChild(emailItem);
    });
}

function createEmailItem(email) {
    const item = document.createElement('div');
    item.className = `email-item ${email.isPhishing ? 'phishing' : 'safe'}`;
    item.setAttribute('role', 'article');
    item.setAttribute('aria-label', `${email.isPhishing ? 'Suspicious' : 'Safe'} email: ${email.subject}`);
    
    const iconSVG = email.isPhishing 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    
    let reasonsHTML = '';
    if (email.isPhishing && email.reasons.length > 0) {
        reasonsHTML = `
            <div class="email-reason">
                <h4>⚠️ Why this is suspicious:</h4>
                <ul>
                    ${email.reasons.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    item.innerHTML = `
        <div class="email-icon">
            ${iconSVG}
        </div>
        <div class="email-content">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                <h3>${escapeHtml(email.subject)}</h3>
                <span class="badge ${email.isPhishing ? 'badge-critical' : 'badge-safe'}">
                    ${email.isPhishing ? '🚨 Phishing Detected' : '✓ Safe'}
                </span>
            </div>
            <p class="email-from">From: <strong>${escapeHtml(email.from)}</strong> • ${email.date}</p>
            <p style="color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">"${escapeHtml(email.preview.substring(0, 150))}..."</p>
            ${reasonsHTML}
        </div>
    `;
    
    return item;
}

function updateStats() {
    const total = sampleEmails.length;
    const phishing = sampleEmails.filter(e => e.isPhishing).length;
    const safe = sampleEmails.filter(e => !e.isPhishing).length;
    
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length >= 3) {
        statElements[0].textContent = total;
        statElements[1].textContent = phishing;
        statElements[2].textContent = safe;
    }
}

// ============================================
// UI State Management
// ============================================
function updateUI() {
    // Update connection status
    if (connectionStatus) {
        if (isConnected) {
            connectionStatus.className = 'connection-status connected';
            connectionStatus.innerHTML = `
                <div class="status-indicator"></div>
                <span><strong>Gmail Connected</strong> - user@example.com</span>
                <button class="btn btn-outline" onclick="disconnectGmail()" style="margin-left: auto; min-width: auto; padding: 0.5rem 1rem;">
                    Disconnect
                </button>
            `;
        } else {
            connectionStatus.className = 'connection-status disconnected';
            connectionStatus.innerHTML = `
                <div class="status-indicator"></div>
                <span><strong>Not Connected</strong> - Connect your Gmail to scan for phishing emails</span>
            `;
        }
    }
    
    // Update connect button
    if (connectBtn) {
        if (isConnected) {
            connectBtn.style.display = 'none';
        } else {
            connectBtn.style.display = 'inline-flex';
            connectBtn.disabled = false;
            connectBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Connect Gmail Account
            `;
        }
    }
    
    // Update scan button
    if (scanBtn) {
        scanBtn.disabled = !isConnected;
        scanBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Scan for Phishing Emails
        `;
    }
    
    // Show/hide results section
    if (resultsSection) {
        resultsSection.style.display = hasScanned ? 'block' : 'none';
    }
}

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add keyframe animation for spinning
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
