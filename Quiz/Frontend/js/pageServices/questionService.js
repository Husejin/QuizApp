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

    let divQuestInput_1 = document.createElement("div");
    divQuestInput_1.className = "questInput_1";
    let divQuestIn_11 = document.createElement("div");
    divQuestIn_11.className = "questIn_1";

    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', 1);
    textArea.setAttribute('cols', 40);
    textArea.className = "textArea";
    textArea.innerHTML = question.questionText;
    let label1 = document.createElement("label");
    label1.textContent = "Question";

    let divQuestIn_12 = document.createElement("div");
    divQuestIn_12.className = "questIn_1";

    let maxDuration = document.createElement('input');
    maxDuration.setAttribute('type', 'number');
    maxDuration.value = question.maxTime;

    let maxDurationLabel = document.createElement('label');
    maxDurationLabel.innerHTML = 'Question time';

    let divQuestIn_13 = document.createElement("div");
    divQuestIn_13.className = "questIn_1";

    let questionValue = document.createElement('input');
    questionValue.setAttribute('type', 'number');
    questionValue.value = question.value;

    let questionValueLabel = document.createElement('label');
    questionValueLabel.innerHTML = 'Question value';

    divQuestIn_11.appendChild(textArea);
    divQuestIn_11.appendChild(label1);
    divQuestIn_12.appendChild(maxDuration);
    divQuestIn_12.appendChild(maxDurationLabel);
    divQuestIn_13.appendChild(questionValue);
    divQuestIn_13.appendChild(questionValueLabel);
    divQuestInput_1.appendChild(divQuestIn_11);
    divQuestInput_1.appendChild(divQuestIn_12);
    divQuestInput_1.appendChild(divQuestIn_13);

    let answersDiv = document.createElement('div');
    answersDiv.className = "questionsCheckBox";

    let answersArray = question.answers;
    for (let i = 0; i < answersArray.length; i++) {

        let oneAnswerDiv = document.createElement('div');

        let answerText = document.createElement('input');
        answerText.value = answersArray[i].answerText;
        answerText.className = "inputQuestion";
        let answerT = "Answer" + (i + 1);
        answerText.setAttribute('placeholder', answerT);

        let correctAnswer = document.createElement('input');
        correctAnswer.checked = answersArray[i].isCorrect;
       correctAnswer.className = "inputCheck"

        correctAnswer.setAttribute('type', 'checkbox');

        oneAnswerDiv.appendChild(answerText);
        oneAnswerDiv.appendChild(correctAnswer);

        answersDiv.appendChild(oneAnswerDiv);
    }

    let divButton = document.createElement("div");
    divButton.className = "titleButton";
    let divButt = document.createElement("div");
    divButt.className = "buttons";
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete question';
    deleteButton.className = "butt";
    deleteButton.onclick = () => {
        oneQuestionDiv.remove()
    };

    divButt.appendChild(deleteButton);
    divButton.appendChild(divButt);

    oneQuestionDiv.appendChild(divQuestInput_1);
    oneQuestionDiv.appendChild(answersDiv);
    oneQuestionDiv.appendChild(divButton);
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

    let divQuestInput_1 = document.createElement("div");
    divQuestInput_1.className = "questInput_1";
    let divQuestIn_11 = document.createElement("div");
    divQuestIn_11.className = "questIn_1";

    let textArea = document.createElement('textarea');
    textArea.setAttribute('rows', 1);
    textArea.setAttribute('cols', 40);
    textArea.className = "textArea";
    //textArea.innerHTML = question.questionText;
    let label1 = document.createElement("label");
    label1.textContent = "Question";

    let divQuestIn_12 = document.createElement("div");
    divQuestIn_12.className = "questIn_1";

    let maxDuration = document.createElement('input');
    maxDuration.setAttribute('type', 'number');

    let maxDurationLabel = document.createElement('label');
    maxDurationLabel.innerHTML = 'Question time';

    let divQuestIn_13 = document.createElement("div");
    divQuestIn_13.className = "questIn_1";

    let questionValue = document.createElement('input');
    questionValue.setAttribute('type', 'number');

    let questionValueLabel = document.createElement('label');
    questionValueLabel.innerHTML = 'Question value';

    divQuestIn_11.appendChild(textArea);
    divQuestIn_11.appendChild(label1);
    divQuestIn_12.appendChild(maxDuration);
    divQuestIn_12.appendChild(maxDurationLabel);
    divQuestIn_13.appendChild(questionValue);
    divQuestIn_13.appendChild(questionValueLabel);
    divQuestInput_1.appendChild(divQuestIn_11);
    divQuestInput_1.appendChild(divQuestIn_12);
    divQuestInput_1.appendChild(divQuestIn_13);

    let answersDiv = document.createElement('div');
    answersDiv.className = "questionsCheckBox";

    for (let i = 0; i < 4; i++) {

        let oneAnswerDiv = document.createElement('div');

        let answerText = document.createElement('input');
        answerText.className = "inputQuestion";
        let answerT = "Answer" + (i + 1);
        answerText.setAttribute('placeholder', answerT);

        let correctAnswer = document.createElement('input');
        correctAnswer.className = "inputCheck"

        correctAnswer.setAttribute('type', 'checkbox');

        oneAnswerDiv.appendChild(answerText);
        oneAnswerDiv.appendChild(correctAnswer);

        answersDiv.appendChild(oneAnswerDiv);
    }

    let divButton = document.createElement("div");
    divButton.className = "titleButton";
    let divButt = document.createElement("div");
    divButt.className = "buttons";
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete question';
    deleteButton.className = "butt";
    deleteButton.onclick = () => {
        oneQuestionDiv.remove()
    };

    divButt.appendChild(deleteButton);
    divButton.appendChild(divButt);

    oneQuestionDiv.appendChild(divQuestInput_1);
    oneQuestionDiv.appendChild(answersDiv);
    oneQuestionDiv.appendChild(divButton);
    return oneQuestionDiv;

}

export function initAddQuestionButton(questionsDiv) {
    let addQuestionButton = document.getElementById('addQuestionButton');

    addQuestionButton.onclick = () => {
        questionsDiv.appendChild(generateEmptySingleQuestionDiv());
    }
}