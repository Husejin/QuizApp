package com.example.backend.server;

import java.util.List;

public class QuizControl {
    private String quizPin;
    private List<LeaderBoardEntry> leaderBoard;
    private Integer currentQuestion;
    private String quizAdmin;
    private Integer quizId;

    public String getQuizPin() {
        return quizPin;
    }

    public void setQuizPin(String quizPin) {
        this.quizPin = quizPin;
    }

    public List<LeaderBoardEntry> getLeaderBoard() {
        return leaderBoard;
    }

    public void setLeaderBoard(List<LeaderBoardEntry> leaderBoard) {
        this.leaderBoard = leaderBoard;
    }

    public Integer getCurrentQuestion() {
        return currentQuestion;
    }

    public void setCurrentQuestion(Integer currentQuestion) {
        this.currentQuestion = currentQuestion;
    }

    public String getQuizAdmin() {
        return quizAdmin;
    }

    public void setQuizAdmin(String quizAdmin) {
        this.quizAdmin = quizAdmin;
    }

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    @Override
    public String toString() {
        return "QuizControl{" +
                "quizPin='" + quizPin + '\'' +
                ", leaderBoard=" + leaderBoard +
                ", currentQuestion=" + currentQuestion +
                ", quizAdmin='" + quizAdmin + '\'' +
                '}';
    }
}
