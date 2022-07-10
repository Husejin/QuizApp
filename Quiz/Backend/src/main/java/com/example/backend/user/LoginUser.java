package com.example.backend.user;



import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;


@WebServlet(value = "/login")
public class LoginUser extends HttpServlet {

    public void doGet(
            HttpServletRequest request,
            HttpServletResponse response) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        try {
            LoginResponse loginResponse= LoginUserService.checkUserCredentials(username,password);
            CommonUserService.generateLoginResponse(loginResponse,response);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }

    }

}
