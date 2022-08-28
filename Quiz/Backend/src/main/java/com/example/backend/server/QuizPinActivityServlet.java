package com.example.backend.server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(value = "/checkQuizPin")
public class QuizPinActivityServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String quizPin = req.getParameter("quizPin");
        PrintWriter responseWriter = resp.getWriter();
        Gson response = new Gson();
        responseWriter.println(QuizServer.isQuizActive(quizPin) ? response.toJson(ResponseState.SUCCESS) : response.toJson(ResponseState.FAILURE));
    }
}
