import org.apache.ibatis.jdbc.ScriptRunner;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.SQLException;

public class Main {

    public static void reloadDatabase() throws SQLException, FileNotFoundException {
        Connection dbConnection = DBConnector.getConnection();
        ScriptRunner sr = new ScriptRunner(dbConnection);
        Reader reader = new BufferedReader(new FileReader("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\QuizApp\\Quiz\\DatabaseGenerator\\dbScripts\\bootUp.sql"));
        sr.runScript(reader);
        dbConnection.close();
    }
    public static void main(String[] args) throws SQLException, FileNotFoundException {
        reloadDatabase();
    }
}
