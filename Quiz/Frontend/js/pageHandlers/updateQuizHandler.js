import {generateSingleQuizDiv} from "../pageServices/quizService.js";

const params = new URLSearchParams(window.location.search);
$.get('http://localhost:8080/Backend_war_exploded/get_quiz', {id: params.get('id')},
    (data) => {
    console.log(data);
        let title = document.getElementById('quizTitle');
        title.value = data.title;

        let image = document.getElementById('image');
        image.src = data.image;


    })

