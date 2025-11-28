/**
 * CyberGuardian - Quiz Page JavaScript
 * Educational quiz about cybersecurity awareness
 */

// ============================================
// Quiz Questions
// ============================================
const quizQuestions = [
    {
        id: 1,
        question: "In 2017, the WannaCry ransomware attack affected over 200,000 computers in 150 countries. What could have prevented most of these infections?",
        options: [
            "Using stronger passwords",
            "Installing a security update that Microsoft released months earlier",
            "Using a different web browser",
            "Turning off the computer at night"
        ],
        correctAnswer: 1,
        explanation: "Microsoft had released a security patch for the vulnerability 2 months before the attack. Organizations that kept their systems updated were protected. This attack caused billions of dollars in damages and disrupted hospitals, banks, and government services worldwide."
    },
    {
        id: 2,
        question: "Which of these is a common sign that an email might be a phishing attempt?",
        options: [
            "The email comes from a company you do business with",
            "The email has a professional-looking logo",
            "The email creates urgency and threatens account suspension",
            "The email is about a recent purchase you made"
        ],
        correctAnswer: 2,
        explanation: "Phishing emails often create a false sense of urgency to pressure you into clicking links or providing information without thinking carefully. Legitimate companies rarely threaten immediate account suspension via email."
    },
    {
        id: 3,
        question: "The 2013 Target data breach exposed 40 million credit card numbers. How did hackers initially gain access?",
        options: [
            "Through a phishing email sent to a third-party vendor",
            "By physically breaking into a store",
            "Through the Target website",
            "By bribing an employee"
        ],
        correctAnswer: 0,
        explanation: "Hackers sent a phishing email to an HVAC contractor that worked with Target. After stealing the contractor's credentials, they accessed Target's network. This shows why everyone in a company's network needs cybersecurity training."
    },
    {
        id: 4,
        question: "What should you do if you receive an email from your bank asking you to click a link and verify your account details?",
        options: [
            "Click the link and enter your information",
            "Reply to the email asking if it's legitimate",
            "Call your bank using the phone number on your card or statement",
            "Forward the email to friends to warn them"
        ],
        correctAnswer: 2,
        explanation: "Never click links in emails claiming to be from your bank. Instead, contact your bank directly using the phone number on your card, statement, or their official website (typed directly into your browser). Banks never ask for sensitive information via email links."
    },
    {
        id: 5,
        question: "The Equifax data breach in 2017 exposed personal information of 147 million people. What was the main cause?",
        options: [
            "Employees shared passwords",
            "A known vulnerability in their software that wasn't patched for months",
            "Customers used weak passwords",
            "Hackers guessed the admin password"
        ],
        correctAnswer: 1,
        explanation: "Equifax failed to install a critical security update for a known vulnerability. The patch had been available for over 2 months before the breach. Keeping software updated is one of the most important security practices."
    },
    {
        id: 6,
        question: "Which of these makes a strong password?",
        options: [
            "Your birthday followed by your name",
            "The word 'password' with numbers at the end",
            "A random mix of 12+ letters, numbers, and symbols",
            "Your pet's name repeated twice"
        ],
        correctAnswer: 2,
        explanation: "Strong passwords are long (12+ characters), random, and include a mix of uppercase, lowercase, numbers, and symbols. Avoid using personal information or common words that hackers can easily guess."
    },
    {
        id: 7,
        question: "You receive a phone call from someone claiming to be from Microsoft, saying your computer has a virus. What should you do?",
        options: [
            "Let them remotely access your computer to fix it",
            "Give them your credit card to pay for the fix",
            "Hang up - this is a common scam",
            "Follow their instructions carefully"
        ],
        correctAnswer: 2,
        explanation: "Microsoft and other tech companies never make unsolicited calls about computer problems. This is a common scam where criminals try to gain access to your computer or steal your money. Always hang up on these calls."
    },
    {
        id: 8,
        question: "In 2021, a major US fuel pipeline was shut down by ransomware, causing gas shortages across the East Coast. How did hackers get in?",
        options: [
            "Through a compromised password on an old, unused account",
            "By hacking the pipeline's control systems directly",
            "Through the company's website",
            "By sending malware through the mail"
        ],
        correctAnswer: 0,
        explanation: "The Colonial Pipeline hack happened through a single compromised password on a VPN account that was no longer in use but still active. This shows why it's important to disable unused accounts and use unique passwords."
    },
    {
        id: 9,
        question: "What is 'two-factor authentication' (2FA)?",
        options: [
            "Using two different passwords",
            "Having two people approve a login",
            "A second verification step, like a code sent to your phone",
            "Logging in twice to confirm"
        ],
        correctAnswer: 2,
        explanation: "Two-factor authentication adds a second layer of security beyond your password. Even if someone steals your password, they can't access your account without the second factor (usually a code sent to your phone). Enable 2FA on all important accounts!"
    },
    {
        id: 10,
        question: "Which of these is the safest practice for software updates?",
        options: [
            "Wait several months to see if updates cause problems",
            "Only update when your device stops working",
            "Enable automatic updates and install them promptly",
            "Never update - it might change how things work"
        ],
        correctAnswer: 2,
        explanation: "Security updates often fix critical vulnerabilities that hackers actively exploit. Installing updates promptly closes these security holes. The small inconvenience of updating is worth it to protect your data and privacy."
    }
];

// ============================================
// State
// ============================================
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

// ============================================
// DOM Elements
// ============================================
let quizContainer;
let progressBar;
let progressText;
let questionContainer;
let scoreContainer;

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    quizContainer = document.getElementById('quiz-container');
    progressBar = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    questionContainer = document.getElementById('question-container');
    scoreContainer = document.getElementById('score-container');
    
    // Start the quiz
    showQuestion();
});

// ============================================
// Quiz Functions
// ============================================
function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    selectedAnswer = null;
    answered = false;
    
    // Update progress
    if (progressBar) {
        const progress = ((currentQuestion) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    }
    
    // Build question HTML
    if (questionContainer) {
        questionContainer.innerHTML = `
            <div class="quiz-question" role="region" aria-label="Question ${currentQuestion + 1}">
                <h2>${question.question}</h2>
                <div class="quiz-options" role="radiogroup" aria-label="Answer options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" 
                             onclick="selectAnswer(${index})" 
                             role="radio" 
                             aria-checked="false"
                             tabindex="0"
                             onkeypress="if(event.key === 'Enter' || event.key === ' ') selectAnswer(${index})">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span>${option}</span>
                        </div>
                    `).join('')}
                </div>
                <div id="feedback" class="quiz-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-primary btn-lg" onclick="submitAnswer()" id="submit-btn" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Check Answer
                    </button>
                </div>
            </div>
        `;
    }
    
    if (scoreContainer) {
        scoreContainer.style.display = 'none';
    }
}

function selectAnswer(index) {
    if (answered) return;
    
    selectedAnswer = index;
    
    // Update visual selection
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        opt.setAttribute('aria-checked', 'false');
        if (i === index) {
            opt.classList.add('selected');
            opt.setAttribute('aria-checked', 'true');
        }
    });
    
    // Enable submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
    }
}

function submitAnswer() {
    if (selectedAnswer === null || answered) return;
    
    answered = true;
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
    }
    
    // Show correct/incorrect on options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === question.correctAnswer) {
            opt.classList.add('correct');
        } else if (i === selectedAnswer && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Show feedback
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = `
            <h3>${isCorrect ? '✓ Correct!' : '✗ Not quite right'}</h3>
            <p>${question.explanation}</p>
        `;
    }
    
    // Update button to continue
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        if (currentQuestion < quizQuestions.length - 1) {
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                Next Question
            `;
            submitBtn.onclick = nextQuestion;
        } else {
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                See Results
            `;
            submitBtn.onclick = showResults;
        }
        submitBtn.disabled = false;
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excellent! You\'re a cybersecurity expert!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Great job! You have solid cybersecurity knowledge.';
        emoji = '🌟';
    } else if (percentage >= 50) {
        message = 'Good effort! Keep learning to improve your security awareness.';
        emoji = '👍';
    } else {
        message = 'There\'s room to grow! Review the lessons and try again.';
        emoji = '📚';
    }
    
    // Update progress bar to 100%
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    if (progressText) {
        progressText.textContent = 'Quiz Complete!';
    }
    
    // Show results
    if (questionContainer) {
        questionContainer.innerHTML = '';
    }
    
    if (scoreContainer) {
        scoreContainer.style.display = 'block';
        scoreContainer.innerHTML = `
            <div class="quiz-score">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
                <h2>Quiz Complete!</h2>
                <div class="score-number">${score}/${quizQuestions.length}</div>
                <p style="font-size: 1.5rem; color: var(--primary-color); font-weight: 700; margin-bottom: 0.5rem;">${percentage}%</p>
                <p>${message}</p>
                <div class="quiz-actions" style="margin-top: 2rem;">
                    <button class="btn btn-primary btn-lg" onclick="restartQuiz()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                        Try Again
                    </button>
                    <a href="index.html" class="btn btn-secondary btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Back to Home
                    </a>
                </div>
            </div>
            
            <div class="card mt-4">
                <div class="card-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <h2>Key Takeaways</h2>
                </div>
                <div class="card-body">
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 1rem 0; border-bottom: 1px solid var(--border-color); display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-size: 1.5rem;">🔄</span>
                            <div>
                                <strong>Keep Software Updated</strong><br>
                                <span style="color: var(--text-secondary);">Many major breaches could have been prevented with timely updates. Enable automatic updates when possible.</span>
                            </div>
                        </li>
                        <li style="padding: 1rem 0; border-bottom: 1px solid var(--border-color); display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-size: 1.5rem;">📧</span>
                            <div>
                                <strong>Be Suspicious of Urgent Emails</strong><br>
                                <span style="color: var(--text-secondary);">Phishing emails create false urgency. Always verify by contacting companies directly through official channels.</span>
                            </div>
                        </li>
                        <li style="padding: 1rem 0; border-bottom: 1px solid var(--border-color); display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-size: 1.5rem;">🔐</span>
                            <div>
                                <strong>Use Strong, Unique Passwords</strong><br>
                                <span style="color: var(--text-secondary);">Long, random passwords and two-factor authentication protect your accounts even if one password is compromised.</span>
                            </div>
                        </li>
                        <li style="padding: 1rem 0; display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-size: 1.5rem;">📞</span>
                            <div>
                                <strong>Don't Trust Unsolicited Contact</strong><br>
                                <span style="color: var(--text-secondary);">Legitimate companies don't call or email asking for passwords, payments, or remote access to your computer.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answered = false;
    showQuestion();
}
