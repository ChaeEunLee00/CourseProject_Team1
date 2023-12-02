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
    private final UserService userService;

    public PostService(PostRepository postRepository,
                       UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Autowired
    private HashtagService hashtagService;

    // 포스트 작성
    public Post createPost(Post post) {
        Post savePost = postRepository.save(post);

        //hashtag
        hashtagService.saveHashtag(post.getHashtags(), post.getId());

//        // content에서 hashtag 추출
//        List<String> hashtags = post.extractHashtags();
//
//        // hashtag와 post 연결
//        for (String hashtagName : hashtags) {
//            Hashtag hashtag = hashtagService.getOrCreateHashtag(hashtagName);
//            hashtagService.connectHashtagToPost(hashtag, post);
//        }

        return savePost;
    }


    // 포스트 수정
    public Post updatePost(String userId, Post post) {
        // id, username, destinations[], content,, city, duration, likenum, hashtag[],  pics[], comentID[]

        //존재하는 user인지 확인
        userService.findVerifiedUser(userId);
        //존재하는 post인지 확인
        Post findPost = findVerifiedPost(post.getId());

        // 수정하려는 user와 post 작성자인 user가 일치하는지 확인
        if(!userId.equals(findPost.getUserId())){
            throw new BusinessLogicException(ExceptionCode.POST_USER_DIFFERENT);
        }

        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getHashtags())
                .ifPresent(hashtags -> {
                    findPost.setHashtags(hashtags);
                    hashtagService.updatdHashtag(hashtags, post.getId());}
                    );

        return postRepository.save(findPost);
    }

    // 포스트 삭제
    public void deletePost(String userId, String postId) {
        //존재하는 user인지 확인
        userService.findVerifiedUser(userId);
        //존재하는 post인지 확인
        Post findPost = findVerifiedPost(postId);

        // 수정하려는 user와 post 작성자인 user가 일치하는지 확인
        if(!userId.equals(findPost.getUserId())){
            throw new BusinessLogicException(ExceptionCode.POST_USER_DIFFERENT);
        }
        postRepository.delete(findPost);
    }

    //포스트 조회
    public Post findPost(String postId) {
        Post post = findVerifiedPost(postId);
        return post;
    }

    public List<Post> findPosts() {
        return postRepository.findAll();
    }

    // Post id matching
    private Post findVerifiedPost(String postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post findPost = optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findPost;
    }
}
