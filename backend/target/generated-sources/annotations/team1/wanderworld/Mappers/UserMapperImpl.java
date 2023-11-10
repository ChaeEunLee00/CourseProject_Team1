package team1.wanderworld.Mappers;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import team1.wanderworld.Dtos.UserDto.PostDto;
import team1.wanderworld.Dtos.UserDto.PutDto;
import team1.wanderworld.Dtos.UserDto.UserResponseDto;
import team1.wanderworld.Models.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-10T15:41:22+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.9 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(PostDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setName( requestBody.getName() );
        user.setUsername( requestBody.getUsername() );
        user.setPassword( requestBody.getPassword() );
        user.setImageurl( requestBody.getImageurl() );

        return user;
    }

    @Override
    public User userPutDtoToUser(PutDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setId( requestBody.getId() );
        user.setName( requestBody.getName() );
        user.setUsername( requestBody.getUsername() );
        user.setPassword( requestBody.getPassword() );
        user.setImageurl( requestBody.getImageurl() );

        return user;
    }

    @Override
    public UserResponseDto userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId( user.getId() );
        userResponseDto.setName( user.getName() );
        userResponseDto.setUsername( user.getUsername() );
        userResponseDto.setImageurl( user.getImageurl() );

        return userResponseDto;
    }
}
