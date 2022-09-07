import {generateSingleQuizDiv} from "../pageServices/quizService.js"

let allQuizzesDiv = document.getElementById('allQuizzes');

$.get('http://localhost:8080/Backend_war_exploded/all_quizzes',{},
    (data) => {
    console.log(data);
        for (const quiz of data) {
            allQuizzesDiv.appendChild(generateSingleQuizDiv(quiz));
        }
    })
