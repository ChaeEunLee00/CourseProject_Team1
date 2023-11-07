package team1.wanderworld.Repositories;

import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;

import java.util.Optional;

public class PostRepository {
    Optional<Post> findByPostname(String postName);
    Optional<Post> findById(String id);
}
