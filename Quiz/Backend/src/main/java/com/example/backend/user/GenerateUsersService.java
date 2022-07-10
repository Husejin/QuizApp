package com.example.backend.user;

import com.example.backend.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class GenerateUsersService {
    private static Connection connection;

    public static List<UserEntity> generateUsers(String limit, String offset) throws SQLException {
        connection = DBConnector.getConnection();
        List<UserEntity> fetchedUsers = new ArrayList<>();
        String generateUsersString = "SELECT * FROM USERS LIMIT ? OFFSET ?";
        PreparedStatement generateUsersQuery = connection.prepareStatement(generateUsersString);
        generateUsersQuery.setInt(1, Integer.parseInt(limit));
        generateUsersQuery.setInt(2, Integer.parseInt(offset));
        ResultSet result = generateUsersQuery.executeQuery();
        while (result.next()) {
            fetchedUsers.add(UserMapper.asUserEntity(result));
        }
        connection.close();
        return fetchedUsers;
    }

    public static UserEntity generateSpecificUser(int userId) throws SQLException {
        connection = DBConnector.getConnection();
        String generateUserString = "SELECT * FROM USERS WHERE id=?";
        PreparedStatement generateUserQuery = connection.prepareStatement(generateUserString);
        generateUserQuery.setInt(1, userId);
        ResultSet result = generateUserQuery.executeQuery();
        UserEntity userEntity = null;
        if (result.next()) {
            userEntity = UserMapper.asUserEntity(result);
        }
        connection.close();
        return userEntity;
    }
}
