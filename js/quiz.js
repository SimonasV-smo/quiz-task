import {
  questionElement,
  choicesContainer,
  nextButton,
  progressElement,
  usernameContainer,
  usernameInput,
  submitButton,
  leaderboardList,
} from "./domElements.js";
import { questions } from "./questions.js";
import { submitScore, fetchTopScores } from "./api.js";

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

export function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedQuestions = getRandomQuestions(10);
  showQuestion();
  loadLeaderboard();
}

function getRandomQuestions(number) {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
}

export function showQuestion() {
  resetState();
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.classList.add("choice");
    if (index === currentQuestion.correctAnswerIndex) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    choicesContainer.appendChild(button);
  });
  progressElement.innerText = `Klausimas ${currentQuestionIndex + 1} iš ${
    selectedQuestions.length
  }`;
}

function resetState() {
  while (choicesContainer.firstChild) {
    choicesContainer.removeChild(choicesContainer.firstChild);
  }
  nextButton.classList.add("hide");
  usernameContainer.classList.remove("show"); // Paslėpti įvesties lauką
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  Array.from(choicesContainer.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (correct) score++;
  nextButton.classList.remove("hide");
  if (selectedQuestions.length > currentQuestionIndex + 1) {
    nextButton.innerText = "Kitas";
  } else {
    nextButton.innerText = "Baigti";
  }
}

function setStatusClass(element, correct) {
  if (correct) element.classList.add("correct");
  else element.classList.add("incorrect");
}

export function handleNextButton() {
  if (selectedQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  resetState();
  questionElement.innerText = `Tu atsakei teisingai į ${score} iš ${selectedQuestions.length} klausimų! Įveskite savo slapyvardį.`;
  usernameContainer.classList.add("show"); // Rodome įvesties lauką ir mygtuką
  submitButton.addEventListener("click", handleSubmitScore);
}

function handleSubmitScore() {
  const username = usernameInput.value.trim();
  if (username) {
    submitScore(username, score).then(() => {
      loadLeaderboard();
      usernameInput.value = "";
      usernameContainer.classList.remove("show"); // Paslėpti po pateikimo
    });
  }
}

async function loadLeaderboard() {
  const scores = await fetchTopScores();
  leaderboardList.innerHTML = "";
  scores.forEach((entry, index) => {
    const item = document.createElement("div");
    item.classList.add("leaderboard-item");
    item.innerText = `${index + 1}. ${entry.name}: ${entry.score} taškų`;
    leaderboardList.appendChild(item);
  });
}
