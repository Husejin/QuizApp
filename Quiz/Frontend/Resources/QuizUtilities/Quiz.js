class Quiz {
    private _id;
    private _title;
    private _alternateImage;
    private _questions;
    private _order;


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get alternateImage() {
        return this._alternateImage;
    }

    set alternateImage(value) {
        this._alternateImage = value;
    }

    get questions() {
        return this._questions;
    }

    set questions(value) {
        this._questions = value;
    }

    get order() {
        return this._order;
    }

    set order(value) {
        this._order = value;
    }

    constructor(id, title, alternateImage, questions, order) {
        this._id = id;
        this._title = title;
        this._alternateImage = alternateImage;
        this._questions = questions;
        this._order = order;
    }
}