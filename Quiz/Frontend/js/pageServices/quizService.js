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

    let divButton1 = document.createElement('div');
    divButton1.className = "buttons";

    let startButton = document.createElement('button');
    startButton.className = 'butt';
    startButton.innerHTML = 'Start'
    startButton.onclick = ()=>startQuiz(quiz.id);
    let sp2Div1 = document.createElement('div');
    sp2Div1.className = 'sp2';

    let divButton2 = document.createElement('div');
    divButton2.className = "buttons";

    let updateButton = document.createElement('button');
    updateButton.className = 'butt';
    updateButton.innerHTML = 'Update'
    updateButton.onclick = () => {
        location.href = `./updateQuiz.html?id=${quiz.id}`;
    }

    let sp2Div2 = document.createElement('div');
    sp2Div2.className = 'sp2';

    let divButton3 = document.createElement('div');
    divButton3.className = "buttons";

    let deleteButton = document.createElement('button');
    deleteButton.className = 'butt';
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

    divButton1.appendChild(startButton);
    sp2Div.appendChild(divButton1);
    singleQuizDiv.appendChild(sp2Div);

    divButton2.appendChild(updateButton);
    sp2Div1.appendChild(divButton2);
    singleQuizDiv.appendChild(sp2Div1);

    divButton3.appendChild(deleteButton);
    sp2Div2.appendChild(divButton3);
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
