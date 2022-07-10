package com.example.backend.user;

import com.example.backend.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RegisterUserService {
    private static Connection connection;

    public static boolean registerUser(UserEntity userToCreate) throws SQLException {
        connection = DBConnector.getConnection();
        if (!checkIfUserExists(userToCreate, connection)) {
            String registerUserString = "INSERT INTO users VALUES (null,?,?,?);";
            PreparedStatement registerUserQuery = connection.prepareStatement(registerUserString);
            registerUserQuery.setString(1, userToCreate.getUsername());
            registerUserQuery.setString(2, userToCreate.getPassword());
            registerUserQuery.setInt(3, userToCreate.getRole().ordinal());
            registerUserQuery.executeUpdate();
            connection.close();
            return true;
        }
        connection.close();
        return false;
    }

    private static boolean checkIfUserExists(UserEntity userEntity, Connection connection) throws SQLException {
        String checkForUserString = "SELECT COUNT(*) FROM users WHERE username = ?";
        PreparedStatement checkForUserQuery = connection.prepareStatement(checkForUserString);
        checkForUserQuery.setString(1, userEntity.getUsername());
        ResultSet result = checkForUserQuery.executeQuery();
        result.next();
        return result.getInt(1) != 0;
    }
}
