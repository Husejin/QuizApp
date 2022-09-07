import {eraseCookie, getCookie, setCookie} from "../utilityServices/cookieService.js";
import {checkAdminStatus} from "../pageServices/loginService.js";
import {initBackButtonAdmin} from "../utilityServices/commonService.js";


checkAdminStatus();
const params = new URLSearchParams(window.location.search);
let timer = 0;
initBackButtonAdmin();
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
    nextQuestionButton.innerHTML = 'START';
    clearInterval(getCookie('timer'));
    eraseCookie('timer');

    function nextQuestionListener() {
        hostSocket.send(`{userRole: ${user.role}, messageType: 'NEXT_QUESTION'}`);
    }

    nextQuestionButton.onclick = nextQuestionListener;
}


function handleNextQuestionMessage(question) {
    clearInterval(timer);
    let timeRemainingDiv = document.getElementById('timeRemaining');
    let questionTimer = setInterval(() => {
        timeRemainingDiv.innerHTML = question.maxTime;
        question.maxTime = question.maxTime - 1;
        if (question.maxTime === -1) {
            clearInterval(questionTimer);
            timeRemainingDiv.innerHTML = 'Time over!';
        }
    }, 1000);
    timer = questionTimer;
    setCookie('timer', questionTimer);
    timeRemainingDiv.innerHTML = question.maxTime;
    let nextQuestionButton = document.getElementById('nextQuestionButton');
    nextQuestionButton.innerHTML = 'NEXT QUESTION';
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
                    break
                case "PLAYER_COUNT":
                    playerCountDiv.innerHTML = message.playerCount !== undefined ? message.playerCount : "0";
                    break
                case "LEADERBOARD":
                    generateLeaderBoard(message.leaderBoard);
                    let nextQuestionButton = document.getElementById('nextQuestionButton');
                    nextQuestionButton.hidden = true;
                    let timeRemainingDiv = document.getElementById('timeRemaining');
                    timeRemainingDiv.innerHTML = '';
                    break
                case "NEXT_QUESTION":
                    handleNextQuestionMessage(message.question);
                    break
            }
        };
    }

}

function generateLeaderBoard(leaderBoard) {
    let playerCountDiv = document.getElementById('numberOfPeople');
    let quizPinDiv = document.getElementById('quizPin');
    playerCountDiv.innerHTML = '';
    quizPinDiv.innerHTML = '';
    let timeRemainingDiv = document.getElementById('timeRemaining');
    timeRemainingDiv.innerHTML = '';
    clearInterval(getCookie('timer'));
    clearInterval(timer);
    let leaderBoardDiv = document.createElement('div');
    leaderBoard.forEach(leaderBoardEntry => {
        let div = document.createElement('div');
        div.innerHTML = `${leaderBoardEntry.username} : ${leaderBoardEntry.points}`
        leaderBoardDiv.appendChild(div);
    })
    quizPinDiv.appendChild(leaderBoardDiv);


}
