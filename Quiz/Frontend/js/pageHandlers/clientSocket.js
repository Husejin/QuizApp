import {getCookie} from "../utilityServices/cookieService.js";


if (getCookie('userName') !== null) {
    generatePinForm();
    let joinButton = document.getElementById('joinQuizButton');
    let userNameField = document.getElementById('userName');
    joinButton.onclick = joinQuizListener
} else {
    generateUsernameForm();

}


function joinQuizListener() {
    let userName = userNameField.value;
    if (userName !== '') {
        joinQuiz(userName);
    } else {
        alert("Plaese enter a quiz pin first")
    }


}

function joinQuiz(userName) {
    let testSocket = new WebSocket("ws://localhost:8080/Backend_war_exploded/quiz_server?userId=1");

    testSocket.onopen = function (e) {
        alert("[open] Connection established");
        alert("Sending to server");
        testSocket.send("{userRole: 'PLAYER', messageType: 'JOIN', userName: 'HUSKO'}");
    };

    testSocket.onmessage = function (event) {
        alert(`[message] Data received from server: ${event.data}`);
    };
}

function generatePinForm() {
    // <label htmlFor="userName">
    //     Username: </label>
    // <input id="userName">
    //     <button id="joinQuizButton">
    //         Join
    //     </button>
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

    panel.appendChild(label);
    panel.appendChild(input);
    panel.appendChild(button);
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

    panel.appendChild(label);
    panel.appendChild(input);
    panel.appendChild(button);
}
