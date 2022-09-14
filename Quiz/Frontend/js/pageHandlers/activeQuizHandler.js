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

/*
function generateLeaderBoard2(leaderBoard) {
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
*/
function generateLeaderBoard(leaderBoard) {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    let leaderBoardTitleDiv = document.createElement("div");
    leaderBoardTitleDiv.className = "leaderBoardTitle";
    let divUsername = document.createElement("div");
    divUsername.className = "divUsername";
    divUsername.innerHTML = "Username";
    let divScore = document.createElement("div");
    divScore.className = "divScore";
    divScore.innerHTML = "Score";
    leaderBoardTitleDiv.appendChild(divUsername);
    leaderBoardTitleDiv.appendChild(divScore);

    let leaderBoardDiv = document.createElement('div');
    leaderBoardDiv.className = "leaderBoardDiv";
    leaderBoard.forEach(leaderBoardEntry => {
        let div = document.createElement('div');
        div.className = "leaderBoardEntry";
        let divUser = document.createElement("div");
        divUser.className = "divUsername";
        divUser.innerHTML =`${leaderBoardEntry.username}`
        let divScore = document.createElement("div");
        divScore.className = "divScore";
        divScore.innerHTML = `${leaderBoardEntry.points}`
        div.appendChild(divUser);
        div.appendChild(divScore);
        leaderBoardDiv.appendChild(div);
    })

    let divBtn = document.createElement("div");
    divBtn.className = "sp2";
    let divButton = document.createElement('div');
    divButton.className = "buttons";
    let button = document.createElement('button');
    button.setAttribute('id', 'backButton');
    button.className = "butt2";
    button.innerHTML = 'Back';
    button.onclick=()=>{
        eraseCookie('userName');
        eraseCookie('quizPin');
        eraseCookie('question');
        location.href='./allQuizzes.html'}
    divButton.appendChild(button);
    divBtn.appendChild(divButton);
    panel.appendChild(leaderBoardTitleDiv);
    panel.appendChild(leaderBoardDiv);
    panel.appendChild(divBtn);
}
