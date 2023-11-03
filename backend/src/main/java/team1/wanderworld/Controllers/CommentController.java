package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import team1.wanderworld.Models.Comment;
import team1.wanderworld.Repositories.CommentRepository;

@RestController
//@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:8080")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;
    @DeleteMapping("/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable String commentId) {
        try {
            commentRepository.deleteById(commentId);
        } catch (EmptyResultDataAccessException e) {
            // Comment not found, return 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found", e);
        }
    }

/*
    @PostMapping("/comments/create")
    public Comment createComment(@RequestBody Comment comment) {
        // Save the comment to the database
        return commentRepository.save(comment);
    }


 */
}

