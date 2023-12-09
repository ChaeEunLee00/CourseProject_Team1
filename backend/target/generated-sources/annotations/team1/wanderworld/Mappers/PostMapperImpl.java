package team1.wanderworld.Mappers;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import team1.wanderworld.Dtos.PostDto.CreateDto;
import team1.wanderworld.Dtos.PostDto.PostResponseDto;
import team1.wanderworld.Dtos.PostDto.PutDto;
import team1.wanderworld.Models.Post;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-09T14:50:08+0900",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.36.0.v20231030-1524, environment: Java 17.0.9 (Eclipse Adoptium)"
)
@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public Post postCreateDtoToPost(CreateDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Post post = new Post();

        post.setCity( requestBody.getCity() );
        post.setContent( requestBody.getContent() );
        List<String> list = requestBody.getDestinations();
        if ( list != null ) {
            post.setDestinations( new ArrayList<String>( list ) );
        }
        post.setDuration( requestBody.getDuration() );
        List<String> list1 = requestBody.getPictures();
        if ( list1 != null ) {
            post.setPictures( new ArrayList<String>( list1 ) );
        }
        post.setUsername( requestBody.getUsername() );

        return post;
    }

    @Override
    public Post postPutDtoToPost(PutDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Post post = new Post();

        post.setCity( requestBody.getCity() );
        post.setContent( requestBody.getContent() );
        List<String> list = requestBody.getDestinations();
        if ( list != null ) {
            post.setDestinations( new ArrayList<String>( list ) );
        }
        post.setDuration( requestBody.getDuration() );
        post.setId( requestBody.getId() );
        List<String> list1 = requestBody.getPictures();
        if ( list1 != null ) {
            post.setPictures( new ArrayList<String>( list1 ) );
        }
        post.setUsername( requestBody.getUsername() );

        return post;
    }

    @Override
    public PostResponseDto postToPostResponseDto(Post post) {
        if ( post == null ) {
            return null;
        }

        PostResponseDto postResponseDto = new PostResponseDto();

        postResponseDto.setCity( post.getCity() );
        postResponseDto.setContent( post.getContent() );
        List<String> list = post.getDestinations();
        if ( list != null ) {
            postResponseDto.setDestinations( new ArrayList<String>( list ) );
        }
        postResponseDto.setDuration( post.getDuration() );
        postResponseDto.setId( post.getId() );
        List<String> list1 = post.getPictures();
        if ( list1 != null ) {
            postResponseDto.setPictures( new ArrayList<String>( list1 ) );
        }
        postResponseDto.setUsername( post.getUsername() );

        return postResponseDto;
    }
}
