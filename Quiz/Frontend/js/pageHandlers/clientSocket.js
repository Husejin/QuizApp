import {eraseCookie, getCookie, setCookie} from "../utilityServices/cookieService.js";
initLoginAndRegistrationButtons();
let testSocket = new WebSocket("ws://localhost:8080/Backend_war_exploded/quiz_server");

testSocket.onmessage = function (event) {
    let message = JSON.parse(event.data);
    switch (message.messageType) {
        case "LEADERBOARD":
            setCookie('question', '');
            setCookie('quizPin', '');
            setCookie('userName', '');
            generateLeaderBoard(message.leaderBoard);
            break
        case "NEXT_QUESTION":
            setCookie('question', JSON.stringify(message.question));
            generateQuestionForm(message.question);
            break
        case "ANSWER":
            setCookie('question', '');
            generateWaitingForm();
            break
        case "PLAYER_COUNT":
            break
    }
};

function generateWaitingForm() {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    let waitingForQuestionDiv = document.createElement('div');
    waitingForQuestionDiv.innerHTML = 'Waiting for next question...';
    waitingForQuestionDiv.className = "waitingQuestion";

    let loadingPanel = document.createElement("div");
    loadingPanel.className = "loadingPanel";

    let divLoading = document.createElement("div");
    divLoading.className = "mdl-spinner mdl-js-spinner is-active";

    loadingPanel.appendChild(divLoading);
    panel.appendChild(waitingForQuestionDiv);
    panel.appendChild(loadingPanel);
}

if (getCookie('quizPin') === null || getCookie('quizPin') === '') {
    generatePinForm();
} else if (getCookie('userName') === null || getCookie('userName') === '') {
    generateUsernameForm();
} else if (getCookie('question') === null || getCookie('question') === '') {
    generateWaitingForm();
} else {
    generateQuestionForm(JSON.parse(getCookie('question')));
}


function joinQuizListener() {
    let userNameField = document.getElementById('userName');
    let userName = userNameField.value;
    if (userName !== '') {
        joinQuiz(userName);
        generateWaitingForm();
    } else {
        alert("Plaese enter a username first")
    }


}

function joinQuiz(userName) {

    setCookie('userName', userName);
    testSocket.send(`{userRole: 'PLAYER', quizPin: '${getCookie('quizPin')}', messageType: 'JOIN', userName: '${userName}'}`);

}

function generatePinForm() {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    let label = document.createElement('label');
    label.setAttribute('for', 'quizPin');
    label.innerHTML = 'Quiz pin';
    label.className = "info-title";

    let divInput = document.createElement("div");
    divInput.className = "userBox";
    let input = document.createElement('input');
    input.setAttribute('id', 'quizPin');
    input.setAttribute('required', '');
    input.setAttribute('autocomplete', 'off');
    let labelInput = document.createElement("label");
    labelInput.textContent = "Input Quiz Pin";

    let divButton = document.createElement('div');
    divButton.className = "buttons";
    let button = document.createElement('button');
    button.setAttribute('id', 'joinQuizButton');
    button.className = "quit";
    button.innerHTML = 'Join';


    button.onclick = savePin;
    divInput.appendChild(input);
    divInput.appendChild(labelInput);
    divButton.appendChild(button);
    panel.appendChild(label);
    panel.appendChild(divInput);
    panel.appendChild(divButton);
}

function savePin() {
    let quizPinField = document.getElementById('quizPin');
    if (quizPinField.value === null) alert("Please enter a pin first"); else {
        $.get('http://localhost:8080/Backend_war_exploded/checkQuizPin?', {quizPin: quizPinField.value}, (data) => {
            if (JSON.parse(data) === 'FAILURE') {
                alert('You entered an invalid Quiz Pin')
            } else {
                setCookie('quizPin', quizPinField.value);
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
    label.innerHTML = 'Username';
    label.className = "info-title2";

    let divInput = document.createElement("div");
    divInput.className = "userBox";
    let input = document.createElement('input');
    input.setAttribute('id', 'userName');
    input.setAttribute('required', '');
    input.setAttribute('autocomplete', 'off');
    let labelInput = document.createElement("label");
    labelInput.textContent = "Input Username For Quiz";


    let divButton = document.createElement('div');
    divButton.className = "buttons";
    let button = document.createElement('button');
    button.setAttribute('id', 'usernameButton');
    button.className = "quit";
    button.innerHTML = 'Start';

    button.onclick = joinQuizListener;


    divInput.appendChild(input);
    divInput.appendChild(labelInput);
    divButton.appendChild(button);
    panel.appendChild(label);
    panel.appendChild(divInput);
    panel.appendChild(divButton);
}


function generateQuestionForm(question) {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    console.log(question.answers);
    let answers = question.answers;

    let divQuestions = document.createElement("div");
    divQuestions.className = "divQuestions";
    let questionTextDiv = document.createElement('div');
    questionTextDiv.innerHTML = question.questionText;
    questionTextDiv.className = " divAnswer1";

    let divAnswer1 = document.createElement("div");
    divAnswer1.className = "divAnswer";
    let answer1Button = document.createElement('input');
    answer1Button.className = "inputAnswer";
    let answer1Label = document.createElement('label');
    answer1Label.className = "labelAnswer";
    answer1Button.type = "checkbox";
    answer1Label.innerHTML = answers[0].answerText;
    divAnswer1.appendChild(answer1Label);
    divAnswer1.appendChild(answer1Button);

    let divAnswer2 = document.createElement("div");
    divAnswer2.className = "divAnswer";
    let answer2Button = document.createElement('input')
    answer2Button.className = "inputAnswer";
    let answer2Label = document.createElement('label');
    answer2Label.className = "labelAnswer";
    answer2Button.type = "checkbox";
    answer2Label.innerHTML = answers[1].answerText;
    divAnswer2.appendChild(answer2Label);
    divAnswer2.appendChild(answer2Button);

    let divAnswer3 = document.createElement("div");
    divAnswer3.className = "divAnswer";
    let answer3Button = document.createElement('input');
    answer3Button.className = "inputAnswer";
    let answer3Label = document.createElement('label');
    answer3Label.className = "labelAnswer";
    answer3Button.type = "checkbox";
    answer3Label.innerHTML = answers[2].answerText;
    divAnswer3.appendChild(answer3Label);
    divAnswer3.appendChild(answer3Button);

    let divAnswer4 = document.createElement("div");
    divAnswer4.className = "divAnswer4";
    let answer4Button = document.createElement('input');
    answer4Button.className = "inputAnswer";
    let answer4Label = document.createElement('label');
    answer4Label.className = "labelAnswer";
    answer4Button.type = "checkbox";
    answer4Label.innerHTML = answers[3].answerText;
    divAnswer4.appendChild(answer4Label);
    divAnswer4.appendChild(answer4Button);

    function submitAnswer() {
        answers[0].isCorrect = answer1Button.checked;
        answers[1].isCorrect = answer2Button.checked;
        answers[2].isCorrect = answer3Button.checked;
        answers[3].isCorrect = answer4Button.checked;
        question.answers = answers;
        testSocket.send(`{userRole: 'PLAYER', quizPin: '${getCookie('quizPin')}', messageType: 'ANSWER', userName: '${getCookie('userName')}', question: ${JSON.stringify(question)}}`);
        console.log(getCookie('timer'));
        clearInterval(getCookie('timer'));
        eraseCookie('timer');
    }


    let divTime = document.createElement("div");
    divTime.className = "divTime";
    let timeRemainingLabel = document.createElement("label");
    timeRemainingLabel.innerHTML = "Remaining time";
    let timeRemainingDiv = document.createElement('div');
    timeRemainingDiv.className = "timeRemainNumber";
    let questionDuration = setInterval(() => {
        timeRemainingDiv.innerHTML = `${question.maxTime}`;
        question.maxTime = question.maxTime - 1;
        if (question.maxTime === -1) {
            clearInterval(questionDuration);
            submitAnswer();
        }
    },1000);
    setCookie('timer',questionDuration);
    let divNextQuestBtn = document.createElement("div");
    divNextQuestBtn.className = "divNextQuestBtn buttons";
    let nextQuestionButton = document.createElement('button');
    nextQuestionButton.innerHTML = "Submit";
    nextQuestionButton.className = "butt";

    nextQuestionButton.onclick = submitAnswer;

    divQuestions.appendChild(questionTextDiv);
    divQuestions.appendChild(divAnswer1);
    divQuestions.appendChild(divAnswer2);
    divQuestions.appendChild(divAnswer3);
    divQuestions.appendChild(divAnswer4);

    divTime.appendChild(timeRemainingLabel);
    divTime.appendChild(timeRemainingDiv);

    divNextQuestBtn.appendChild(nextQuestionButton);

    panel.appendChild(divQuestions);
    panel.appendChild(divTime);
    panel.appendChild(divNextQuestBtn);
}

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

    let divButton = document.createElement('div');
    divButton.className = "buttons btn20";
    let button = document.createElement('button');
    button.setAttribute('id', 'backButton');
    button.className = "quit";
    button.innerHTML = 'Back';
    button.onclick=()=>{location.href='./client.html'}
    divButton.appendChild(button);

    panel.appendChild(leaderBoardTitleDiv);
    panel.appendChild(leaderBoardDiv);
    panel.appendChild(divButton);
}
function initLoginAndRegistrationButtons() {
    let loginButton = document.getElementById('loginButton');
    let registerButton = document.getElementById('registerButton');
    loginButton.onclick=()=>{location.href='./login.html'}
    registerButton.onclick=()=>{location.href='./register.html'}

}