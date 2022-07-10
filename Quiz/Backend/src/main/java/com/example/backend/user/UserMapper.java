package com.example.backend.user;


import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper {

    public static UserEntity asUserEntity(ResultSet resultSet) throws SQLException {
        UserEntity userEntity = new UserEntity();
        int id = resultSet.getInt(1);
        String username = resultSet.getString(2);
        String password = resultSet.getString(3);
        UserRoles.UserRole role = UserRoles.UserRole.values()[resultSet.getInt(4)];

        userEntity.setId(id);
        userEntity.setUsername(username);
        userEntity.setPassword(password);
        userEntity.setRole(role);

        return userEntity;
    }
}
