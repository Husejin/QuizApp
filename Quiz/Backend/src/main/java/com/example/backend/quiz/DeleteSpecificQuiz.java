package com.example.backend.quiz;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet(value = "/delete_quiz")
public class DeleteSpecificQuiz extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        Integer quizId = Integer.parseInt(req.getParameter("id"));
        try {
            QuizzesService.deleteQuiz(quizId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
