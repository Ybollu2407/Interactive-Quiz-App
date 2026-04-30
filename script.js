const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            answers: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2,
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface."
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2,
            explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
        },
        {
            question: "What is the largest mammal in the world?",
            answers: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correct: 1,
            explanation: "The blue whale is the largest animal ever known to have lived on Earth."
        },
        {
            question: "In which year did World War II end?",
            answers: ["1944", "1945", "1946", "1947"],
            correct: 1,
            explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for gold?",
            answers: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            explanation: "Au comes from the Latin word 'aurum' meaning gold."
        },
        {
            question: "How many bones are in an adult human body?",
            answers: ["196", "206", "216", "226"],
            correct: 1,
            explanation: "An adult human has 206 bones, while babies are born with about 270."
        },
        {
            question: "What is the speed of light in vacuum?",
            answers: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
            correct: 0,
            explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second."
        },
        {
            question: "Which gas makes up about 78% of Earth's atmosphere?",
            answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
            correct: 2,
            explanation: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen is about 21%."
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: ["Quartz", "Diamond", "Steel", "Titanium"],
            correct: 1,
            explanation: "Diamond is the hardest naturally occurring substance on Earth."
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            answers: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            correct: 2,
            explanation: "George Washington served as the first President from 1789 to 1797."
        },
        {
            question: "In which year did the Berlin Wall fall?",
            answers: ["1987", "1988", "1989", "1990"],
            correct: 2,
            explanation: "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era."
        },
        {
            question: "Which ancient wonder of the world was located in Alexandria?",
            answers: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Statue of Zeus"],
            correct: 1,
            explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
        },
        {
            question: "Who was known as the Iron Lady?",
            answers: ["Queen Elizabeth II", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
            correct: 1,
            explanation: "Margaret Thatcher, the UK Prime Minister from 1979-1990, was known as the Iron Lady."
        },
        {
            question: "Which empire was ruled by Julius Caesar?",
            answers: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Ottoman Empire"],
            correct: 1,
            explanation: "Julius Caesar was a Roman general and statesman who ruled the Roman Empire."
        }
    ],
    geography: [
        {
            question: "What is the longest river in the world?",
            answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correct: 1,
            explanation: "The Nile River is generally considered the longest river at about 6,650 km."
        },
        {
            question: "Which country has the most time zones?",
            answers: ["Russia", "United States", "China", "France"],
            correct: 3,
            explanation: "France has 12 time zones due to its overseas territories, more than any other country."
        },
        {
            question: "What is the smallest country in the world?",
            answers: ["Monaco", "Nauru", "Vatican City", "San Marino"],
            correct: 2,
            explanation: "Vatican City is the smallest country with an area of just 0.17 square miles."
        },
        {
            question: "Which mountain range contains Mount Everest?",
            answers: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
            correct: 3,
            explanation: "Mount Everest is located in the Himalayas on the border of Nepal and Tibet."
        },
        {
            question: "What is the deepest ocean trench?",
            answers: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"],
            correct: 2,
            explanation: "The Mariana Trench is the deepest part of the ocean at about 36,000 feet deep."
        }
    ]
};

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;
let quizStartTime = 0;
let isAnswered = false;

function initializeQuiz() {
    showScreen('startScreen');
}


function showScreen(screenId) {
    document.querySelectorAll('#startScreen, #settingsScreen, #quizScreen, #resultsScreen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}


function showSettings() {
    showScreen('settingsScreen');
}

function hideSettings() {
    showScreen('startScreen');
}


function startQuiz() {
    const category = document.getElementById('categorySelect').value;
    currentQuiz = [...quizData[category]];
    
    
    currentQuiz = shuffleArray(currentQuiz);
    
    currentQuestion = 0;
    score = 0;
    quizStartTime = Date.now();
    
    document.getElementById('totalQuestions').textContent = currentQuiz.length;
    document.getElementById('currentScore').textContent = score;
    
    showScreen('quizScreen');
    loadQuestion();
}


function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


function loadQuestion() {
    const question = currentQuiz[currentQuestion];
    selectedAnswer = -1;
    isAnswered = false;
    
    
    const progress = ((currentQuestion) / currentQuiz.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    
    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestion + 1} of ${currentQuiz.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = answer;
        answerDiv.onclick = () => selectAnswer(index);
        answerDiv.setAttribute('data-index', index);
        answersGrid.appendChild(answerDiv);
    });
    
    
    document.getElementById('feedback').classList.remove('show');
    document.getElementById('nextBtn').disabled = true;
}


function selectAnswer(index) {
    if (isAnswered) return;
    
    selectedAnswer = index;
    const question = currentQuiz[currentQuestion];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    
    answerOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    
    answerOptions[index].classList.add('selected');
    
    
    setTimeout(() => {
        showFeedback(index, question.correct, question.explanation);
    }, 300);
}


function showFeedback(selectedIndex, correctIndex, explanation) {
    isAnswered = true;
    const answerOptions = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    
    
    answerOptions.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== correctIndex) {
            option.classList.add('incorrect');
        }
    });
    
    
    if (selectedIndex === correctIndex) {
        score++;
        feedback.textContent = `Correct! ${explanation}`;
        feedback.className = 'feedback correct';
        
        
        answerOptions[correctIndex].classList.add('pulse');
    } else {
        feedback.textContent = `Incorrect. ${explanation}`;
        feedback.className = 'feedback incorrect';
    }
    
    
    feedback.classList.add('show');
    
   
    document.getElementById('currentScore').textContent = score;
    
   
    nextBtn.disabled = false;
    
    
    setTimeout(() => {
        if (currentQuestion < currentQuiz.length - 1) {
            nextQuestion();
        } else {
            showResults();
        }
    }, 3000);
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < currentQuiz.length) {
        loadQuestion();
    } else {
        showResults();
    }
}


function endQuiz() {
    if (confirm('Are you sure you want to end the quiz?')) {
        showResults();
    }
}


function showResults() {
    const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    document.getElementById('finalScore').textContent = percentage + '%';
    document.getElementById('questionsAnswered').textContent = currentQuestion + (isAnswered ? 1 : 0);
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('timeTaken').textContent = timeTaken;
    
   
    let message = '';
    if (percentage >= 90) {
        message = 'Outstanding! You\'re a quiz master! 🏆';
    } else if (percentage >= 70) {
        message = 'Great job! You know your stuff! 🌟';
    } else if (percentage >= 50) {
        message = 'Not bad! Keep learning and improving! 📚';
    } else {
        message = 'Nice try! Practice makes perfect! 💪';
    }
    
    document.getElementById('resultsMessage').textContent = message;
    showScreen('resultsScreen');
}


function restartQuiz() {
    showScreen('startScreen');
}


function goHome() {
    showScreen('startScreen');
}


window.onload = initializeQuiz;