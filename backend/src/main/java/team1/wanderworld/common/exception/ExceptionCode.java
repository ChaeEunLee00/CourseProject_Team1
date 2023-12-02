package team1.wanderworld.common.exception;

import lombok.Getter;


public enum ExceptionCode {
    USER_NOT_FOUND(404,"User not found"),
    POST_NOT_FOUND(404,"Post not found"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    USER_EXIST(409, "User exists"),
    POST_USER_DIFFERENT(409, "Post User Different"),
    COMMENT_USER_DIFFERENT(409, "Comment User Different"),
    USER_FOLLOW_SAME(409, "User Follow Same"),
    USER_UNFOLLOW_SAME(409, "User Unfollow Same"),
    USER_FOLLOW_EXIST(409, "User follow Exist"),
    POST_LIKE_EXIST(409, "Post Like Exist"),
    POST_LIKE_NOT_EXIST(409, "Post Like Not Exist");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
