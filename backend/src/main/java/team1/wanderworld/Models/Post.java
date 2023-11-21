package team1.wanderworld.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.TextIndexed;


import java.util.ArrayList;
import java.util.List;
import java.util.regex.MatchResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "post")
public class Post {
    // id, username, destinations[], content,, city, duration, likenum, hashtag[],  pics[], comentID[]
    @Id
    private String id;
    private String username; //user에서 username 수정하면 포스트에서도 바뀌어야될듯
    @TextIndexed
    private String content;
    private String city;
    private Integer duration; //hours
    private Integer likenum;
    private List<String> destinations = new ArrayList<>();
    private List<String> hashtags = new ArrayList<>();
    private List<String> pictures = new ArrayList<>(); //picture url ?
    private List<Comment> comments = new ArrayList<>();

    // #로 시작하는 String을 content에서 추출하여 리턴
    public List<String> extractHashtags() {
        Pattern pattern = Pattern.compile("#\\w+");
        Matcher matcher = pattern.matcher(content);

        return matcher.results()
                .map(MatchResult::group)
                .collect(Collectors.toList());
    }
    public void addComment(Comment comment) {
        this.comments.add(comment);
    }
}