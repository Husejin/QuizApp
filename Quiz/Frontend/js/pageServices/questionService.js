export function generateSingleQuestionDiv(question) {
    // <div className="oneQuestion">
    //        <textarea rows="2" cols="40">
    //           Question Text
    //        </textarea>
    //     <div>
    //         <input type="number" name="Question Time">
    //             <label>Question Time</label>
    //             <input type="number" name="Question Value">
    //                 <label>Question Value</label>
    //     </div>
    // </div>

    let oneQuestionDiv = document.createElement('div');
    oneQuestionDiv.setAttribute('class', 'oneQuestion');
    oneQuestionDiv.setAttribute('id', question.id);
    oneQuestionDiv.setAttribute('quizId', question.quizId);
    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', 2);
    textArea.setAttribute('cols', 40);
    textArea.innerHTML = question.questionText;
    let additionalDiv = document.createElement('div');

    let maxDuration = document.createElement('input');
    maxDuration.setAttribute('type', 'number');
    maxDuration.value = question.maxTime;

    let maxDurationLabel = document.createElement('label');
    maxDurationLabel.innerHTML = 'Question time';

    let questionValue = document.createElement('input');
    questionValue.setAttribute('type', 'number');
    questionValue.value = question.value;

    let questionValueLabel = document.createElement('label');
    questionValueLabel.innerHTML = 'Question value';

    let answersDiv = document.createElement('div');

    let answersArray = question.answers;
    for (let i = 0; i < answersArray.length; i++) {

        let oneAnswerDiv = document.createElement('div');

        let answerText = document.createElement('input');
        answerText.value = answersArray[i].answerText;

        let correctAnswer = document.createElement('input');
        correctAnswer.checked = answersArray[i].isCorrect;

        correctAnswer.setAttribute('type', 'checkbox');

        oneAnswerDiv.appendChild(answerText);
        oneAnswerDiv.appendChild(correctAnswer);

        answersDiv.appendChild(oneAnswerDiv);
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = () => {
        oneQuestionDiv.remove()
    };

    additionalDiv.appendChild(maxDuration);
    additionalDiv.appendChild(maxDurationLabel);
    additionalDiv.appendChild(questionValue);
    additionalDiv.appendChild(questionValueLabel);
    oneQuestionDiv.appendChild(textArea);
    oneQuestionDiv.appendChild(additionalDiv);
    oneQuestionDiv.appendChild(answersDiv);
    oneQuestionDiv.appendChild(deleteButton);

    return oneQuestionDiv;

}

function generateEmptySingleQuestionDiv() {
    // <div className="oneQuestion">
    //        <textarea rows="2" cols="40">
    //           Question Text
    //        </textarea>
    //     <div>
    //         <input type="number" name="Question Time">
    //             <label>Question Time</label>
    //             <input type="number" name="Question Value">
    //                 <label>Question Value</label>
    //     </div>
    // </div>

    let oneQuestionDiv = document.createElement('div');

    oneQuestionDiv.setAttribute('class', 'oneQuestion');
    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', 2);
    textArea.setAttribute('cols', 40);

    let additionalDiv = document.createElement('div');

    let maxDuration = document.createElement('input');
    maxDuration.setAttribute('type', 'number');


    let maxDurationLabel = document.createElement('label');
    maxDurationLabel.innerHTML = 'Question time';

    let questionValue = document.createElement('input');
    questionValue.setAttribute('type', 'number');


    let questionValueLabel = document.createElement('label');
    questionValueLabel.innerHTML = 'Question value';

    let answersDiv = document.createElement('div');


    for (let i = 0; i < 4; i++) {

        let oneAnswerDiv = document.createElement('div');

        let answerText = document.createElement('input');


        let correctAnswer = document.createElement('input');


        correctAnswer.setAttribute('type', 'checkbox');

        oneAnswerDiv.appendChild(answerText);
        oneAnswerDiv.appendChild(correctAnswer);

        answersDiv.appendChild(oneAnswerDiv);
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = () => {
        oneQuestionDiv.remove()
    };

    additionalDiv.appendChild(maxDuration);
    additionalDiv.appendChild(maxDurationLabel);
    additionalDiv.appendChild(questionValue);
    additionalDiv.appendChild(questionValueLabel);
    oneQuestionDiv.appendChild(textArea);
    oneQuestionDiv.appendChild(additionalDiv);
    oneQuestionDiv.appendChild(answersDiv);
    oneQuestionDiv.appendChild(deleteButton);

    return oneQuestionDiv;


}

export function initAddQuestionButton(questionsDiv) {
    let addQuestionButton = document.getElementById('addQuestionButton');

    addQuestionButton.onclick = () => {
        questionsDiv.appendChild(generateEmptySingleQuestionDiv());
    }
}