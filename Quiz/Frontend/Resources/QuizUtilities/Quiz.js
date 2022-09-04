export class Quiz {
     id;
     title;
     alternateImage;
     questions;
     order;

    constructor(id, title, alternateImage, questions, order) {
        this.id = id;
        this.title = title;
        this.alternateImage = alternateImage;
        this.questions = questions;
        this.order = order;
    }
}