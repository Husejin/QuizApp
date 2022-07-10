package com.example.backend.user;


import com.example.backend.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UpdateUserService {
    private static Connection connection;

    public static void persistUser(UserEntity userEntity) throws SQLException {
        connection = DBConnector.getConnection();
        String updateUserString = "UPDATE users SET username=? , password=?, role=? WHERE id=?;";
        PreparedStatement updateUserQuery = connection.prepareStatement(updateUserString);
        updateUserQuery.setString(1,userEntity.getUsername());
        updateUserQuery.setString(2,userEntity.getPassword());
        updateUserQuery.setInt(3,userEntity.getRole().ordinal());
        updateUserQuery.setInt(4,userEntity.getId());
        updateUserQuery.executeUpdate();
        connection.close();
    }
}
