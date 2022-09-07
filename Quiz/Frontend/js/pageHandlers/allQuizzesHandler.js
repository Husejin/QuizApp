import {generateSingleQuizDiv} from "../pageServices/quizService.js"
import {checkAdminStatus} from "../pageServices/loginService.js";
import {eraseCookie} from "../utilityServices/cookieService.js";

checkAdminStatus();
initCreateQuizButton();
initLogoutButton();

function initAllUsersButton() {
    let allUsersButton = document.getElementById('allUsersButton');
    allUsersButton.onclick = () => {
        location.href = '../user/allUsers.html'
    }
}

initAllUsersButton();

function initLogoutButton() {
    let logoutButton = document.getElementById('logoutButton');
    logoutButton.onclick = () => {
        eraseCookie('userId');
        eraseCookie('LOGGED');
        location.href = '../client.html'
    }
}

function initCreateQuizButton() {
    let createButton = document.getElementById('createButton');
    createButton.onclick = () => {
        location.href = './createQuiz.html'
    }
}


let allQuizzesDiv = document.getElementById('allQuizzes');

$.get('http://localhost:8080/Backend_war_exploded/all_quizzes', {},
    (data) => {
        for (const quiz of data) {
            allQuizzesDiv.appendChild(generateSingleQuizDiv(quiz));
        }
    })

