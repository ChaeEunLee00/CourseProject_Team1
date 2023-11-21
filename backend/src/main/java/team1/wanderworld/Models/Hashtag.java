package team1.wanderworld.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.TextIndexed;



import java.util.List;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "hashtag")
public class Hashtag {
    // name, post ID list[], count
    @Id
    private String id;
    @TextIndexed
    private String name;
    private List<String> postIdList = new ArrayList<>();
    private long count; // postIdList의 length를 구하면 된다.
}
