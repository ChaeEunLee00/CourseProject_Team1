package team1.wanderworld.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Services.HashtagService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hashtags")
@CrossOrigin(origins = "http://localhost:8080")
public class HashtagController {
    @Autowired
    private HashtagService hashtagService;

    @GetMapping
    public ResponseEntity<List<Hashtag>> getAllHashtags() {
        List<Hashtag> hashtags = hashtagService.getAllHashtags();
        return new ResponseEntity<>(hashtags, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Hashtag> getHashtagByName(@PathVariable String name) {
        return hashtagService.getHashtagByName(name)
                .map(hashtag -> new ResponseEntity<>(hashtag, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{name}")
    public ResponseEntity<Hashtag> createHashtag(@PathVariable String name) {
        Hashtag hashtag = hashtagService.createHashtag(name);
        return new ResponseEntity<>(hashtag, HttpStatus.CREATED);
    }
    @GetMapping("/top5")
    public ResponseEntity<List<String>> getTop5HashtagNames() {
        List<Hashtag> top5Hashtags = hashtagService.getTop5Hashtags();
        List<String> top5HashtagNames = top5Hashtags.stream()
                .map(Hashtag::getName)
                .collect(Collectors.toList());

        return new ResponseEntity<>(top5HashtagNames, HttpStatus.OK);
    }
}
