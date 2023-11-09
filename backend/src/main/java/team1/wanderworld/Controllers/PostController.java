package team1.wanderworld.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import team1.wanderworld.Dtos.PostDto;
import org.springframework.web.bind.annotation.*;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Services.PostService;
import team1.wanderworld.Mappers.PostMapper;

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
        Post createdPost = postService.createPost(postMapper.postCreateDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(createdPost), HttpStatus.CREATED);
    }

    // 포스트 수정
    @PutMapping("/{post-id}/edit")
    public ResponseEntity putPost(@PathVariable("post-id") String postId,
                                  @Valid @RequestBody PostDto.PutDto requestBody){
        requestBody.setId(postId);
        Post updatedPost = postService.updatePost(postMapper.postPutDtoToPost(requestBody));
        return new ResponseEntity<>(postMapper.postToPostResponseDto(updatedPost), HttpStatus.OK);
    }

    // 포스트 삭제
    @DeleteMapping("/{post-id}/delete")
    public ResponseEntity deletePost(@PathVariable("post-id") String postId){
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
