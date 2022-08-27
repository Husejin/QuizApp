package com.example.backend.server;

import com.example.backend.question.QuestionEntity;
import static com.example.backend.user.UserRoles.UserRole;

public class Message {
    private UserRole userRole;
    private String quizPin;
    private String userName;
    private Boolean proceedToNextQuestion;
    private QuestionEntity questionToCheck;
    private MessageType messageType;
    private ResponseState responseState;
    private Integer quizId;
    private Integer playerCount;

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    public Integer getPlayerCount() {
        return playerCount;
    }

    public void setPlayerCount(Integer playerCount) {
        this.playerCount = playerCount;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getQuizPin() {
        return quizPin;
    }

    public void setQuizPin(String quizPin) {
        this.quizPin = quizPin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Boolean getProceedToNextQuestion() {
        return proceedToNextQuestion;
    }

    public void setProceedToNextQuestion(Boolean proceedToNextQuestion) {
        this.proceedToNextQuestion = proceedToNextQuestion;
    }

    public QuestionEntity getQuestionToCheck() {
        return questionToCheck;
    }

    public void setQuestionToCheck(QuestionEntity questionToCheck) {
        this.questionToCheck = questionToCheck;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public ResponseState getResponseState() {
        return responseState;
    }

    public void setResponseState(ResponseState responseState) {
        this.responseState = responseState;
    }

    @Override
    public String toString() {
        return "Message{" +
                "userRole='" + userRole + '\'' +
                ", quizPin='" + quizPin + '\'' +
                ", userName='" + userName + '\'' +
                ", proceedToNextQuestion=" + proceedToNextQuestion +
                ", questionToCheck=" + questionToCheck +
                ", messageType=" + messageType +
                '}';
    }
}
