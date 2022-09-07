import {getCookie} from "../utilityServices/cookieService.js";


const params = new URLSearchParams(window.location.search);
let connected = false;



let user = initUser();
user.then((user) => {
    let hostSocket = new WebSocket(`ws://localhost:8080/Backend_war_exploded/quiz_server?userId=${JSON.parse(user).id}`);
    hostSocket.onopen = ev => {
        startQuiz(hostSocket, JSON.parse(user));
        initNextQuestionButton(hostSocket, JSON.parse(user));
    }


});


function initUser() {
    return $.get('http://localhost:8080/Backend_war_exploded/get_user', {userId: getCookie('userId')}, (userEntity) => {
        return userEntity;
    })

}

function initNextQuestionButton(hostSocket, user) {
    let nextQuestionButton = document.getElementById('nextQuestionButton');

    function nextQuestionListener() {
        hostSocket.send(`{userRole: ${user.role}, messageType: 'NEXT_QUESTION'}`);
    }

    nextQuestionButton.onclick = nextQuestionListener;
}


function startQuiz(hostSocket, user) {
    let userId = getCookie('userId');
    if (userId != null) {
        hostSocket.send(`{userRole: ${user.role}, messageType: 'START', userName: ${user.username}, quizId: ${params.get('id')}}`);
        hostSocket.onmessage = function (event) {
            let message = JSON.parse(event.data);
            let playerCountDiv = document.getElementById('numberOfPeople');
            let quizPinDiv = document.getElementById('quizPin');
            switch (message.messageType) {
                case "START":
                    quizPinDiv.innerHTML = message.quizPin;
                    playerCountDiv.innerHTML = message.playerCount !== undefined ? message.playerCount : "0";
                    break;
                case "PLAYER_COUNT":
                    playerCountDiv.innerHTML = message.playerCount !== undefined ? message.playerCount : "0";
                    break;
            }
        };
    }

}