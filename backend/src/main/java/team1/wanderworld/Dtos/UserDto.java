package team1.wanderworld.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


public class UserDto {
    // [회원가입 요청 DTO]
    @Getter
    public static class PostDto{
        @NotBlank
        private String name;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        private String imageurl;
    }

    // [프로필수정 요청 DTO]
    @Getter
    @Setter
    @AllArgsConstructor
    public static class PutDto{
        private String id;
        private String name;
        private String username;
        private String password;
        private String imageurl;
    }

    // [회원가입 응답 DTO]
    @Getter
    @Setter
    public static class UserResponseDto{
        private String id;
        private String name;
        private String username;
        private String imageurl;
        private List<String> followerlist;
        private List<String> followinglist;
    }

//    @Getter
//    @Setter
//    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
//    public static class UserGetResponseDto{
//        private long userId;
//        private String displayName;
//        @JsonProperty("about_me")
//        private String aboutMe;
//        private String location;
//        @JsonProperty("image_url")
//        private String imageUrl;
//        private LocalDateTime creationDate;
//        private int questionCount;
//        private int answerCount;
//        private List<UsersQuestionResponseDto> questions;
//        private List<UsersAnswerResponseDto> answers;
//        private List<UsersTagResponseDto.UserTagResponseDtos> tags;
//    }
}


