package com.example.backend.user;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class CommonUserService {
    public static void generateUserResponse(UserEntity userEntity, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(userEntity));
    }

    public static void generateUserResponse(List<UserEntity> userEntities, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJsonTree(userEntities));
    }
    public static void generateLoginResponse(LoginResponse loginResponse, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(loginResponse));
    }
}
