package com.example.backend.question;

import com.example.backend.quiz.AnswerEntity;

import java.util.List;
import java.util.Objects;

public class QuestionEntity {

    private Integer id;
    private String questionText;
    private List<AnswerEntity> answers;
    private Integer maxTime;
    private Integer value;
    private Integer quizId;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<AnswerEntity> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerEntity> answers) {
        this.answers = answers;
    }

    public Integer getMaxTime() {
        return maxTime;
    }

    public void setMaxTime(Integer maxTime) {
        this.maxTime = maxTime;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuestionEntity)) return false;
        QuestionEntity question = (QuestionEntity) o;
        return Objects.equals(getId(), question.getId()) && Objects.equals(getQuestionText(), question.getQuestionText()) && Objects.equals(getAnswers(), question.getAnswers()) && Objects.equals(getMaxTime(), question.getMaxTime()) && Objects.equals(getValue(), question.getValue()) && Objects.equals(getQuizId(), question.getQuizId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getQuestionText(), getAnswers(), getMaxTime(), getValue(), getQuizId());
    }
}
