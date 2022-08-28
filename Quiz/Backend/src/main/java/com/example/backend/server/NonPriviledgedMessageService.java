package com.example.backend.server;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class NonPriviledgedMessageService {
    public static Message handleMessage(Message message, List<QuizControl> currentQuizzes, Map<String, Session> mappedSessions, Session session, Set<Session> sessions) {
        switch (message.getMessageType()) {
            case JOIN -> {
                QuizControl quiz = currentQuizzes.stream().filter(quizControl -> quizControl.getQuizPin().equals(message.getQuizPin())).findFirst().orElse(null);
                if (quiz == null) {
                    message.setResponseState(ResponseState.FAILURE);
                    return message;
                }
                LeaderBoardEntry leaderBoardEntry = new LeaderBoardEntry();
                leaderBoardEntry.setPoints(0);
                leaderBoardEntry.setUsername(message.getUserName());
                quiz.getLeaderBoard().add(leaderBoardEntry);
                mappedSessions.put(message.getUserName(), session);
                List<String> userNamesInCurrentQuiz = quiz.getLeaderBoard().stream().map(LeaderBoardEntry::getUsername).toList();
                List<Session> currentPlayerSessions = mappedSessions.entrySet().stream().filter(stringSessionEntry ->
                        userNamesInCurrentQuiz.contains(stringSessionEntry.getKey())
                ).map(Map.Entry::getValue).toList();
                Message playerCountMessage = new Message();
                playerCountMessage.setMessageType(MessageType.PLAYER_COUNT);
                playerCountMessage.setResponseState(ResponseState.SUCCESS);
                playerCountMessage.setPlayerCount(currentPlayerSessions.size());
                currentPlayerSessions.forEach(playerSession -> {
                    try {
                        playerSession.getBasicRemote().sendObject(playerCountMessage);
                    } catch (IOException | EncodeException e) {
                        e.printStackTrace();
                    }
                });
            }
        }
        message.setResponseState(ResponseState.SUCCESS);
        return message;
    }

}
