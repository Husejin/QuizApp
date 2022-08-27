package com.example.backend.user;

import java.util.List;

public class UserRoles {

    public enum UserRole {
        SUPERADMIN,
        EDITOR,
        PLAYER
    }

    public static boolean isAdminRole(UserRole role) {
        return List.of(UserRole.SUPERADMIN, UserRole.EDITOR).contains(role);
    }

}
