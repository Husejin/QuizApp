import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {

    private static String url = "jdbc:mysql://localhost:3306/youtube_rankings";
    private static String username = "root";
    private static String password = "password";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(url, username, password);
        } catch (
                SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
        return connection;
    }
}
