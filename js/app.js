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
            currentQuestion = 0;
            showScreen('question-screen');
            loadQuestion(currentQuestion);
        });
    }
    
if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('Export to Markdown');
            const results = calculateScore(responses);
            exportToMarkdown(results);
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
    console.log('Calculating score from responses:', responses);
    
    if (!responses || responses.length !== 4) {
        console.error('Invalid responses for scoring:', responses);
        return null;
    }
    
    // Calculate total score (sum of all response scores)
    const totalScore = responses.reduce((sum, response) => sum + response.score, 0);
    
    // Calculate average score
    const averageScore = totalScore / responses.length;
    
    // Round to nearest whole number
    const roundedScore = Math.round(averageScore);
    
    // Map back to A-D
    const scoreMap = {
        1: 'A',
        2: 'B', 
        3: 'C',
        4: 'D'
    };
    
    const finalScore = scoreMap[roundedScore] || 'C';
    
    // Create detailed breakdown
    const breakdown = responses.map(response => ({
        category: response.questionTitle,
        score: response.value,
        numericScore: response.score,
        label: response.label,
        description: response.description
    }));
    
    const results = {
        finalScore: finalScore,
        numericScore: roundedScore,
        averageScore: averageScore,
        totalScore: totalScore,
        breakdown: breakdown,
        interpretation: getScoreInterpretation(finalScore)
    };
    
    console.log('Calculated results:', results);
    return results;
}

function getScoreInterpretation(score) {
    const interpretations = {
        'A': 'Strong architectural decision - This should be made at the architectural level with careful consideration of system-wide impacts.',
        'B': 'Likely architectural decision - This probably belongs at the architectural level, but may have some flexibility.',
        'C': 'Likely development team decision - This can probably be deferred to the development team with some architectural guidance.',
        'D': 'Strong development team decision - This should be deferred to the development team with minimal architectural oversight.'
    };
    
    return interpretations[score] || 'Unable to determine recommendation.';
}

function displayResults(finalScore, breakdown) {
    console.log('Displaying results:', finalScore, breakdown);
    
    // Update final score display
    const finalScoreElement = document.getElementById('final-score');
    const scoreMeaningElement = document.getElementById('score-meaning');
    
    if (finalScoreElement) {
        finalScoreElement.textContent = finalScore;
    }
    
    if (scoreMeaningElement) {
        scoreMeaningElement.textContent = getScoreInterpretation(finalScore);
    }
    
    // Update scale indicator position
    updateScaleIndicator(finalScore);
    
    // Display category breakdown
    displayScoreBreakdown(breakdown);
}

function updateScaleIndicator(finalScore) {
    const indicator = document.getElementById('scale-indicator');
    if (!indicator) return;
    
    // Calculate position based on score (A=0%, B=33%, C=66%, D=100%)
    const positions = {
        'A': 12.5,   // Slightly offset from left edge
        'B': 37.5,   // Between A and center
        'C': 62.5,   // Between center and D
        'D': 87.5    // Slightly offset from right edge
    };
    
    const position = positions[finalScore] || 50;
    indicator.style.left = `${position}%`;
    
    // Update indicator color based on score
    indicator.style.backgroundColor = getScoreColor(finalScore);
}

function getScoreColor(score) {
    const colors = {
        'A': '#2c3e50',  // Dark blue for strong architectural
        'B': '#3498db',  // Blue for likely architectural
        'C': '#5dade2',  // Light blue for likely development
        'D': '#27ae60'   // Green for strong development
    };
    return colors[score] || '#3498db';
}

function displayScoreBreakdown(breakdown) {
    const breakdownContainer = document.getElementById('score-breakdown');
    
    if (!breakdownContainer) {
        console.error('Score breakdown container not found');
        return;
    }
    
    // Clear existing content
    breakdownContainer.innerHTML = '';
    
    breakdown.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-breakdown';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'category-header';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'category-name';
        nameSpan.textContent = category.category;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'category-score';
        scoreSpan.textContent = category.score;
        
        // Add score-specific styling
        scoreSpan.classList.add(`score-${category.score.toLowerCase()}`);
        
        headerDiv.appendChild(nameSpan);
        headerDiv.appendChild(scoreSpan);
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'category-description';
        descriptionDiv.innerHTML = `<strong>${category.label}:</strong> ${category.description}`;
        
        categoryDiv.appendChild(headerDiv);
        categoryDiv.appendChild(descriptionDiv);
        
        breakdownContainer.appendChild(categoryDiv);
    });
    
    console.log('Score breakdown displayed successfully');
}

function exportToMarkdown(results) {
    if (!results) {
        console.error('No results to export');
        return;
    }
    
    const { finalScore, numericScore, averageScore, totalScore, breakdown, interpretation } = results;
    
    let markdownContent = `# Assessment Results\n`;
    markdownContent += `\n**Final Recommendation:** ${finalScore}\n`;
    markdownContent += `\n**Score Interpretation:**\n\n${interpretation}\n`;
    markdownContent += `\n**Total Score:** ${totalScore}\n`;
    markdownContent += `\n**Average Score:** ${averageScore.toFixed(2)}\n`;
    markdownContent += `\n## Category Breakdown\n`;
    
    breakdown.forEach(category => {
        markdownContent += `\n### ${category.category}\n`;
        markdownContent += `- **Score:** ${category.score} (${category.numericScore})\n`;
        markdownContent += `- **Description:** ${category.label}\n`;
        markdownContent += `- **Details:** ${category.description}\n`;
    });
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment-results.md';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('Exported to Markdown successfully');
}

console.log('Application code loaded successfully');

// Additional functionality will be added in subsequent prompts
