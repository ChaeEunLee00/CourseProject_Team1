package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.PostRepository;

import java.util.List;

@Service
public class PostService {

    private PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> searchPostsByKeyword(String keyword) {
        // 검색어(keyword)를 이용하여 게시물을 찾는 로직
        return postRepository.findByContentContaining(keyword);
    }
}
