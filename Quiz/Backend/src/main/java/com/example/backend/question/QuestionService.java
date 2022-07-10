package com.example.backend.question;

import com.example.backend.DBConnector;
import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class QuestionService {
    private static Connection connection;

    public static void updateQuestion(QuestionEntity questionEntity) {

        try {
            connection = DBConnector.getConnection();
            Gson gson = new Gson();
            String updateQuestionString = "UPDATE question SET questionText=?,answers=?,maxTime=?,value=? WHERE id=?";
            PreparedStatement updateQuestionQuery = connection.prepareStatement(updateQuestionString);
            updateQuestionQuery.setString(1, questionEntity.getQuestionText());
            updateQuestionQuery.setString(2, gson.toJsonTree(questionEntity.getAnswers()).getAsString());
            updateQuestionQuery.setInt(3, questionEntity.getMaxTime());
            updateQuestionQuery.setInt(4, questionEntity.getValue());
            updateQuestionQuery.setInt(5, questionEntity.getId());
            updateQuestionQuery.executeUpdate();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static void createQuestion(QuestionEntity questionEntity){
        try {
            connection = DBConnector.getConnection();
            Gson gson = new Gson();
            String createQuestionString = "INSERT INTO  question VALUES (null,?,?,?,?,?);";
            PreparedStatement updateQuestionQuery = connection.prepareStatement(createQuestionString);
            updateQuestionQuery.setString(1, questionEntity.getQuestionText());
            updateQuestionQuery.setString(2, gson.toJsonTree(questionEntity.getAnswers()).getAsString());
            updateQuestionQuery.setInt(3, questionEntity.getMaxTime());
            updateQuestionQuery.setInt(4, questionEntity.getValue());
            updateQuestionQuery.setInt(5, questionEntity.getQuizId());
            updateQuestionQuery.executeUpdate();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
