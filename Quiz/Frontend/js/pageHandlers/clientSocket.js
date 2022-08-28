import {getCookie, setCookie} from "../utilityServices/cookieService.js";


if (getCookie('quizPin') === null) {
    generatePinForm();
} else {
    generateUsernameForm();
}


function joinQuizListener() {
    let userNameField = document.getElementById('userName');
    let userName = userNameField.value;
    if (userName !== '') {
        joinQuiz(userName);
    } else {
        alert("Plaese enter a username first")
    }


}

function joinQuiz(userName) {
    let testSocket = new WebSocket("ws://localhost:8080/Backend_war_exploded/quiz_server");

    testSocket.onopen = function (e) {
        alert("[open] Connection established");
        alert("Sending to server");
        console.log(getCookie('quizPin'));
        testSocket.send(`{userRole: 'PLAYER', quizPin: '${getCookie('quizPin')}', messageType: 'JOIN', userName: '${userName}'}`);

    };

    testSocket.onmessage = function (event) {
        alert(`[message] Data received from server: ${event.data}`);
    };
}

function generatePinForm() {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    let label = document.createElement('label');
    label.setAttribute('for', 'quizPin');
    label.innerHTML = 'Quiz pin: ';

    let input = document.createElement('input');
    input.setAttribute('id', 'quizPin');

    let button = document.createElement('button');
    button.setAttribute('id', 'joinQuizButton');
    button.innerHTML = 'Join';


    button.onclick = savePin;

    panel.appendChild(label);
    panel.appendChild(input);
    panel.appendChild(button);
}

function savePin() {
    let quizPinField = document.getElementById('quizPin');
    if (quizPinField.value === null)
        alert("Please enter a pin first");
    else {
        $.get('http://localhost:8080/Backend_war_exploded/checkQuizPin?', {quizPin: quizPinField.value},
            (data) => {
                if (JSON.parse(data) === 'FAILURE') {
                    alert('You entered an invalid Quiz Pin')
                } else {
                    setCookie('quizPin',quizPinField.value);
                    generateUsernameForm();
                }
            })
    }

}

function generateUsernameForm() {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    let label = document.createElement('label');
    label.setAttribute('for', 'userName');
    label.innerHTML = 'Username: ';

    let input = document.createElement('input');
    input.setAttribute('id', 'userName');

    let button = document.createElement('button');
    button.setAttribute('id', 'usernameButton');
    button.innerHTML = 'Start';

    button.onclick = joinQuizListener;

    panel.appendChild(label);
    panel.appendChild(input);
    panel.appendChild(button);
}
