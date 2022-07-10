package com.example.backend.quiz;

import com.example.backend.DBConnector;
import com.example.backend.question.QuestionService;
import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.List;


public class QuizzesService {

    private static Connection connection;

    public static List<QuizEntity> getAllQuizzes() throws SQLException {

        connection = DBConnector.getConnection();
        String getAllQuizzesString = "SELECT quiz.id, quiz.title, quiz.image, q.questiontext, q.answers, q.maxtime, q.value FROM quiz INNER JOIN question q on quiz.id = q.quizID";
        PreparedStatement getAllQuizzesQuery = connection.prepareStatement(getAllQuizzesString);
        ResultSet queryResults = getAllQuizzesQuery.executeQuery();
        List<QuizEntity> quizEntities = QuizMapper.resultSetToQuizzes(queryResults);
        connection.close();
        return quizEntities;
    }

    public static void writeToResponse(List<QuizEntity> quizEntities, HttpServletResponse response) throws IOException {
        response.setContentType("text/json");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJsonTree(quizEntities));
    }

    public static void writeToResponse(QuizEntity quizEntity, HttpServletResponse response) throws IOException {
        response.setContentType("text/json");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(quizEntity));
    }

    public static QuizEntity getQuizById(Integer id) throws SQLException {
        connection = DBConnector.getConnection();
        String getQuizByIdString = "SELECT quiz.id, quiz.title, quiz.image, q.questiontext, q.answers, q.maxtime, q.value FROM quiz INNER JOIN question q on quiz.id = q.quizID WHERE quizID=?";
        PreparedStatement getQuizByIdQuery = connection.prepareStatement(getQuizByIdString);
        getQuizByIdQuery.setInt(1, id);
        ResultSet queryResults = getQuizByIdQuery.executeQuery();
        List<QuizEntity> quizEntities = QuizMapper.resultSetToQuizzes(queryResults);
        connection.close();
        if (quizEntities.isEmpty())
            return null;
        return quizEntities.get(0);
    }

    public static void deleteQuiz(Integer quizId) throws SQLException {
        connection = DBConnector.getConnection();
        String deleteQuizByIdString = "DELETE FROM quiz WHERE id=?";
        PreparedStatement deleteQuizById = connection.prepareStatement(deleteQuizByIdString);
        deleteQuizById.setInt(1, quizId);
        deleteQuizById.executeUpdate();
        connection.close();
    }

    public static QuizEntity updateQuiz(QuizEntity quizEntity) throws SQLException {
        connection = DBConnector.getConnection();
        String updateQuizString = "UPDATE quiz SET title = ?,image=? WHERE id=?";
        PreparedStatement updateQuizQuery = connection.prepareStatement(updateQuizString);
        updateQuizQuery.setString(1, quizEntity.getTitle());
        updateQuizQuery.setString(2, quizEntity.getAlternateImage());
        updateQuizQuery.setInt(3, quizEntity.getId());
        quizEntity.getQuestions().forEach(QuestionService::updateQuestion);
        connection.close();
        return quizEntity;
    }

    public static QuizEntity createQuiz(QuizEntity quizEntity) throws SQLException {
        connection = DBConnector.getConnection();
        String createQuizString = "INSERT INTO quiz VALUES( null,?,?);";
        PreparedStatement createQuizQuery = connection.prepareStatement(createQuizString);
        createQuizQuery.setString(1, quizEntity.getTitle());
        createQuizQuery.setString(2, quizEntity.getAlternateImage());
        createQuizQuery.executeUpdate();
        quizEntity.getQuestions().forEach(QuestionService::createQuestion);
        connection.close();
        return quizEntity;
    }


}
