// Architecture Decision Helper - Main Application
console.log('Architecture Decision Helper loaded');

// Application State
let currentScreen = 'main-screen';
let currentQuestion = 0;
let responses = [];

// Question Data
const questions = [
    {
        id: 'structural',
        title: 'Structural vs. Code',
        question: 'Does this decision affect the structure of the system (e.g. components, deployment units, communication patterns), or is it limited to how source code is written or organized?',
        options: [
            {
                value: 'A',
                score: 1,
                label: 'Significant structural changes',
                description: 'Major architectural changes like new architectural style, major component reorganization'
            },
            {
                value: 'B',
                score: 2,
                label: 'Some structural changes',
                description: 'New deployment units, added communication paths'
            },
            {
                value: 'C',
                score: 3,
                label: 'Mostly code movement',
                description: 'Code reorganization or refactoring'
            },
            {
                value: 'D',
                score: 4,
                label: 'Simple refactoring',
                description: 'New functions or simple code changes'
            }
        ]
    },
    {
        id: 'strategic',
        title: 'Strategic vs. Tactical',
        question: 'How many people need to be involved in making this decision, and how long will it take to reach consensus?',
        options: [
            {
                value: 'A',
                score: 1,
                label: 'Many people, weeks/months',
                description: 'Many stakeholders involved, decision takes weeks or months'
            },
            {
                value: 'B',
                score: 2,
                label: '3+ people, couple weeks',
                description: '3 or more people involved, takes at least a couple of weeks'
            },
            {
                value: 'C',
                score: 3,
                label: 'Few people, within two weeks',
                description: 'Few people involved, decision within two weeks'
            },
            {
                value: 'D',
                score: 4,
                label: '1-2 people, few days',
                description: '1-2 people can decide in a few days'
            }
        ]
    },
    {
        id: 'effort',
        title: 'Implementation Effort',
        question: 'What is the estimated level of effort required to implement this decision?',
        options: [
            {
                value: 'A',
                score: 1,
                label: 'High effort',
                description: 'Breaking up monolith, separating data stores, major system changes'
            },
            {
                value: 'B',
                score: 2,
                label: 'Significant effort',
                description: 'Creating new deployment units, substantial development work'
            },
            {
                value: 'C',
                score: 3,
                label: 'Moderate effort',
                description: 'Moving lots of source code, medium-sized changes'
            },
            {
                value: 'D',
                score: 4,
                label: 'Simple changes',
                description: 'Minor modifications, quick implementation'
            }
        ]
    },
    {
        id: 'tradeoffs',
        title: 'Architectural Trade-offs',
        question: 'Does this decision involve significant trade-offs that could impact scalability, performance, cost, or maintainability?',
        options: [
            {
                value: 'A',
                score: 1,
                label: 'Major trade-offs',
                description: 'Significant impact on performance, data integrity, distributed transactions, but gains in agility/extensibility'
            },
            {
                value: 'B',
                score: 2,
                label: 'Notable trade-offs',
                description: 'Some of the above trade-offs, but less severe'
            },
            {
                value: 'C',
                score: 3,
                label: 'Minor trade-offs',
                description: 'Small but noticeable trade-offs'
            },
            {
                value: 'D',
                score: 4,
                label: 'No significant trade-offs',
                description: 'No major architectural implications'
            }
        ]
    }
];

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
            startAssessment();
        });
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous question');
            previousQuestion();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Next question');
            nextQuestion();
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

// Assessment Functions
function startAssessment() {
    currentQuestion = 0;
    responses = [];
    showScreen('question-screen');
    loadQuestion(0);
}

function loadQuestion(questionIndex) {
    if (questionIndex < 0 || questionIndex >= questions.length) {
        console.error('Invalid question index:', questionIndex);
        return;
    }
    
    const question = questions[questionIndex];
    
    // Update question content
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress
    updateProgress(questionIndex, questions.length);
    
    // Generate answer options
    const answerContainer = document.getElementById('answer-options');
    answerContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = createAnswerOption(question.id, option, index);
        answerContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Restore previous selection if exists
    const previousResponse = responses[questionIndex];
    if (previousResponse) {
        const radioInput = document.querySelector(`input[name="${question.id}"][value="${previousResponse.value}"]`);
        if (radioInput) {
            radioInput.checked = true;
            radioInput.closest('.answer-option').classList.add('selected');
        }
    }
    
    console.log(`Loaded question ${questionIndex + 1}: ${question.title}`);
}

function createAnswerOption(questionId, option, index) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'answer-option';
    
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = `${questionId}_${index}`;
    radioInput.name = questionId;
    radioInput.value = option.value;
    
    const answerContent = document.createElement('div');
    answerContent.className = 'answer-content';
    
    const answerLabel = document.createElement('div');
    answerLabel.className = 'answer-label';
    answerLabel.textContent = `${option.value}. ${option.label}`;
    
    const answerDescription = document.createElement('div');
    answerDescription.className = 'answer-description';
    answerDescription.textContent = option.description;
    
    answerContent.appendChild(answerLabel);
    answerContent.appendChild(answerDescription);
    
    optionDiv.appendChild(radioInput);
    optionDiv.appendChild(answerContent);
    
    // Add click handlers
    optionDiv.addEventListener('click', function() {
        handleResponse(questionId, option);
    });
    
    radioInput.addEventListener('change', function() {
        if (this.checked) {
            handleResponse(questionId, option);
        }
    });
    
    return optionDiv;
}

function handleResponse(questionId, selectedOption) {
    console.log(`Response for ${questionId}:`, selectedOption);
    
    // Clear previous selections
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark current selection
    const selectedRadio = document.querySelector(`input[name="${questionId}"][value="${selectedOption.value}"]`);
    if (selectedRadio) {
        selectedRadio.checked = true;
        selectedRadio.closest('.answer-option').classList.add('selected');
    }
    
    // Store response
    responses[currentQuestion] = {
        questionId: questionId,
        questionTitle: questions[currentQuestion].title,
        value: selectedOption.value,
        score: selectedOption.score,
        label: selectedOption.label,
        description: selectedOption.description
    };
    
    // Enable next button
    updateNavigationButtons();
    
    console.log('Current responses:', responses);
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

function nextQuestion() {
    // Check if current question is answered
    if (!responses[currentQuestion]) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    } else {
        // All questions answered, show results
        completeAssessment();
    }
}

function completeAssessment() {
    console.log('Assessment completed with responses:', responses);
    
    // Show loading screen briefly
    showScreen('loading-screen');
    
    // Calculate score after a short delay for UX
    setTimeout(() => {
        const results = calculateScore(responses);
        displayResults(results.finalScore, results.breakdown);
        showScreen('results-screen');
    }, 1500);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Previous button
    if (prevBtn) {
        prevBtn.disabled = (currentQuestion === 0);
    }
    
    // Next button
    if (nextBtn) {
        const hasResponse = responses[currentQuestion] !== undefined;
        nextBtn.disabled = !hasResponse;
        
        // Update button text for last question
        if (currentQuestion === questions.length - 1) {
            nextBtn.textContent = 'Complete Assessment';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
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
