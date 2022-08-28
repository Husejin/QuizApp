DROP
DATABASE IF EXISTS QuizApp;

CREATE
DATABASE QuizApp;
USE
QuizApp;

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz`
(
    `id`    INT AUTO_INCREMENT,
    `title` TEXT(500),
    `image` LONGBLOB,
    `order` JSON DEFAULT NULL,
    PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS question;
CREATE TABLE `question`
(
    `id`           INT AUTO_INCREMENT,
    `questionText` TEXT(500),
    `answers`      JSON DEFAULT NULL,
    `maxTime`      INT  DEFAULT 0,
    `value`        INT  DEFAULT 0,
    `quizID`       INT  DEFAULT 0,
    FOREIGN KEY (`quizID`) REFERENCES quiz (id),
    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS users;
CREATE TABLE `users`
(
    `id`       INT(20) AUTO_INCREMENT,
    `username` TEXT(100),
    `password` TEXT(100),
    `role`     TEXT(100),
    PRIMARY KEY (`id`)
);

