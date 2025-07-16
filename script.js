const questions = [
    {
        question: "Qual a data e local do nosso primeiro beijo?",
        options: ["03/09, Escola", "03/08, Parque da cidade", "03/09, Parque da cidade", "12/10, Na sua casa"],
        answer: "03/09, Parque da cidade"
    },
    {
        question: "Qual a minha cor favorita?",
        options: ["Azul", "Preto", "Azul Escuro", "Verde"],
        answer: "Azul"
    },
    {
        question: "Qual foi o prato do almoço que eu te apresentei pra minha mãe??",
        options: ["Macarroanda", "Frango assado", "Lasanha", "Churrasco"],
        answer: "Lasanha"
    },
    {
        question: "Qual foi a viagem que mais nos marcou?",
        options: ["Campos do Jordão", "Parati", "Cabreúva", "São Bernardo do Campo"],
        answer: "Parati"
    },
    {
        question: "Qual é o número que eu calço?",
        options: ["39", "40", "41", "42"],
        answer: "42"
    },
    {
        question: "Qual a palavra que criamos para dizer o quanto nos amamos?",
        options: ["Espinafre com Abobora", "Bolo de abacaxi com pipoca doce", "Bolo de abacaxi com pipoca", "Pipoca com bolo de abacaxi"],
        answer: "Bolo de abacaxi com pipoca"
    },
    {
        question: "Qual foi o natal que fomos para Nazaré Paulista?",
        options: ["2022", "2023", "2024", "2006"],
        answer: "2022"
    },
    {
        question: "Qual a nossa principal música?",
        options: ["Home", "Those Eyes", "Minha Cura", "Os anjos cantam"],
        answer: "Those Eyes"
    },
    {
        question: "Qual seu filme favorito?",
        options: ["Como se fosse a primeira vez", "Diário de uma paixão", "Carrossel", "Gente Grande"],
        answer: "Diário de uma paixão"
    },
    {
        question: "Qual é o nome da linguagem escrita usada pelos povos da Ilha de Páscoa, ainda não totalmente decifrada?",
        options: ["Linear A", "Cuneiforme", "Rongorongo", "Tifinagh"],
        answer: "Rongorongo"
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


