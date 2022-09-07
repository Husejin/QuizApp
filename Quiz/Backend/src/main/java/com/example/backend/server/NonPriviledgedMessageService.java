package com.example.backend.server;

import com.example.backend.question.QuestionService;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class NonPriviledgedMessageService {
    public static Message handleMessage(Message message, List<QuizControl> currentQuizzes, Map<String, Session> mappedSessions, Session session, Set<Session> sessions) throws EncodeException, IOException {
        QuizControl quiz = currentQuizzes.stream().filter(quizControl -> quizControl.getQuizPin().equals(message.getQuizPin())).findFirst().orElse(null);
        if (quiz == null) {
            message.setResponseState(ResponseState.FAILURE);
            return message;
        }
        switch (message.getMessageType()) {
            case JOIN -> {
                LeaderBoardEntry leaderBoardEntry = new LeaderBoardEntry();
                leaderBoardEntry.setPoints(0);
                leaderBoardEntry.setUsername(message.getUserName());
                quiz.getLeaderBoard().add(leaderBoardEntry);
                mappedSessions.put(message.getUserName(), session);
                List<String> userNamesInCurrentQuiz = quiz.getLeaderBoard().stream().map(LeaderBoardEntry::getUsername).toList();
                System.out.println(quiz.getQuizAdmin());
                System.out.println(sessions);
                Session hostSession = sessions.stream().filter(session1 -> session1.getId().equals(quiz.getQuizAdmin())).findFirst().orElse(null);
                List<Session> currentPlayerSessions = mappedSessions.entrySet().stream().filter(stringSessionEntry ->
                        userNamesInCurrentQuiz.contains(stringSessionEntry.getKey())
                ).map(Map.Entry::getValue).toList();
                Message playerCountMessage = new Message();
                playerCountMessage.setMessageType(MessageType.PLAYER_COUNT);
                playerCountMessage.setResponseState(ResponseState.SUCCESS);
                playerCountMessage.setPlayerCount(currentPlayerSessions.size());

                assert hostSession != null;
                hostSession.getBasicRemote().sendObject(playerCountMessage);
                currentPlayerSessions.forEach(playerSession -> {
                    try {
                        playerSession.getBasicRemote().sendObject(playerCountMessage);
                    } catch (IOException | EncodeException e) {
                        e.printStackTrace();
                    }
                });
            }
            case ANSWER -> {
                if (QuestionService.checkIfQuestionCorrect(message.getQuestion())) {
                    LeaderBoardEntry boardEntry = quiz.getLeaderBoard().stream().filter(leaderBoardEntry -> leaderBoardEntry.getUsername().equals(message.getUserName())).findFirst().orElse(null);
                    if (boardEntry != null)
                        boardEntry.setPoints(boardEntry.getPoints() + message.getQuestion().getValue());
                }
                message.setMessageType(MessageType.ANSWER);
            }
        }
        message.setResponseState(ResponseState.SUCCESS);
        return message;
    }

}
