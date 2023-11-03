package team1.wanderworld.Models;
//import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

//@NoArgsConstructor
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;

    @CreatedDate
    private LocalDateTime createdAt;
    //private User user;
    private String content;
    private String postId;

    public Comment(String content) {
        //this.user = user;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    //public User getUser() {return user;}

    public String getContent() {
        return content;
    }
    //public void setUser(User user) {this.user = user;}

    public void setContent(String content) {
        this.content = content;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    //public String getUserId() {return user.getId();}

    //public void setUserId(String userId) {user.setId(userId);}

    public String getText() {
        return content;
    }

    public void setText(String text) {
        this.content = text;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", content='" + content + '\'' +
                ", postId='" + postId + '\'' +
                '}';
    }
}
