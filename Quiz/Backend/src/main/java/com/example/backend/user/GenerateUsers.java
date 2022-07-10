package com.example.backend.user;


import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;


@WebServlet(value = "/getUsers")
public class GenerateUsers extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        try {
            CommonUserService.generateUserResponse(GenerateUsersService.generateUsers(req.getParameter("limit"), req.getParameter("offset")), resp);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
