package team1.wanderworld.Services;

import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Comment;
import team1.wanderworld.Repositories.CommentRepository;

@Service
public class CommentService {
    public void validateComment(Comment comment) {
        if (comment.getUser() == null || comment.getUser().getId() == null || comment.getUser().getId().isEmpty()) {
            throw new IllegalArgumentException("User ID must not be null or empty");
        }

        if (comment.getContent() == null || comment.getContent().isEmpty()) {
            throw new IllegalArgumentException("Comment content must not be null or empty");
        }
    }

    public boolean isValidComment(Comment comment) {
        try {
            validateComment(comment);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
