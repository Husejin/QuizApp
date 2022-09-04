package com.example.backend.quiz;

import com.example.backend.question.QuestionEntity;
import com.google.gson.Gson;

import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

public class QuizMapper {

    public static List<QuizEntity> toQuizList(ResultSet queryResults) throws SQLException {
        List<QuizEntity> quizEntities = new ArrayList<>();
        while (queryResults.next()) {
            int quizId = queryResults.getInt(1);
            String title = queryResults.getString(2);
            String image = null;
            if (queryResults.getBlob(3) != null) {
                Blob blob = queryResults.getBlob(3);
                byte[] bytes = blob.getBytes(1l, (int) blob.length());
                image = Base64.getEncoder().encodeToString(bytes);
            }
            String questionText = queryResults.getString(4);
            String answersString = queryResults.getString(5);
            Gson gson = new Gson();
            AnswerEntity[] answers = gson.fromJson(answersString, AnswerEntity[].class);
            int maxtime = queryResults.getInt(6);
            int value = queryResults.getInt(7);
            List<Integer> order = gson.fromJson(queryResults.getString(8), List.class);
            int questionId = queryResults.getInt(9);

            List<QuizEntity> firstQuizCollected = quizEntities.stream().filter(q -> q.getId() == quizId).toList();
            QuestionEntity questionEntity = new QuestionEntity();
            questionEntity.setQuestionText(questionText);
            questionEntity.setValue(value);
            questionEntity.setMaxTime(maxtime);
            questionEntity.setAnswers(Arrays.stream(answers).toList());
            questionEntity.setId(questionId);
            questionEntity.setQuizId(quizId);
            if (firstQuizCollected.isEmpty()) {
                QuizEntity quizEntity = new QuizEntity();
                quizEntity.setId(quizId);
                quizEntity.setAlternateImage(image);
                quizEntity.setTitle(title);
                quizEntity.setQuestions(new ArrayList<>());
                quizEntity.getQuestions().add(questionEntity);
                quizEntity.setOrder(order);
                quizEntities.add(quizEntity);

            } else {
                firstQuizCollected.get(0).getQuestions().add(questionEntity);
            }
        }
        return quizEntities;
    }


}
