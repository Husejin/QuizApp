package com.example.backend.user;


import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;


@WebServlet (value = "/registerUser")
public class RegisterUser extends HttpServlet {

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        Gson gson = new Gson();
        UserEntity userToCreate = gson.fromJson(req.getParameter("userInfo"),UserEntity.class);
        try {
            if(!RegisterUserService.registerUser(userToCreate))
            {
                userToCreate.setUsername("#");
            }
            CommonUserService.generateUserResponse(userToCreate,resp);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
