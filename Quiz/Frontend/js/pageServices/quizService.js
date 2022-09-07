import {getCookie} from "../utilityServices/cookieService.js";

export function generateSingleQuizDiv(quiz) {
    let singleQuizDiv = document.createElement('div');
    singleQuizDiv.className = 'oneQuiz';
    singleQuizDiv.setAttribute('id', quiz.id);


    let sp1Div = document.createElement('div');
    sp1Div.className = 'sp1';
    let quizImageDiv = document.createElement('div');


    quizImageDiv.className = 'quizImage';
    let image = document.createElement('img');
    image.className = 'imageStyle';


    image.src = quiz.alternateImage;
    let quizTitleDiv = document.createElement('div');


    quizTitleDiv.className = 'quizTitle';
    quizTitleDiv.innerHTML = quiz.title;

    let sp2Div = document.createElement('div');
    sp2Div.className = 'sp2';

    let startButton = document.createElement('button');
    startButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    startButton.innerHTML = 'Start'
    startButton.onclick = ()=>startQuiz(quiz.id);
    let sp2Div1 = document.createElement('div');
    sp2Div1.className = 'sp2';

    let updateButton = document.createElement('button');
    updateButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    updateButton.innerHTML = 'Update'
    updateButton.onclick = () => {
        location.href = `./updateQuiz.html?id=${quiz.id}`;
    }

    let sp2Div2 = document.createElement('div');
    sp2Div2.className = 'sp2';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    deleteButton.innerHTML = 'Delete'
    deleteButton.onclick = () => {
        if (confirm('Are you sure you want to delete a quiz?')) {
            $.post('http://localhost:8080/Backend_war_exploded/delete_quiz', {id: quiz.id},
                () => {
                    alert('Successfully deleted quiz!');
                })
        }
    }

    quizImageDiv.appendChild(image);
    sp1Div.appendChild(quizImageDiv);
    sp1Div.appendChild(quizTitleDiv);
    singleQuizDiv.appendChild(sp1Div);

    sp2Div.appendChild(startButton);
    singleQuizDiv.appendChild(sp2Div);

    sp2Div1.appendChild(updateButton);
    singleQuizDiv.appendChild(sp2Div1);

    sp2Div2.appendChild(deleteButton);
    singleQuizDiv.appendChild(sp2Div2);

    return singleQuizDiv;
}

function startQuiz(quizId) {
    location.href = `./activeQuiz.html?id=${quizId}`;

}

function startQuiz(quizId) {
    location.href = `./activeQuiz.html?id=${quizId}`;

}

function startQuiz(quizId) {
    location.href = `./activeQuiz.html?id=${quizId}`;

}
