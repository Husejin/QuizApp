import {getCookie, setCookie} from "../utilityServices/cookieService.js";


export default function registerLoginHandler() {
    let signInButton = document.getElementById('loginButton');
    signInButton.onclick = loginHandler;
}

async function checkUserLogin(username, password, callback) {
    $.get("http://localhost:8080/Backend_war_exploded/login",
        {username: username, password: password}, callback);
}

function loginHandler() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    checkUserLogin(username, password, loginRequestCallback);
}

function loginRequestCallback(data) {
    let loginResponse = JSON.parse(data);
    if (loginResponse.status === 'SUCCESS') {
        if (loginResponse.role === 'SUPERADMIN' || loginResponse.role === 'EDITOR') {
            alert("You logged in as admin user. We are redirecting you to the admin page now.");
            setCookie('LOGGED', `${loginResponse.role}`);
            setCookie('userId', loginResponse.userId);
            location.href = "admin/allQuizzes.html"
        } else {
            location.href = "app.html";
        }
    } else {
        alert("Your username/password is incorrect");
    }
}

export function checkLoggedAdminStatus() {
    if (getCookie('userId') !== null && getCookie('userId') !== '') {
        location.href = `./admin/allQuizzes.html`;
    }
}

export function checkAdminStatus() {
    if (getCookie('userId') === null || getCookie('userId' === '')) {
        location.href=`../client.html`;
    }
}


