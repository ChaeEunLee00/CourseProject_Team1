package team1.wanderworld.Dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;


public class PostDto {
    // 포스트 작성 요청 DTO
    @Getter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class CreateDto{
        @NotBlank
        private String username;
        private String content;
        @NotBlank
        private String city;
        private Integer duration;
        @NotBlank
        private List<String> destinations;
        private List<String> pictures;
    }

    // 포스트 수정 요청 DTO
    @Getter
    @Setter
    @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PutDto{
        private String id;
        private String username;
        private String content;
        private String city;
        private Integer duration;
        private List<String> destinations;
        private List<String> pictures;
    }

    // 포스트 작성 응답 DTO
    @Getter
    @Setter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostResponseDto{
        private String id;
        private String username;
        private String content;
        private String city;
        private Integer duration;
        private List<String> destinations;
        private List<String> pictures;
    }

//    @Getter
//    @Setter
//    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
//    public static class PostGetResponseDto{
//        private long postId;
//        private String displayName;
//        @JsonProperty("about_me")
//        private String aboutMe;
//        private String location;
//        @JsonProperty("image_url")
//        private String imageUrl;
//        private LocalDateTime creationDate;
//        private int questionCount;
//        private int answerCount;
//        private List<PostsQuestionResponseDto> questions;
//        private List<PostsAnswerResponseDto> answers;
//        private List<PostsTagResponseDto.PostTagResponseDtos> tags;
//    }

//    @Getter
//    @Setter
//    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
//    public static class PostAuthDto{
//        private String id;
//        private String displayName;
//        private String imageUrl;
//    }
}

