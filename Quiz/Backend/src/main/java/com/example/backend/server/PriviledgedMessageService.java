package com.example.backend.server;

import org.apache.commons.lang3.RandomStringUtils;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.List;

public class PriviledgedMessageService {

    private static String generateQuizPin(List<QuizControl> currentQuizzes) {
        String newPin = RandomStringUtils.randomAlphanumeric(6);
        List<String> existingPins = currentQuizzes.stream().map(QuizControl::getQuizPin).toList();
        while (existingPins.contains(newPin)) {
            newPin = RandomStringUtils.randomAlphanumeric(6);
        }
        return newPin;
    }

    public static Message handleMessage(Message message, List<QuizControl> currentQuizzes, Session session) {
        switch (message.getMessageType()) {
            case START -> {
                String newPin = generateQuizPin(currentQuizzes);
                QuizControl quizControl = new QuizControl();
                quizControl.setQuizAdmin(session.getId());
                quizControl.setCurrentQuestion(0);
                quizControl.setQuizPin(newPin);
                quizControl.setLeaderBoard(new ArrayList<>());
                quizControl.setQuizId(message.getQuizId());
                currentQuizzes.add(quizControl);
            }
            case NEXT_QUESTION -> {
                QuizControl currentQuiz = currentQuizzes.stream().filter(quizControl -> quizControl.getQuizAdmin().equals(session.getId())).findFirst().orElse(null);
                if (currentQuiz == null) {
                    message.setResponseState(ResponseState.FAILURE);
                    return message;
                }
                currentQuiz.setCurrentQuestion(currentQuiz.getCurrentQuestion() + 1);
                message.setResponseState(ResponseState.SUCCESS);
            }
        }
        return message;
    }

}
