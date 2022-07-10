package com.example.backend.user;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(value = "/getUser")
public class GenerateSpecificUser extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int userId = Integer.parseInt(req.getParameter("userId"));
        try {
            CommonUserService.generateUserResponse(GenerateUsersService.generateSpecificUser(userId), resp);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
