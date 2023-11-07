package team1.wanderworld.Services;

import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.Optional;

public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // 포스트 작성
    public Post createPost(Post post) {
        Post savePost = postRepository.save(post);
        return savePost;
    }


    // 포스트 수정
    public Post updatePost(Post post) {
        // id, username, destinations[], content,, city, duration, likenum, hashtag[],  pics[], comentID[]

        Optional.ofNullable(post.getContent())
                .ifPresent(name -> post.setContent(content));
        Optional.ofNullable(post.getUsername())
                .ifPresent(name -> post.setUsername(username));

        return postRepository.save(post);
    }

    // 포스트 삭제
    public void deletePost(String postId) {
        postRepository.delete(post);
    }
}
