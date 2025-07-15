const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        answer: "Brasília"
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        answer: "Pacífico"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Vênus", "Marte", "Mercúrio", "Júpiter"],
        answer: "Mercúrio"
    },
    {
        question: "Qual é o animal terrestre mais rápido?",
        options: ["Leão", "Tigre", "Guepardo", "Cavalo"],
        answer: "Guepardo"
    },
    {
        question: "Quantos ossos tem o corpo humano adulto?",
        options: ["200", "206", "212", "218"],
        answer: "206"
    },
    {
        question: "Qual é o elemento químico mais abundante na crosta terrestre?",
        options: ["Silício", "Alumínio", "Ferro", "Oxigênio"],
        answer: "Oxigênio"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["William Shakespeare", "Miguel de Cervantes", "Jane Austen", "Charles Dickens"],
        answer: "Miguel de Cervantes"
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        options: ["K2", "Monte Everest", "Kangchenjunga", "Lhotse"],
        answer: "Monte Everest"
    },
    {
        question: "Qual é o maior deserto do mundo?",
        options: ["Gobi", "Saara", "Arábico", "Kalahari"],
        answer: "Saara"
    }
];

const startDate = new Date('2025-07-14T13:43:00'); // Data de liberação do botão

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const countdownMessage = document.getElementById('countdown-message');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function checkDateAndEnableButton() {
    const now = new Date();
    console.log('Current date:', now);
    console.log('Start date:', startDate);
    
    if (now >= startDate) {
        startButton.disabled = false;
        countdownMessage.textContent = 'O quiz está liberado! Clique em Iniciar Quiz.';
        countdownMessage.style.color = '#28a745';
    } else {
        startButton.disabled = true;
        const timeLeft = startDate.getTime() - now.getTime();
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownMessage.textContent = `O quiz será liberado em ${days}d ${hours}h ${minutes}m ${seconds}s`;
        countdownMessage.style.color = '#dc3545';
        setTimeout(checkDateAndEnableButton, 1000);
    }
}

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    optionsContainer.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(option, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption, correctAnswer) {
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.disabled = true; // Desabilita todos os botões após uma seleção

        if (selectedOption === correctAnswer) {
            if (button.textContent === selectedOption) {
                button.classList.add('correct');
            }
        } else {
            if (button.textContent === selectedOption) {
                button.classList.add('incorrect');
            }
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    } else {
        setTimeout(() => {
            restartQuiz();
        }, 2000);
    }
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResultScreen();
    }
}

function showResultScreen() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreSpan.textContent = score;

    const videoFinal = document.getElementById('video-final');
    videoFinal.classList.remove('hidden');
    videoFinal.play();
}


function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    checkDateAndEnableButton(); // Re-check date on restart
}

// Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

// Initial call to check date when the page loads
checkDateAndEnableButton();


