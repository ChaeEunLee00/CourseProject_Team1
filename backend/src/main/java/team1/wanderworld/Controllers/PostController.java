package team1.wanderworld.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import team1.wanderworld.Dtos.PostDto;
import org.springframework.web.bind.annotation.*;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Services.PostService;
import team1.wanderworld.Mappers.PostMapper;

import java.util.List;
import java.util.Map;

@Slf4j
@Validated
@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;

    public PostController(PostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }

    // 포스트 작성
    @PostMapping
    public ResponseEntity createPost(@Valid @RequestBody PostDto.CreateDto requestBody){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        requestBody.setUserId(userId);
        Post createdPost = postService.createPost(postMapper.postCreateDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(createdPost), HttpStatus.CREATED);
    }

    // 포스트 수정
    @PutMapping("/{post-id}/edit")
    public ResponseEntity putPost(@PathVariable("post-id") String postId,
                                  @Valid @RequestBody PostDto.PutDto requestBody){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        requestBody.setId(postId);
        Post updatedPost = postService.updatePost(userId,postMapper.postPutDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
    }

    // 포스트 삭제
    @DeleteMapping("/{post-id}/delete")
    public ResponseEntity deletePost(@PathVariable("post-id") String postId){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        postService.deletePost(userId,postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 포스트 조회
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") String postId){
        Post foundPost = postService.findPost(postId);
        return new ResponseEntity<>(postMapper.postToPostResponseDto(foundPost), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts() {
        List<Post> posts = postService.findPosts();

        List<PostDto.GetAllResponseDto> postResponseDtos  = postMapper.postsToGetAllResponseDtos(posts);
        return new ResponseEntity<>(postResponseDtos, HttpStatus.OK);
    }
}
