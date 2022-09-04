package com.example.backend.user;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet(value = "/delete_user")
public class DeleteUser extends HttpServlet {


    public void doPost(HttpServletRequest req, HttpServletResponse resp) {
        int userId = Integer.parseInt(req.getParameter("userId"));
        try {
            DeleteUserService.deleteUser(userId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
