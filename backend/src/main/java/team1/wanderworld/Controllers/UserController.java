package team1.wanderworld.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team1.wanderworld.Dtos.UserDto;
import team1.wanderworld.Mappers.UserMapper;
import team1.wanderworld.Models.User;
import team1.wanderworld.Services.UserService;

import java.util.Map;

@Slf4j
@Validated
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    // [회원가입]
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.PostDto requestBody){
        User createdUser = userService.createUser(userMapper.userPostDtoToUser(requestBody));
        return new ResponseEntity<>(userMapper.userToUserResponseDto(createdUser), HttpStatus.CREATED);
    }

    // [회원프로필 수정]
    @PutMapping("/edit")
    public ResponseEntity putUser(@Valid @RequestBody UserDto.PutDto requestBody){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        requestBody.setId(userId);
        User updatedUser = userService.updateUser(userMapper.userPutDtoToUser(requestBody));
        return new ResponseEntity<>(userMapper.userToUserResponseDto(updatedUser), HttpStatus.OK);
    }

    // [회원프로필 조회]
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") String userId){
        User foundUser = userService.findUser(userId);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(foundUser), HttpStatus.OK);
    }

    // [회원탈퇴]
    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // [팔로우]
    @PostMapping("/{follow-id}/follow")
    public ResponseEntity followUser(@PathVariable("follow-id") String followId){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        User user = userService.followUser(userId,followId);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(user), HttpStatus.OK);
    }

    // [팔로우 취소]
    @PostMapping("/{unfollow-id}/unfollow")
    public ResponseEntity unfollowUser(@PathVariable("unfollow-id") String unfollowId){
        Map<String,Object> principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = (String) principal.get("id");

        User user = userService.unfollowUser(userId,unfollowId);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(user), HttpStatus.OK);
    }


//    // [팔로잉] [내가 팔로우 하는 USER 목록 보기], [나를 팔로우 하는 USER 목록 보기],
//       [내가 생성한 글 목록 조회],[내가 좋아요 누른 POST 목록 보기]

//    @GetMapping
//    public ResponseEntity getUsers(@Positive @RequestParam int page,
//                                   @Positive @RequestParam int size){
//        Page<User> userPage = userService.findUsers(page-1,size);
//        List<User> userList = userPage.getContent();
//        List<UsersAllResponseDtos> usersAllResponseDtos = userMapper.userToUsersAllResponseDtos(userList);
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(usersAllResponseDtos,userPage),HttpStatus.OK);
//    }

}

