import {init, initBackButtonAdmin, initCancelButton, scrapeQuestions} from "../utilityServices/commonService.js";
import {Quiz} from "../../Resources/QuizUtilities/Quiz.js";
import {checkAdminStatus} from "../pageServices/loginService.js";

checkAdminStatus();
init();
initCreateButton();
initCancelButton();
initBackButtonAdmin();
function initCreateButton() {
    let createButton = document.getElementById('createButton')
    createButton.onclick = createQuiz;
}

function createQuiz() {
    let title = document.getElementById('quizTitle').value;
    let image = document.getElementById('image').src;

    let alternateImage = (image.substring(image.indexOf(',') + 1))
    let questions = scrapeQuestions();
    let quiz = new Quiz(null, title, alternateImage, questions, []);
    $.post('http://localhost:8080/Backend_war_exploded/create_quiz', {quizEntity: JSON.stringify(quiz)});
    alert("Quiz successfully created!");
    location.href = 'allQuizzes.html';
}