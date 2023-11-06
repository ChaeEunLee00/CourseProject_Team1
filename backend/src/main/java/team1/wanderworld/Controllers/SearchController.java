package team1.wanderworld.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Services.PostService;

import java.util.List;

@Controller
public class SearchController {

    private PostService postService;

    @Autowired
    public SearchController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/search")
    public String searchPosts(@RequestParam("keyword") String keyword, Model model) {
        // 사용자가 입력한 검색어로 게시물을 검색하고 결과를 모델에 추가
        List<Post> searchResults = postService.searchPostsByKeyword(keyword);
        model.addAttribute("searchResults", searchResults);
        return "search_results"; // 검색 결과를 표시하는 뷰 페이지로 이동
    }
}
