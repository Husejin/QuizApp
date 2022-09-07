import {getCookie, setCookie} from "../utilityServices/cookieService.js";

let testSocket = new WebSocket("ws://localhost:8080/Backend_war_exploded/quiz_server");

testSocket.onmessage = function (event) {
    let message = JSON.parse(event.data);
    switch (message.messageType) {
        case "LEADERBOARD":
            console.log(message);
            break
        case "NEXT_QUESTION":
            setCookie('question', JSON.stringify(message.question));
            generateQuestionForm(message.question);
            break
        case "ANSWER":
            setCookie('question','');
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
    waitingForQuestionDiv.innerHTML = 'WAITING FOR NEXT QUESTION...';
    panel.appendChild(waitingForQuestionDiv);
}

if (getCookie('quizPin') === null) {
    generatePinForm();
} else if (getCookie('userName') === null) {
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
        testSocket = joinQuiz(userName);
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


function generateQuestionForm(question) {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    console.log(question.answers);
    let answers = question.answers;

    let questionTextDiv = document.createElement('div');
    questionTextDiv.innerHTML = question.questionText;
    let nextQuestionButton = document.createElement('button');
    nextQuestionButton.innerHTML = "Submit";
    let answer1Button = document.createElement('input');
    let answer1Label = document.createElement('label');
    answer1Button.type = "checkbox";
    answer1Label.innerHTML = answers[0].answerText;
    let answer2Button = document.createElement('input')
    let answer2Label = document.createElement('label');
    answer2Button.type = "checkbox";
    answer2Label.innerHTML = answers[1].answerText;
    let answer3Button = document.createElement('input');
    let answer3Label = document.createElement('label');
    answer3Button.type = "checkbox";
    answer3Label.innerHTML = answers[2].answerText;
    let answer4Button = document.createElement('input');
    let answer4Label = document.createElement('label');
    answer4Button.type = "checkbox";
    answer4Label.innerHTML = answers[3].answerText;

    function submitAnswer() {
        answers[0].isCorrect = answer1Button.checked;
        answers[1].isCorrect = answer2Button.checked;
        answers[2].isCorrect = answer3Button.checked;
        answers[3].isCorrect = answer4Button.checked;
        question.answers = answers;
        testSocket.send(`{userRole: 'PLAYER', quizPin: '${getCookie('quizPin')}', messageType: 'ANSWER', userName: '${getCookie('userName')}', question: ${JSON.stringify(question)}}`);
    }

    nextQuestionButton.onclick = submitAnswer;

    panel.appendChild(questionTextDiv);
    panel.appendChild(answer1Button);
    panel.appendChild(answer1Label);
    panel.appendChild(answer2Button);
    panel.appendChild(answer2Label);
    panel.appendChild(answer3Button);
    panel.appendChild(answer3Label);
    panel.appendChild(answer4Button);
    panel.appendChild(answer4Label);
    panel.appendChild(nextQuestionButton);


}


function generateQuestionForm(question) {
    let panel = document.getElementById('mainPanel');
    panel.innerHTML = '';
    console.log(question.answers);
    let answers = question.answers;

    let questionTextDiv = document.createElement('div');
    questionTextDiv.innerHTML = question.questionText;
    let nextQuestionButton = document.createElement('button');
    nextQuestionButton.innerHTML = "Submit";
    let answer1Button = document.createElement('input');
    let answer1Label = document.createElement('label');
    answer1Button.type = "checkbox";
    answer1Label.innerHTML = answers[0].answerText;
    let answer2Button = document.createElement('input')
    let answer2Label = document.createElement('label');
    answer2Button.type = "checkbox";
    answer2Label.innerHTML = answers[1].answerText;
    let answer3Button = document.createElement('input');
    let answer3Label = document.createElement('label');
    answer3Button.type = "checkbox";
    answer3Label.innerHTML = answers[2].answerText;
    let answer4Button = document.createElement('input');
    let answer4Label = document.createElement('label');
    answer4Button.type = "checkbox";
    answer4Label.innerHTML = answers[3].answerText;

    function submitAnswer() {
        answers[0].isCorrect = answer1Button.checked;
        answers[1].isCorrect = answer2Button.checked;
        answers[2].isCorrect = answer3Button.checked;
        answers[3].isCorrect = answer4Button.checked;
        question.answers = answers;
        testSocket.send(`{userRole: 'PLAYER', quizPin: '${getCookie('quizPin')}', messageType: 'ANSWER', userName: '${getCookie('userName')}', question: ${JSON.stringify(question)}}`);
    }

    nextQuestionButton.onclick = submitAnswer;

    panel.appendChild(questionTextDiv);
    panel.appendChild(answer1Button);
    panel.appendChild(answer1Label);
    panel.appendChild(answer2Button);
    panel.appendChild(answer2Label);
    panel.appendChild(answer3Button);
    panel.appendChild(answer3Label);
    panel.appendChild(answer4Button);
    panel.appendChild(answer4Label);
    panel.appendChild(nextQuestionButton);


}