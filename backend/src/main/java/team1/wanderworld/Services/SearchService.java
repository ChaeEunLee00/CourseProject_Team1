package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.SearchRepository;

import java.util.List;

@Service
public class SearchService {
    @Autowired
    private SearchRepository searchRepository;

    public List<Post> searchPosts(String keyword) {
        // Post에서 검색
        List<Post> posts = searchRepository.findByContentTextSearch(keyword);
        return posts;
    }

    public List<User> searchUsers(String keyword) {
        // User에서 검색
        List<User> users = searchRepository.findByUsername(keyword);
        return users;
    }
}
