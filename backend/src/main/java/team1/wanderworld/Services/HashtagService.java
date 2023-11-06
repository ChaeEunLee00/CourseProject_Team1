package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Repositories.HashtagRepository;

@Service
public class HashtagService {
    private HashtagRepository hashtagRepository;

    @Autowired
    public HashtagService(HashtagRepository hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }

    public Hashtag createOrUpdateHashtag(String tag) {
        Hashtag hashtag = hashtagRepository.findByTag(tag);
        if(hashtag == null) {
            hashtag = new Hashtag();
            hashtag.setTag(tag);
            hashtagRepository.save(hashtag);
        }
        return hashtag;
    }
}
