package team1.wanderworld.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import team1.wanderworld.Models.Post;

import java.util.Optional;

public interface PostRepository extends MongoRepository<Post,Long> {
    //Optional<Post> findByPostname(String postName);
    Optional<Post> findById(String id);
}
