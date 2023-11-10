package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Services.HashtagService;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Autowired
    private HashtagService hashtagService;

    // 포스트 작성
    public Post createPost(Post post) {
        Post savePost = postRepository.save(post);

        // content에서 hashtag 추출
        List<String> hashtags = post.extractHashtags();

        // hashtag와 post 연결
        for (String hashtagName : hashtags) {
            Hashtag hashtag = hashtagService.getOrCreateHashtag(hashtagName);
            hashtagService.connectHashtagToPost(hashtag, post);
        }

        return savePost;
    }


    // 포스트 수정
    public Post updatePost(Post post) {
        // id, username, destinations[], content,, city, duration, likenum, hashtag[],  pics[], comentID[]

        Post findPost = findVerifiedUser(post.getId());
        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getUsername())
                .ifPresent(username -> findPost.setUsername(username));

        return postRepository.save(findPost);
    }
//
    // 포스트 삭제
    public void deletePost(String postId) {
        Post post = findVerifiedUser(postId);
        postRepository.delete(post);
    }

    // Post id matching
    private Post findVerifiedUser(String userId) {
        Optional<Post> optionalPost = postRepository.findById(userId);
        Post findPost = optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findPost;
    }
}
