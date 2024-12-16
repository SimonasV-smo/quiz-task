import { startQuiz, handleNextButton } from "./quiz.js";
import { nextButton } from "./domElements.js";

document.addEventListener("DOMContentLoaded", () => {
  startQuiz();

  nextButton.addEventListener("click", () => {
    handleNextButton();
  });
});
