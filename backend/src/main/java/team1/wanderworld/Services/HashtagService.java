package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.HashtagRepository;
import team1.wanderworld.Repositories.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HashtagService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private HashtagRepository hashtagRepository;

    public List<Hashtag> getAllHashtags() {
        return hashtagRepository.findAll();
    }

    public Optional<Hashtag> getHashtagByName(String name) {
        return hashtagRepository.findByName(name);
    }

    public Hashtag createHashtag(String name) {
        Hashtag hashtag = new Hashtag();
        hashtag.setName(name);
        return hashtagRepository.save(hashtag);
    }

    public Hashtag getOrCreateHashtag(String name) {
        Optional<Hashtag> existingHashtag = hashtagRepository.findByName(name);

        return existingHashtag.orElseGet(() -> {
            Hashtag newHashtag = new Hashtag();
            newHashtag.setName(name);
            return hashtagRepository.save(newHashtag);
        });
    }

    public void connectHashtagToPost(Hashtag hashtag, Post post) {
        hashtag.getPostIdList().add(post.getId());
        hashtag.setCount(hashtag.getPostIdList().size());
        hashtagRepository.save(hashtag);

        post.getHashtags().add(hashtag.getName());
        postRepository.save(post);
    }

    public List<Hashtag> getTop5Hashtags() {
        return hashtagRepository.findTop5ByOrderByCountDesc();
    }
}
