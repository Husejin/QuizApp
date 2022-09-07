package com.example.backend.user;

import com.example.backend.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import static com.example.backend.user.UserRoles.UserRole;

public class LoginUserService {

    private static Connection dbConnection;

    public static LoginResponse checkUserCredentials(String username, String password) throws SQLException {
        LoginResponse loginResponse = new LoginResponse();
        dbConnection = DBConnector.getConnection();
        String getUserCredentials = "SELECT * FROM users WHERE username = ? AND password = ?;";
        PreparedStatement userCredentialsQuery = dbConnection.prepareStatement(getUserCredentials);
        userCredentialsQuery.setString(1, username);
        userCredentialsQuery.setString(2, password);
        ResultSet matchingUsers = userCredentialsQuery.executeQuery();
        if (matchingUsers.next()) {
            int userRoleIntValue = matchingUsers.getInt(4);
            String userRole = String.valueOf(UserRole.values()[userRoleIntValue]);
            loginResponse.setRole(userRole);
            loginResponse.setStatus("SUCCESS");
            loginResponse.setUserId(matchingUsers.getInt(1));
        }
        return loginResponse;
    }
}

