package team1.wanderworld.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import team1.wanderworld.Dtos.PostDto;
import team1.wanderworld.Models.Comment;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.CommentRepository;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.Services.CommentService;


import java.util.List;
import java.util.Map;

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

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String postId, @RequestBody Comment comment) {
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        comment.setUserId(userId);
        Comment savedComment = commentService.addComment(postId, comment);
        return ResponseEntity.ok(savedComment);
    }
    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentRepository.findByPostId(postId);
    }
    @DeleteMapping("/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable String commentId) {
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        commentService.deleteComment(userId, commentId);
    }

    // comment edit
    @PutMapping("/comments/{commentId}/edit")
    public ResponseEntity putPost(@PathVariable String commentId, @RequestBody Comment comment){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        comment.setId(commentId);
        Comment updatedComment = commentService.updateComment(userId,comment);
        return ResponseEntity.ok(updatedComment);
    }
/*
    @PostMapping("/comments/create")
    public Comment createComment(@RequestBody Comment comment) {
        // Save the comment to the database
        return commentRepository.save(comment);
    }


 */
}

