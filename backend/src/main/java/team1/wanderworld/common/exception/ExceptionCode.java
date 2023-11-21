package team1.wanderworld.common.exception;

import lombok.Getter;


public enum ExceptionCode {
    USER_NOT_FOUND(404,"User not found"),
    POST_NOT_FOUND(404,"Post not found"),
    USER_EXIST(409, "User exists"),
    POST_USER_DIFFERENT(409, "Post User Different");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
