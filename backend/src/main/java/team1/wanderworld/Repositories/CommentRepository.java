package team1.wanderworld.Repositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team1.wanderworld.Models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
    /*
    @PostMapping("/comments")
    Comment createComment(@RequestBody Comment comment);

     */

}
