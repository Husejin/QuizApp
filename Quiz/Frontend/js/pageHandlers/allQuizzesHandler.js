
let allQuizzesDiv = document.getElementById('allQuizzes');

$.get('http://localhost:8080/Backend_war_exploded/all_quizzes',{},
    (data) => {
        for (const quiz of data) {
            console.log(quiz)
        }
    })
