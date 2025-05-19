let num1, num2, score = 0;
let timer;
let timeLeft = 10;
const maxTime = 10;
let questionCount = 0;
const maxQuestions = 10;

const startBtn = document.getElementById('startBtn');
const quizBox = document.querySelector('.quiz-box');
const finalBox = document.querySelector('.final-box');

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timeFill = document.getElementById('timeFill');

const finalScore = document.getElementById('finalScore');
const finalHighScore = document.getElementById('finalHighScore');

function loadHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  highScoreDisplay.textContent = highScore;
}

function updateHighScore() {
  const highScore = parseInt(localStorage.getItem('highScore') || '0');
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    highScoreDisplay.textContent = score;
    finalHighScore.textContent = score;
  } else {
    finalHighScore.textContent = highScore;
  }
}

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  quizBox.classList.remove('hidden');
  score = 0;
  questionCount = 0;
  scoreDisplay.textContent = score;
  loadHighScore();
  generateQuestion();
});

function generateQuestion() {
  if (questionCount >= maxQuestions) {
    showFinalScreen();
    return;
  }

  clearInterval(timer);
  timeLeft = maxTime;
  updateTimeBar();

  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  question.textContent = `What is ${num1} × ${num2} ?`;
  answer.value = '';
  feedback.textContent = '';

  timer = setInterval(() => {
    timeLeft--;
    updateTimeBar();

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleWrong();
    }
  }, 1000);
}

function updateTimeBar() {
  const width = (timeLeft / maxTime) * 100;
  timeFill.style.width = `${width}%`;
}

function checkAnswer() {
  const userAnswer = parseInt(answer.value);
  if (userAnswer === num1 * num2) {
    handleCorrect();
  } else {
    handleWrong();
  }
}

function handleCorrect() {
  feedback.textContent = '✅ Correct !';
  feedback.className = 'correct';
  score += 10;
  questionCount++;
  updateScore();
  setTimeout(generateQuestion, 800);
}

function handleWrong() {
  feedback.textContent = '❌ Wrong !';
  feedback.className = 'wrong';
  score -= 5;
  questionCount++;
  updateScore();
  setTimeout(generateQuestion, 800);
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function showFinalScreen() {
  clearInterval(timer);
  quizBox.classList.add('hidden');
  finalBox.classList.remove('hidden');
  finalScore.textContent = score;
  updateHighScore();
}

function restartQuiz() {
  finalBox.classList.add('hidden');
  score = 0;
  questionCount = 0;
  scoreDisplay.textContent = score;
  highScoreDisplay.textContent = localStorage.getItem('highScore') || 0;
  quizBox.classList.remove('hidden');
  generateQuestion();
}
