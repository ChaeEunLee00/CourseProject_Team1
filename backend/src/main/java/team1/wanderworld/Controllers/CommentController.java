package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import team1.wanderworld.Models.Comment;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.CommentRepository;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.Services.CommentService;


import java.util.List;

@RestController
//@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:8080")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    private final CommentService commentService;

    public CommentController(CommentRepository commentRepository, CommentService commentService) {
        this.commentRepository = commentRepository;
        this.commentService = commentService;
    }

    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentRepository.findByPostId(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String postId, @RequestBody Comment comment) {
        boolean check = commentService.isValidComment(comment);
        if (!check) {
            return ResponseEntity.badRequest().build();
        }
        // Check if the post exists
        if (!postRepository.existsById(postId)) {
            return ResponseEntity.notFound().build();
        }

        comment.setPostId(postId);
        Comment savedComment = commentRepository.save(comment);

        // Update the corresponding Post object with the new comment
        Post post = postRepository.existsById(postId) ? postRepository.findById(postId).get() : null;
        if (post != null) {
            post.addComment(savedComment);
            postRepository.save(post);
        }
        return ResponseEntity.ok(savedComment);
    }
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

