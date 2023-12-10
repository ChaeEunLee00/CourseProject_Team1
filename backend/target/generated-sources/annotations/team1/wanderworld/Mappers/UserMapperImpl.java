package team1.wanderworld.Mappers;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import team1.wanderworld.Dtos.UserDto.PostDto;
import team1.wanderworld.Dtos.UserDto.PutDto;
import team1.wanderworld.Dtos.UserDto.UserResponseDto;
import team1.wanderworld.Models.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-09T14:50:08+0900",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231030-1524, environment: Java 17.0.9 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(PostDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setImageurl( requestBody.getImageurl() );
        user.setName( requestBody.getName() );
        user.setPassword( requestBody.getPassword() );
        user.setUsername( requestBody.getUsername() );

        return user;
    }

    @Override
    public User userPutDtoToUser(PutDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setId( requestBody.getId() );
        user.setImageurl( requestBody.getImageurl() );
        user.setName( requestBody.getName() );
        user.setPassword( requestBody.getPassword() );
        user.setUsername( requestBody.getUsername() );

        return user;
    }

    @Override
    public UserResponseDto userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId( user.getId() );
        userResponseDto.setImageurl( user.getImageurl() );
        userResponseDto.setName( user.getName() );
        userResponseDto.setUsername( user.getUsername() );

        return userResponseDto;
    }
}
