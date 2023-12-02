package team1.wanderworld.Services;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import team1.wanderworld.Models.Comment;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.CommentRepository;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.Repositories.UserRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserService userService;
    private final PostService postService;

    public CommentService(CommentRepository commentRepository
            ,PostRepository postRepository
            ,UserService userService
            ,PostService postService
    ) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public Comment addComment(String postId, Comment comment){
        // check user is valid
        userService.findVerifiedUser(comment.getUserId());

        // check whether comment is valid
        isValidComment(comment);

        // Check if the post exists
        if (!postRepository.existsById(postId)) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }

        comment.setPostId(postId);
        Comment savedComment = commentRepository.save(comment);

        // Update the corresponding Post object with the new comment
        Post post = postRepository.existsById(postId) ? postRepository.findById(postId).get() : null;
        if (post != null) {
            post.addComment(savedComment.getId());
            postRepository.save(post);
        }
        return savedComment;
    }

    public void deleteComment(String userId, String commentId){

        userService.findVerifiedUser(userId); //check user is verified
        Comment findComment = findVerifiedComment(commentId); //check comment is verified
        Post findPost= postService.findVerifiedPost(findComment.getPostId()); // Check if the post exists

        // Update the corresponding Post object with the comment
        List<String> comments = findPost.getComments();
        comments.remove(commentId);
        findPost.setComments(comments);
        postRepository.save(findPost);

        //check userId is equal to userId of comment
        if(!userId.equals(findComment.getUserId())){
            throw new BusinessLogicException(ExceptionCode.COMMENT_USER_DIFFERENT);
        }
        commentRepository.delete(findComment);
    }

    // comment edit
    public Comment updateComment(String userId, Comment comment){

        //존재하는 user인지 확인
        userService.findVerifiedUser(userId);
        //존재하는 comment인지 확인
        Comment findComment = findVerifiedComment(comment.getId());

        // 수정하려는 user와 post 작성자인 user가 일치하는지 확인
        if(!userId.equals(findComment.getUserId())){
            throw new BusinessLogicException(ExceptionCode.COMMENT_USER_DIFFERENT);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    private Comment findVerifiedComment(String commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    public void validateComment(Comment comment) {
        // check content of comment
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
