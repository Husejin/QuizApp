package com.example.backend.server;

import com.example.backend.user.UserRoles;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;


import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint(value = "/quiz_server", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class QuizServer {

    public QuizServer() {
    }

    private static List<QuizControl> currentQuizzes = new ArrayList<>();
    private static Map<String, Session> mappedSessions = new HashMap<>();

    private final static Set<Session> sessions = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("Added new session: " + session.getId());
    }

    @OnMessage
    public Message handleTextMessage(Message message, Session session) throws EncodeException, IOException {
        if (UserRoles.isAdminRole(message.getUserRole())) {
            return PriviledgedMessageService.handleMessage(message, currentQuizzes,mappedSessions, session);
        }
        return NonPriviledgedMessageService.handleMessage(message, currentQuizzes, mappedSessions, session, sessions);
    }

    private Session getThisUserSession(String userName) {
        return mappedSessions.get(userName);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("Session removed: " + session.getId());
    }

    public static boolean isQuizActive(String quizPin) {
        return currentQuizzes.stream().anyMatch(quizControl -> quizControl.getQuizPin().equals(quizPin));
    }
}