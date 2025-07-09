# Introduction

This document outlines the plan for building a browser-based tool to help software architects determine whether a decision should be made at the architectural level or deferred to the development team. The tool guides users through four structured questions and provides a recommendation on a scale from A to D.

# Project Overview

The project involves creating a tool that:
1. Allows architects to answer four structured questions.
2. Calculates a score (A–D) based on responses.
3. Shows a breakdown for each category.
4. Allows architects to edit responses and re-score.
5. Exports results as a Markdown file.

# Step-by-Step Blueprint

## 1. Initial Setup
- Create a new project directory.
- Initialize a version control system (e.g., Git).
- Set up the project structure.

## 2. User Interface (UI) Design
- Design the UI layout.
- Create wireframes for each screen.
- Implement the basic HTML structure.

## 3. Question and Scoring Logic
- Define the four structured questions.
- Implement the logic to calculate scores (A–D).
- Create functions to handle user responses.

## 4. Score Breakdown and Editing
- Implement the score breakdown display.
- Allow users to edit responses and re-score.

## 5. Export Functionality
- Implement the export to Markdown feature.

# Iterative Chunks

## Chunk 1: Initial Setup
1. Create a new project directory.
2. Initialize a version control system (e.g., Git).
3. Set up the project structure.

## Chunk 2: UI Design
1. Design the UI layout.
2. Create wireframes for each screen.
3. Implement the basic HTML structure.

## Chunk 3: Question and Scoring Logic
1. Define the four structured questions.
2. Implement the logic to calculate scores (A–D).
3. Create functions to handle user responses.

## Chunk 4: Score Breakdown and Editing
1. Implement the score breakdown display.
2. Allow users to edit responses and re-score.

## Chunk 5: Export Functionality
1. Implement the export to Markdown feature.

# Small Steps

## Step 1: Create Project Directory
- Create a new directory for the project.
- Initialize a Git repository.

## Step 2: Set Up Project Structure
- Create folders for HTML, CSS, and JavaScript files.
- Set up a basic index.html file.

## Step 3: Design UI Layout
- Create wireframes for the main screen and question screens.
- Implement the basic HTML structure.

## Step 4: Define Questions
- Define the four structured questions in JavaScript.
- Create functions to handle user responses.

## Step 5: Implement Scoring Logic
- Implement the logic to calculate scores (A–D) based on user responses.
- Create functions to display the score breakdown.

## Step 6: Score Breakdown Display
- Implement the score breakdown display in the UI.
- Allow users to edit responses and re-score.

## Step 7: Export to Markdown
- Implement the export to Markdown feature.
- Ensure the exported file includes the final score and breakdown.

# Code-Generation Prompts

## Prompt 1: Create Project Directory
# Create a new directory for the project
```
mkdir project-directory
cd project-directory

# Initialize a Git repository
git init
```

## Prompt 2: Set Up Project Structure
```
# Create folders for HTML, CSS, and JavaScript files
mkdir html css js

# Set up a basic index.html file
touch html/index.html
```

## Prompt 3: Design UI Layout
# Create wireframes for the main screen and question screens
# Implement the basic HTML structure
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Architecture Decision Helper</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="app">
        <!-- UI layout goes here -->
    </div>
    <script src="js/app.js"></script>
</body>
</html>
```

## Prompt 4: Define Questions
# Define the four structured questions in JavaScript
```
const questions = [
"Does this decision affect the structure of the system?",
"How many people need to be involved in making this decision?",
"What is the estimated level of effort required to implement this decision?",
"Does this decision involve significant trade-offs?"
];
```

# Create functions to handle user responses
```
function handleResponse(questionIndex, response) {
// Logic to handle user responses
}
```

## Prompt 5: Implement Scoring Logic
# Implement the logic to calculate scores (A–D) based on user responses
```
function calculateScore(responses) {
// Logic to calculate scores
}
```

# Create functions to display the score breakdown
```
function displayScoreBreakdown(score) {
// Logic to display score breakdown
}
```

## Prompt 6: Score Breakdown Display
# Implement the score breakdown display in the UI
```
function updateScoreBreakdownUI(scoreBreakdown) {
// Logic to update the UI with score breakdown
}
```

# Allow users to edit responses and re-score
```
function editResponses() {
// Logic to allow users to edit responses
}
```

## Prompt 7: Export to Markdown
# Implement the export to Markdown feature
```
function exportToMarkdown(scoreBreakdown) {
// Logic to export score breakdown to Markdown
}
```
