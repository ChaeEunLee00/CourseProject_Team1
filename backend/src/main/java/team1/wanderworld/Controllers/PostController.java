package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Services.HashtagService;

@Controller
public class PostController {
    private HashtagService hashtagService;

    @Autowired
    public PostController(HashtagService hashtagService) {
        this.hashtagService = hashtagService;
    }

    @PostMapping("/post")
    @ResponseBody
    public String createPostWithHashtags(@RequestBody String content) {
        // 사용자가 글을 올릴 때 Hashtag 추출하고 처리하는 로직
        String[] words = content.split(" ");
        for (String word : words) {
            if (word.startsWith("#")) {
                String tag = word.substring(1);
                Hashtag hashtag = hashtagService.createOrUpdateHashtag(tag);
                // hashtag와 글을 연결하거나 다른 작업을 수행
            }
        }
        // 글을 저장하고 응답을 반환
        return "글이 성공적으로 저장되었습니다.";
    }
}
