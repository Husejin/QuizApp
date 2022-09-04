import {generateSingleQuestionDiv, initAddQuestionButton} from "../pageServices/questionService.js";
import {Answer} from "../../Resources/QuizUtilities/Answer.js";
import {Question} from "../../Resources/QuizUtilities/Question.js";
import {Quiz} from "../../Resources/QuizUtilities/Quiz.js";

const params = new URLSearchParams(window.location.search);

init();

$.get('http://localhost:8080/Backend_war_exploded/get_quiz', {id: params.get('id')}, (quiz) => {

    console.log(quiz);
    let title = document.getElementById('quizTitle');
    title.value = quiz.title;

    let image = document.getElementById('image');
    image.src =  `data:image/png;base64,${quiz.alternateImage}`;

    let questions = document.getElementById('questionsDiv');

    quiz.questions.forEach((question) => {
        questions.appendChild(generateSingleQuestionDiv(question));
    })

})

let updateButton = document.getElementById('updateButton');
updateButton.onclick = updateQuiz;


function updateQuiz() {
    let title = document.getElementById('quizTitle').value;
    let image = document.getElementById('image').src;

    let alternateImage =(image.substring(image.indexOf(',') + 1))



    let questions = scrapeQuestions();

    let quiz = new Quiz(params.get('id'), title, alternateImage, questions, questions.map(question => question.id));
    $.post('http://localhost:8080/Backend_war_exploded/update_quiz', {quizEntity: JSON.stringify(quiz)});
    console.log(JSON.stringify(quiz));
}

function scrapeQuestions() {
    let questionsDivs = [...document.getElementById('questionsDiv').children];
    let questions = [];
    for (let i = 1; i < questionsDivs.length; i++) {
        let questionId = questionsDivs[i].getAttribute('id');
        let quizId = params.get('id');
        let questionText = questionsDivs[i].children[0].value;
        let maxDuration = questionsDivs[i].children[1].children[0].value;
        let value = questionsDivs[i].children[1].children[2].value;

        let answer1 = new Answer(questionsDivs[i].children[2].children[0].children[0].value, questionsDivs[i].children[2].children[0].children[1].checked);
        let answer2 = new Answer(questionsDivs[i].children[2].children[1].children[0].value, questionsDivs[i].children[2].children[1].children[1].checked);
        let answer3 = new Answer(questionsDivs[i].children[2].children[2].children[0].value, questionsDivs[i].children[2].children[2].children[1].checked);
        let answer4 = new Answer(questionsDivs[i].children[2].children[3].children[0].value, questionsDivs[i].children[2].children[3].children[1].checked);

        let answers = [answer1, answer2, answer3, answer4];
        questions.push(new Question(questionId, questionText, answers, maxDuration, value, quizId));
    }
    return questions;
}

function init() {
    let questions = document.getElementById('questionsDiv');
    initAddQuestionButton(questions);
    initializeImageHandler();
}


function initializeImageHandler() {
    let imageInput = document.getElementById('imageInput');
    imageInput.onchange = () => {
        readURL(imageInput)
    };
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result).width(250).height(400);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

