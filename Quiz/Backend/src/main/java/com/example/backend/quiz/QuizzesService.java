package com.example.backend.quiz;

import com.example.backend.DBConnector;
import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.FileReader;
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
        response.setContentType("text/html");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJsonTree(quizEntities));
    }

}
