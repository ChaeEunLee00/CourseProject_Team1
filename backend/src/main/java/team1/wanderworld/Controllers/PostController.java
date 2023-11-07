package team1.wanderworld.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Services.PostService;

@Slf4j
@Validated
@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 포스트 작성
    @PostMapping
    public ResponseEntity postPost(@Valid @RequestBody PostDto.PostDto requestBody){
        Post createdPost = postService.createPost(postMapper.postPostDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(createdPost), HttpStatus.CREATED);
    }


    // 포스트 수정
    @PutMapping("/{post-id}/edit")
    public ResponseEntity putPost(@PathVariable("post-id") String postId,
                                  @Valid @RequestBody PostDto.PutDto requestBody
//                                    ,Authentication authentication
    ){

//        Map<String,Object> principal = (Map) authentication.getPrincipal();
//        long jwtPostId = ((Number) principal.get("postId")).longValue();
//
//        if(jwtPostId != (postId)){
//            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//        }
        requestBody.setId(postId);
        Post updatedPost = postService.updatePost(postMapper.postPutDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
    }


    // [회원프로필 조회]
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") String postId){
        Post foundPost = postService.findPost(postId);
        return new ResponseEntity<>(postMapper.postToPostResponseDto(foundPost), HttpStatus.OK);
    }



    // [회원탈퇴]
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") String postId
//            ,Authentication authentication
    ){

//        Map<String,Object> principal = (Map) authentication.getPrincipal();
//        long jwtPostId = ((Number) principal.get("postId")).longValue();
//
//        if(jwtPostId != postId){
//            return new ResponseEntity(HttpStatus.FORBIDDEN);
//        }
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
