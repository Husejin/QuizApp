package com.example.backend.question;

import com.example.backend.DBConnector;
import com.example.backend.quiz.AnswerEntity;
import com.google.gson.Gson;
import com.google.protobuf.Empty;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

public class QuestionService {
    private static Connection connection;

    public static void updateQuestion(QuestionEntity questionEntity) {

        try {
            connection = DBConnector.getConnection();
            Gson gson = new Gson();
            String updateQuestionString = "UPDATE question SET questionText=?,answers=?,maxTime=?,value=? WHERE id=?";
            PreparedStatement updateQuestionQuery = connection.prepareStatement(updateQuestionString);
            updateQuestionQuery.setString(1, questionEntity.getQuestionText());
            updateQuestionQuery.setString(2, gson.toJsonTree(questionEntity.getAnswers()).toString());
            updateQuestionQuery.setInt(3, questionEntity.getMaxTime());
            updateQuestionQuery.setInt(4, questionEntity.getValue());
            updateQuestionQuery.setInt(5, questionEntity.getId());
            updateQuestionQuery.executeUpdate();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static int createQuestion(QuestionEntity questionEntity) {
        try {
            connection = DBConnector.getConnection();
            Gson gson = new Gson();
            String createQuestionString = "INSERT INTO  question VALUES (null,?,?,?,?,?);";
            PreparedStatement updateQuestionQuery = connection.prepareStatement(createQuestionString);
            updateQuestionQuery.setString(1, questionEntity.getQuestionText());
            updateQuestionQuery.setString(2, gson.toJsonTree(questionEntity.getAnswers()).toString());
            updateQuestionQuery.setInt(3, questionEntity.getMaxTime());
            updateQuestionQuery.setInt(4, questionEntity.getValue());
            if (questionEntity.getQuizId() != null)
                updateQuestionQuery.setInt(5, questionEntity.getQuizId());
            else
                updateQuestionQuery.setNull(5,java.sql.Types.NULL);
            updateQuestionQuery.executeUpdate();
            String getLastId = "SELECT @@IDENTITY";
            ResultSet resultSet = connection.prepareStatement(getLastId).executeQuery();
            resultSet.next();
            Integer lastIndex = resultSet.getInt(1);
            connection.close();
            return lastIndex;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static void deleteQuestion(QuestionEntity questionEntity) {
        try {
            connection = DBConnector.getConnection();
            String getQuestionString = "DELETE FROM question WHERE id = ?;";
            PreparedStatement deleteQuestionQuery = connection.prepareStatement(getQuestionString);
            deleteQuestionQuery.setInt(1, questionEntity.getId());
            deleteQuestionQuery.executeUpdate();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static boolean checkIfQuestionCorrect(QuestionEntity questionEntity) {
        try {
            connection = DBConnector.getConnection();

            String getQuestionString = "SELECT * FROM question WHERE id = ?;";
            PreparedStatement getQuestionQuery = connection.prepareStatement(getQuestionString);
            getQuestionQuery.setInt(1, questionEntity.getId());
            ResultSet results = getQuestionQuery.executeQuery();
            QuestionEntity compareQuestion = QuestionMapper.toQuestionEntity(results);
            connection.close();
            return checkAnswers(compareQuestion.getAnswers(), questionEntity.getAnswers());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static List<QuestionEntity> getQuestionsByQuizId(Integer quizId) {
        try {
            connection = DBConnector.getConnection();
            String getAllQuestionsForQuiz = "SELECT * FROM question WHERE quizID = ?;";
            PreparedStatement getQuestionQuery = connection.prepareStatement(getAllQuestionsForQuiz);
            getQuestionQuery.setInt(1, quizId);
            ResultSet results = getQuestionQuery.executeQuery();
            List<QuestionEntity> questionEntities = QuestionMapper.toQuestionEntities(results);
            connection.close();
            return questionEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    private static boolean checkAnswers(List<AnswerEntity> focusAnswers, List<AnswerEntity> testAnswers) {
        boolean isCorrectAnswer = true;
        for (int i = 0; i < focusAnswers.size(); i++) {
            if (!focusAnswers.get(i).equals(testAnswers.get(i))) {
                isCorrectAnswer = false;
                break;
            }
        }
        return isCorrectAnswer;
    }
}
