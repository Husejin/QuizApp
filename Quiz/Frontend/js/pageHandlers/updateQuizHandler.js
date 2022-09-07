import {generateSingleQuestionDiv, initAddQuestionButton} from "../pageServices/questionService.js";
import {Quiz} from "../../Resources/QuizUtilities/Quiz.js";
import {init, initBackButtonAdmin, initCancelButton, scrapeQuestions} from "../utilityServices/commonService.js";
import {checkAdminStatus} from "../pageServices/loginService.js";

checkAdminStatus();

const params = new URLSearchParams(window.location.search);

init();
initUpdateButton();
initCancelButton();
initBackButtonAdmin();
$.get('http://localhost:8080/Backend_war_exploded/get_quiz', {id: params.get('id')}, (quiz) => {

    let title = document.getElementById('quizTitle');
    title.value = quiz.title;

    let image = document.getElementById('image');
    image.src = `data:image/png;base64,${quiz.alternateImage}`;

    let questions = document.getElementById('questionsDiv');

    quiz.questions.forEach((question) => {
        questions.appendChild(generateSingleQuestionDiv(question));
    })

})

function initUpdateButton() {
    let updateButton = document.getElementById('updateButton');
    updateButton.onclick = updateQuiz;
}


function updateQuiz() {
    let title = document.getElementById('quizTitle').value;
    let image = document.getElementById('image').src;

    let alternateImage = (image.substring(image.indexOf(',') + 1))

    let questions = scrapeQuestions();

    let quiz = new Quiz(params.get('id'), title, alternateImage, questions, questions.map(question => question.id));
    $.post('http://localhost:8080/Backend_war_exploded/update_quiz', {quizEntity: JSON.stringify(quiz)});
    //todo check empty fields
    alert("You successfully updated the quiz!");
    location.href = './allQuizzes.html'
}







