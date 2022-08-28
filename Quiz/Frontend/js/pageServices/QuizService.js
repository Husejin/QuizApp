function generateSingleQuizDiv(quiz) {
    let singleQuizDiv = document.createElement('div');
    singleQuizDiv.className = 'oneQuiz';
    singleQuizDiv.setAttribute('id', quiz.id);


    let sp1Div = document.createElement('div');
    sp1Div.className = 'sp1';
    let quizImageDiv = document.createElement('div');


    quizImageDiv.className = 'quizImage';
    let image = document.createElement('img');
    image.className = 'imageStyle';

    //TODO adapt src data:image/jpeg;base64 format
    image.src = quiz.alternateImage;
    let quizTitleDiv = document.createElement('div');


    quizTitleDiv.className = 'quizTitle';
    quizTitleDiv.innerHTML = quiz.title;

    let sp2Div = document.createElement('div');
    sp2Div.className = 'sp2';

    let startButton = document.createElement('button');
    startButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    startButton.innerHTML = 'Start'

    let sp2Div1 = document.createElement('div');
    sp2Div.className = 'sp2';

    let updateButton = document.createElement('button');
    updateButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    updateButton.innerHTML = 'Update'

    let sp2Div2 = document.createElement('div');
    sp2Div.className = 'sp2';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored';
    deleteButton.innerHTML = 'Delete'

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
