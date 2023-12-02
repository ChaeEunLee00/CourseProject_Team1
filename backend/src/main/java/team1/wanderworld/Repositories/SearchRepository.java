package team1.wanderworld.Repositories;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;

import java.util.List;

public interface SearchRepository {
    List<Post> FindInPosts(String text);
    List<User> FindInUsers(String text);
}
