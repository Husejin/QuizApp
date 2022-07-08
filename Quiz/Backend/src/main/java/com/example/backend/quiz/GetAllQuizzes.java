package com.example.backend.quiz;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet (value = "/all_quizzes")
public class GetAllQuizzes extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {

        try {
            QuizzesService.writeToResponse(QuizzesService.getAllQuizzes(), resp);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
