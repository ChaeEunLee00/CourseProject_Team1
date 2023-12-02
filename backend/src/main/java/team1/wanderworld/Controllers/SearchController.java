package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.SearchRepository;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class SearchController {
    @Autowired
    SearchRepository searchRepo;

    @GetMapping("/search/posts/{text}")
    @CrossOrigin
    public List<Post> searchPosts(@PathVariable("text")  String text)
    {
        return searchRepo.FindInPosts(text);
    }
    @GetMapping("/search/users/{text}")
    @CrossOrigin
    public List<User> searchUsers(@PathVariable("text")  String text)
    {
        return searchRepo.FindInUsers(text);
    }
}

