package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.ResponseBody;

import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Repositories.HashtagRepository;


@RestController
public class HashtagController {
    @Autowired
    private HashtagRepository repository;

    @RequestMapping("/hashtags")
    public Iterable<Hashtag> getHashtags() {
        // 해시태그를 검색하고 반환
        return repository.findAll();
    }
}
