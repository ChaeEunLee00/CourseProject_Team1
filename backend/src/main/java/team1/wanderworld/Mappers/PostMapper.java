package team1.wanderworld.Mappers;

import org.mapstruct.Mapper;
import team1.wanderworld.Dtos.PostDto;
import team1.wanderworld.Models.Post;


@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postCreateDtoToPost(PostDto.CreateDto requestBody);

    Post postPutDtoToPost(PostDto.PutDto requestBody);

    PostDto.PostResponseDto postToPostResponseDto(Post post);


}