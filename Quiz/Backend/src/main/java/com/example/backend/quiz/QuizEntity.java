package com.example.backend.quiz;

import com.example.backend.question.QuestionEntity;
import com.mysql.cj.xdevapi.JsonArray;

import java.util.List;

public class QuizEntity {
    private Integer id;
    private String title;
    private String alternateImage;
    private List<QuestionEntity> questions;
    private List<Double> order;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlternateImage() {
        return alternateImage;
    }

    public void setAlternateImage(String alternateImage) {
        this.alternateImage = alternateImage;
    }

    public List<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
    }

    public List<Double> getOrder() {
        return order;
    }

    public void setOrder(List<Double> order) {
        this.order = order;
    }
}
