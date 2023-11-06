package team1.wanderworld.Repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import team1.wanderworld.Models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,Long> {
    Optional<User> findByUsername(String userName);
    Optional<User> findById(String id);
}

