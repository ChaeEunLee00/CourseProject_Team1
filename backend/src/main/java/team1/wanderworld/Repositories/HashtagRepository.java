package team1.wanderworld.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import team1.wanderworld.Models.Hashtag;

import java.util.List;
import java.util.Optional;

public interface HashtagRepository extends MongoRepository<Hashtag, String> {
    Optional<Hashtag> findByName(String name);
    List<Hashtag> findTop5ByOrderByCountDesc();
}
