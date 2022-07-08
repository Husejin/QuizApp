package com.example.backend.quiz;

import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(value = "/update_quiz")
public class UpdateSpecificQuiz extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        Gson gson = new Gson();
        QuizEntity quizEntity = gson.fromJson(req.getParameter("quizEntity"),QuizEntity.class);
        try {
            QuizzesService.writeToResponse(QuizzesService.updateQuiz(quizEntity),resp);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
