package com.example.backend.quiz;

import com.example.backend.question.QuestionEntity;
import com.mysql.cj.xdevapi.JsonArray;

import java.util.List;

public class QuizEntity {
    private Integer id;
    private String title;
    private String alternateImage;
    private List<QuestionEntity> questions;
    private List<Integer> order;

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

    public List<Integer> getOrder() {
        return order;
    }

    public void setOrder(List<Integer> order) {
        this.order = order;
    }
}
