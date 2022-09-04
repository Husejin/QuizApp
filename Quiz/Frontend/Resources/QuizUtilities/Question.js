export class Question{
    id;
    questionText;
    answers;
    maxTime;
    value;
    quizId;

    constructor(id, questionText, answers, maxTime, value, quizId) {
        this.id = id;
        this.questionText = questionText;
        this.answers = answers;
        this.maxTime = maxTime;
        this.value = value;
        this.quizId = quizId;
    }
}
