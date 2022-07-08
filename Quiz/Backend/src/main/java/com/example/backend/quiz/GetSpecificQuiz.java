package com.example.backend.quiz;



import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(value = "/get_quiz")
public class GetSpecificQuiz extends HttpServlet {


    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        Integer quizId =  Integer.parseInt(req.getParameter("id"));
        try {
            QuizzesService.writeToResponse(QuizzesService.getQuizById(quizId), resp);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
