package team1.wanderworld.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "post")
public class Post {
    // id, username, destinations[], content,, city, duration, likenum, hashtag[],  pics[], comentID[]
    @Id
    private String id;
    private String username; //user에서 username 수정하면 포스트에서도 바뀌어야될듯
    private String content;
    private String city;
    private Integer duration; //hours
    private Integer likenum;
    private List<String> destinations = new ArrayList<>();
//    private List<Hashtag> hashtags = new ArrayList<>();
    private List<String> pictures = new ArrayList<>(); //picture url ?
    private List<Comment> comments = new ArrayList<>();
}
