const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
  {
    question: "Quel est le langage utilisé pour styliser les pages web ?",
    answers: [
      { text: 'CSS', correct: true },
      { text: 'HTML', correct: false },
      { text: 'JavaScript', correct: false },
      { text: 'PHP', correct: false }
    ]
  },
  {
    question: "Que signifie HTML ?",
    answers: [
      { text: 'HyperText Markup Language', correct: true },
      { text: 'Home Tool Markup Language', correct: false },
      { text: 'Hyperlinks and Text Markup Language', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: "Quel est le langage utilisé pour créer des interactions dynamiques dans les pages web ?",
    answers: [
      { text: 'JavaScript', correct: true },
      { text: 'CSS', correct: false },
      { text: 'Python', correct: false },
      { text: 'SQL', correct: false }
    ]
  },
  {
    question: "Quel framework est utilisé pour développer des applications front-end ?",
    answers: [
      { text: 'React', correct: true },
      { text: 'Laravel', correct: false },
      { text: 'Node.js', correct: false },
      { text: 'Django', correct: false }
    ]
  },
  {
    question: "Quel est le serveur de base de données le plus utilisé avec PHP ?",
    answers: [
      { text: 'MySQL', correct: true },
      { text: 'PostgreSQL', correct: false },
      { text: 'MongoDB', correct: false },
      { text: 'SQLite', correct: false }
    ]
  }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  score = 0;
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    score++;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
    startButton.innerText = 'Recommencer';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
