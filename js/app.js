// Architecture Decision Helper - Main Application
console.log('Architecture Decision Helper loaded');

// Application State
let currentScreen = 'main-screen';
let currentQuestion = 0;
let responses = [];

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        console.log(`Switched to screen: ${screenId}`);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Show the main screen
    showScreen('main-screen');
    
    console.log('Application initialized successfully');
});

// Event Listeners Setup
function setupEventListeners() {
    // Start Assessment button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('Starting assessment...');
            // This will be implemented in the next prompt
            alert('Assessment functionality will be implemented in the next step!');
        });
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous question');
            // This will be implemented in the next prompt
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Next question');
            // This will be implemented in the next prompt
        });
    }
    
    // Results screen buttons
    const editBtn = document.getElementById('edit-responses-btn');
    const exportBtn = document.getElementById('export-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            console.log('Edit responses');
            // This will be implemented in later prompts
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('Export to Markdown');
            // This will be implemented in later prompts
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            console.log('Restart assessment');
            showScreen('main-screen');
            currentQuestion = 0;
            responses = [];
        });
    }
}

// Utility Functions
function updateProgress(questionIndex, totalQuestions) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        const percentage = ((questionIndex + 1) / totalQuestions) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `Question ${questionIndex + 1} of ${totalQuestions}`;
    }
}

// Placeholder functions for future implementation
function loadQuestion(questionIndex) {
    // This will be implemented in the next prompt
    console.log(`Loading question ${questionIndex}`);
}

function calculateScore(responses) {
    // This will be implemented in later prompts
    console.log('Calculating score from responses:', responses);
}

function displayResults(score, breakdown) {
    // This will be implemented in later prompts
    console.log('Displaying results:', score, breakdown);
}

// Export functionality placeholder
function exportToMarkdown(results) {
    // This will be implemented in later prompts
    console.log('Exporting to Markdown:', results);
}

console.log('Application code loaded successfully');

// Additional functionality will be added in subsequent prompts
