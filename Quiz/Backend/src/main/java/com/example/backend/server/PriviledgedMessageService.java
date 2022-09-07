package com.example.backend.server;

import com.example.backend.question.QuestionEntity;
import com.example.backend.quiz.QuizEntity;
import com.example.backend.quiz.QuizzesService;
import org.apache.commons.lang3.RandomStringUtils;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PriviledgedMessageService {

    private static String generateQuizPin(List<QuizControl> currentQuizzes) {
        String newPin = RandomStringUtils.randomAlphanumeric(6);
        List<String> existingPins = currentQuizzes.stream().map(QuizControl::getQuizPin).toList();
        while (existingPins.contains(newPin)) {
            newPin = RandomStringUtils.randomAlphanumeric(6);
        }
        return newPin;
    }

    public static Message handleMessage(Message message, List<QuizControl> currentQuizzes, Map<String, Session> mappedSessions, Session session) {
        switch (message.getMessageType()) {
            case START -> {
                String newPin = generateQuizPin(currentQuizzes);
                QuizControl quizControl = new QuizControl();
                quizControl.setQuizAdmin(session.getId());
                quizControl.setCurrentQuestion(-1);
                quizControl.setQuizPin(newPin);
                quizControl.setLeaderBoard(new ArrayList<>());
                quizControl.setQuizId(message.getQuizId());
                currentQuizzes.add(quizControl);
                message.setQuizPin(newPin);
                return message;
            }
            case NEXT_QUESTION -> {
                QuizControl currentQuiz = currentQuizzes.stream().filter(quizControl -> quizControl.getQuizAdmin().equals(session.getId())).findFirst().orElse(null);
                if (currentQuiz == null) {
                    message.setResponseState(ResponseState.FAILURE);
                    return message;
                }
                try {
                    QuizEntity currentQuizEntity = QuizzesService.getQuizById(currentQuiz.getQuizId());
                    currentQuiz.setCurrentQuestion(currentQuiz.getCurrentQuestion() + 1);
                    if (currentQuizEntity != null) {
                        List<String> userNamesInCurrentQuiz = currentQuiz.getLeaderBoard().stream().map(LeaderBoardEntry::getUsername).toList();
                        List<Session> currentPlayerSessions = mappedSessions.entrySet().stream().filter(stringSessionEntry ->
                                userNamesInCurrentQuiz.contains(stringSessionEntry.getKey())
                        ).map(Map.Entry::getValue).toList();
                        List<QuestionEntity> questions = currentQuizEntity.getQuestions();
                        if (currentQuiz.getCurrentQuestion() >= currentQuizEntity.getOrder().size()) {
                            message.setMessageType(MessageType.LEADERBOARD);
                            message.setResponseState(ResponseState.SUCCESS);
                            message.setLeaderBoard(currentQuiz.getLeaderBoard());
                            currentPlayerSessions.forEach(playerSession -> {
                                try {
                                    playerSession.getBasicRemote().sendObject(message);
                                } catch (IOException | EncodeException e) {
                                    e.printStackTrace();
                                }
                            });
                            return message;
                        }
                        Double nextQuestionId = currentQuizEntity.getOrder().get(currentQuiz.getCurrentQuestion());
                        QuestionEntity nextQuestion = questions.stream().filter(questionEntity -> Double.parseDouble(String.valueOf(questionEntity.getId())) == nextQuestionId).findFirst().orElse(null);
                        if (nextQuestion != null) {
                            message.setQuestion(nextQuestion);
                            message.setMessageType(MessageType.NEXT_QUESTION);
                            message.setResponseState(ResponseState.SUCCESS);

                            currentPlayerSessions.forEach(playerSession -> {
                                try {
                                    playerSession.getBasicRemote().sendObject(message);
                                } catch (IOException | EncodeException e) {
                                    e.printStackTrace();
                                }
                            });
                        } else
                            message.setResponseState(ResponseState.FAILURE);
                    }

                } catch (SQLException e) {
                    e.printStackTrace();
                }

            }
        }
        return message;
    }

}
