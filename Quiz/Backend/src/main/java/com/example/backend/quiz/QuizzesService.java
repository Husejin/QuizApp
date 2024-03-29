package com.example.backend.quiz;

import com.example.backend.DBConnector;
import com.example.backend.question.QuestionEntity;
import com.example.backend.question.QuestionService;
import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;


public class QuizzesService {

    private static Connection connection;

    public static List<QuizEntity> getAllQuizzes() throws SQLException {

        connection = DBConnector.getConnection();
        String getAllQuizzesString = "SELECT quiz.id, quiz.title, quiz.image, q.questiontext, q.answers, q.maxtime, q.value, quiz.order, q.id FROM quiz INNER JOIN question q on quiz.id = q.quizID";
        PreparedStatement getAllQuizzesQuery = connection.prepareStatement(getAllQuizzesString);
        ResultSet queryResults = getAllQuizzesQuery.executeQuery();
        List<QuizEntity> quizEntities = QuizMapper.toQuizList(queryResults);
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
        String getQuizByIdString = "SELECT quiz.id, quiz.title, quiz.image, q.questiontext, q.answers, q.maxtime, q.value, quiz.order, q.id FROM quiz INNER JOIN question q on quiz.id = q.quizID WHERE quizID=?";
        PreparedStatement getQuizByIdQuery = connection.prepareStatement(getQuizByIdString);
        getQuizByIdQuery.setInt(1, id);
        ResultSet queryResults = getQuizByIdQuery.executeQuery();
        List<QuizEntity> quizEntities = QuizMapper.toQuizList(queryResults);
        connection.close();
        if (quizEntities.isEmpty())
            return null;
        return quizEntities.get(0);
    }

    public static void deleteQuiz(Integer quizId) throws SQLException {
        connection = DBConnector.getConnection();
        String deleteQuestionsByQuizId = "DELETE FROM question WHERE quizID=?";
        PreparedStatement deleteQuestionByQuizIdQuery = connection.prepareStatement(deleteQuestionsByQuizId);
        deleteQuestionByQuizIdQuery.setInt(1, quizId);
        deleteQuestionByQuizIdQuery.executeUpdate();
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
        updateQuizQuery.setBytes(2, Base64.getDecoder().decode(quizEntity.getAlternateImage()));
        updateQuizQuery.setInt(3, quizEntity.getId());
        List<QuestionEntity> compareQuestions = QuestionService.getQuestionsByQuizId(quizEntity.getId());
        List<QuestionEntity> deletedQuestions = compareQuestions.stream().filter(questionEntity -> !quizEntity.getQuestions().contains(questionEntity)).toList();

        List<QuestionEntity> newQuestions = quizEntity.getQuestions().stream().filter(questionEntity -> questionEntity.getId() == null).toList();
        newQuestions.forEach(QuestionService::createQuestion);
        deletedQuestions.forEach(QuestionService::deleteQuestion);
        quizEntity.getQuestions().stream().filter(questionEntity -> questionEntity.getId() != null).forEach(QuestionService::updateQuestion);
        updateQuizQuery.executeUpdate();
        connection.close();
        return quizEntity;
    }

    public static QuizEntity createQuiz(QuizEntity quizEntity) throws SQLException {
        connection = DBConnector.getConnection();
        String createQuizString = "INSERT INTO quiz VALUES( null,?,?,?);";
        PreparedStatement createQuizQuery = connection.prepareStatement(createQuizString);
        createQuizQuery.setString(1, quizEntity.getTitle());
        createQuizQuery.setBytes(2, Base64.getDecoder().decode(quizEntity.getAlternateImage()));
        createQuizQuery.setString(3, "[]");
        createQuizQuery.executeUpdate();
        String getLastId = "SELECT @@IDENTITY";
        ResultSet resultSet = connection.prepareStatement(getLastId).executeQuery();
        resultSet.next();
        Integer lastIndex = resultSet.getInt(1);
        connection.close();
        quizEntity.getQuestions().forEach(questionEntity -> questionEntity.setQuizId(lastIndex));
        List<Integer> addedIndexes = quizEntity.getQuestions().stream().map(QuestionService::createQuestion).toList();
        connection = DBConnector.getConnection();
        String updateOrderOfQuestions = "UPDATE quiz SET `order`=? WHERE id=?";
        PreparedStatement updateOrder = connection.prepareStatement(updateOrderOfQuestions);
        updateOrder.setString(1, String.valueOf(addedIndexes));
        updateOrder.setInt(2, lastIndex);
        updateOrder.executeUpdate();
        connection.close();

        return quizEntity;
    }


}
