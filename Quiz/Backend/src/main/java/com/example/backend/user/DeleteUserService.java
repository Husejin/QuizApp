package com.example.backend.user;

import com.example.backend.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DeleteUserService {
    private static Connection connection;

    public static void deleteUser(int userId) throws SQLException {
        connection = DBConnector.getConnection();
        String deleteUserString = "DELETE FROM users WHERE id=?";
        PreparedStatement deleteUserQuery = connection.prepareStatement(deleteUserString);
        deleteUserQuery.setInt(1, userId);
        deleteUserQuery.executeUpdate();
        connection.close();

    }
}
