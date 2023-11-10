package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Services.SearchService;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public ResponseEntity<List<Post>> search(@RequestParam String keyword) {
        List<Post> searchResults = searchService.searchPosts(keyword);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String keyword) {
        List<User> searchResults = searchService.searchUsers(keyword);

        if(!searchResults.isEmpty()) {
            return new ResponseEntity<>(searchResults, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(searchResults, HttpStatus.NOT_FOUND);
        }
    }
}
