package com.pettalk.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    PETSITTER_NOT_FOUND(404, "PetSitter not found"),
    CHAT_NOT_FOUND(404, "Chat not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ANSWER_EXISTS(409, "Answer exists"),
    QUESTION_EXISTS(409, "Question exists"),
    COMMENT_EXISTS(409, "Comment exists"),
    QUESTION_VOTE_EXISTS(409, "QuestionVote exists"),
    ANSWER_VOTE_EXISTS(409, "AnswerVote exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    PASSWORD_NOT_MATCHED(409, "Password not matched");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
