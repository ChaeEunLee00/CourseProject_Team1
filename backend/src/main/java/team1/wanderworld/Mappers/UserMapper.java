package team1.wanderworld.Mappers;

import org.mapstruct.Mapper;
import team1.wanderworld.Dtos.UserDto;
import team1.wanderworld.Models.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserDto.PostDto requestBody);

    User userPutDtoToUser(UserDto.PutDto requestBody);

    UserDto.UserResponseDto userToUserResponseDto(User user);


}