import {Answer} from "../../Resources/QuizUtilities/Answer.js";
import {Question} from "../../Resources/QuizUtilities/Question.js";
import {initAddQuestionButton} from "../pageServices/questionService.js";
import {eraseCookie} from "./cookieService.js";

const params = new URLSearchParams(window.location.search);

export function initializeImageHandler() {
    let imageInput = document.getElementById('imageInput');
    imageInput.onchange = () => {
        readURL(imageInput)
    };
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result).width(400).height(400);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

export function scrapeQuestions() {
    let questionsDivs = [...document.getElementById('questionsDiv').children];
    let questions = [];
    for (let i = 1; i < questionsDivs.length; i++) {
        let questionId = questionsDivs[i].getAttribute('id');
        let quizId = params.get('id');
        let questionText = questionsDivs[i].children[0].children[0].children[0].value;
        let maxDuration = questionsDivs[i].children[0].children[1].children[0].value;
        let value = questionsDivs[i].children[0].children[2].children[0].value;
        // console.log(quizId);
        // console.log(questionText);
        // console.log(maxDuration);
        // console.log(value);
        console.log(questionsDivs[i]);
        let answer1 = new Answer(questionsDivs[i].children[1].children[0].children[0].value, questionsDivs[i].children[1].children[0].children[1].checked);
        let answer2 = new Answer(questionsDivs[i].children[1].children[1].children[0].value, questionsDivs[i].children[1].children[1].children[1].checked);
        let answer3 = new Answer(questionsDivs[i].children[1].children[2].children[0].value, questionsDivs[i].children[1].children[2].children[1].checked);
        let answer4 = new Answer(questionsDivs[i].children[1].children[3].children[0].value, questionsDivs[i].children[1].children[3].children[1].checked);

        let answers = [answer1, answer2, answer3, answer4];
        questions.push(new Question(questionId, questionText, answers, maxDuration, value, quizId));
    }
    return questions;
}

export function init() {
    let questions = document.getElementById('questionsDiv');
    initAddQuestionButton(questions);
    initializeImageHandler();
}

export function initCancelButton() {
    let cancelButton = document.getElementById('cancelButton');
    cancelButton.onclick = () => {
        location.href = "./allQuizzes.html"
    };
}

export function initBackButtonAdmin() {
    let backButton = document.getElementById('backButton');
    backButton.onclick = () => {
        eraseCookie('userName');
        eraseCookie('quizPin');
        eraseCookie('question');
        location.href = './allQuizzes.html'
    }
}

export function initBackButtonClient() {
    let backButton = document.getElementById('backButton');
    backButton.onclick = () => {
        eraseCookie('userName');
        eraseCookie('quizPin');
        eraseCookie('question');
        location.href = './client.html'
    }
}