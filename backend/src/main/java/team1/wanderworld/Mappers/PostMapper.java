package team1.wanderworld.Mappers;

import org.mapstruct.Mapper;
import team1.wanderworld.Dtos.PostDto;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Repositories.UserRepository;
import team1.wanderworld.Services.UserService;

import java.util.List;


@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postCreateDtoToPost(PostDto.CreateDto requestBody);

    Post postPutDtoToPost(PostDto.PutDto requestBody);

    PostDto.PostResponseDto postToPostResponseDto(Post post);

    List<PostDto.GetAllResponseDto> postsToGetAllResponseDtos(List<Post> posts);

    PostDto.GetAllResponseDto postToGetAllResponseDto(Post post);
//    default PostDto.GetAllResponseDto postToGetAllResponseDto(Post post){
//        if(post == null){
//            return null;
//        }
//        PostDto.GetAllResponseDto postGetAllResponseDto = new PostDto.GetAllResponseDto();
//        postGetAllResponseDto.setId(post.getId());
//        postGetAllResponseDto.setUser(userIdToPostUserDto(post.getUserId()));
//        postGetAllResponseDto.setContent(post.getContent());
//        postGetAllResponseDto.setCity(post.getCity());
//        postGetAllResponseDto.setDuration(post.getDuration());
//        postGetAllResponseDto.setLikenum(post.getLikenum());
//        postGetAllResponseDto.setHashtags(hashtagIdsToPostHashtagDtos(post.getHashtags()));
//        postGetAllResponseDto.setPictures(post.getPictures());
//
//        return postGetAllResponseDto;
//    }

//    default PostDto.PostUserDto userIdToPostUserDto(String userId) {
//        UserRepository.
//        PostDto.PostUserDto postUserDto = new PostDto.PostUserDto();
//        postUserDto.setId();
//        postUserDto.setImageurl();
//        postUserDto.getImageurl();
//        return postUserDto;
//    }
}