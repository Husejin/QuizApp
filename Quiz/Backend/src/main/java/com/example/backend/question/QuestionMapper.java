package com.example.backend.question;

import com.example.backend.quiz.AnswerEntity;
import com.google.gson.Gson;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class QuestionMapper {

    public static QuestionEntity toQuestionEntity(ResultSet results) throws SQLException {
        QuestionEntity question = new QuestionEntity();
        if (results.next()) {
            Integer id = results.getInt(1);
            String questionText = results.getString(2);
            String answersString = results.getString(3);
            Gson gson = new Gson();
            AnswerEntity[] answers = gson.fromJson(answersString, AnswerEntity[].class);
            Integer maxTime = results.getInt(4);
            Integer value = results.getInt(5);
            Integer quizId = results.getInt(6);

            question.setId(id);
            question.setQuestionText(questionText);
            question.setAnswers(Arrays.stream(answers).toList());
            question.setMaxTime(maxTime);
            question.setValue(value);
            question.setQuizId(quizId);

        }
        return question;
    }

    public static List<QuestionEntity> toQuestionEntities(ResultSet results) throws SQLException {
        List<QuestionEntity> questionEntityList = new ArrayList<>();
        while (results.next()) {
            QuestionEntity question = new QuestionEntity();
            Integer id = results.getInt(1);
            String questionText = results.getString(2);
            String answersString = results.getString(3);
            Gson gson = new Gson();
            AnswerEntity[] answers = gson.fromJson(answersString, AnswerEntity[].class);
            Integer maxTime = results.getInt(4);
            Integer value = results.getInt(5);
            Integer quizId = results.getInt(6);

            question.setId(id);
            question.setQuestionText(questionText);
            question.setAnswers(Arrays.stream(answers).toList());
            question.setMaxTime(maxTime);
            question.setValue(value);
            question.setQuizId(quizId);
            questionEntityList.add(question);
        }
        return questionEntityList;
    }

}
