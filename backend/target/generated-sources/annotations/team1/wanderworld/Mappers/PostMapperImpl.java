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
    date = "2023-11-10T15:41:22+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.9 (Amazon.com Inc.)"
)
@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public Post postCreateDtoToPost(CreateDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Post post = new Post();

        post.setUsername( requestBody.getUsername() );
        post.setContent( requestBody.getContent() );
        post.setCity( requestBody.getCity() );
        post.setDuration( requestBody.getDuration() );
        List<String> list = requestBody.getDestinations();
        if ( list != null ) {
            post.setDestinations( new ArrayList<String>( list ) );
        }
        List<String> list1 = requestBody.getPictures();
        if ( list1 != null ) {
            post.setPictures( new ArrayList<String>( list1 ) );
        }

        return post;
    }

    @Override
    public Post postPutDtoToPost(PutDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Post post = new Post();

        post.setId( requestBody.getId() );
        post.setUsername( requestBody.getUsername() );
        post.setContent( requestBody.getContent() );
        post.setCity( requestBody.getCity() );
        post.setDuration( requestBody.getDuration() );
        List<String> list = requestBody.getDestinations();
        if ( list != null ) {
            post.setDestinations( new ArrayList<String>( list ) );
        }
        List<String> list1 = requestBody.getPictures();
        if ( list1 != null ) {
            post.setPictures( new ArrayList<String>( list1 ) );
        }

        return post;
    }

    @Override
    public PostResponseDto postToPostResponseDto(Post post) {
        if ( post == null ) {
            return null;
        }

        PostResponseDto postResponseDto = new PostResponseDto();

        postResponseDto.setId( post.getId() );
        postResponseDto.setUsername( post.getUsername() );
        postResponseDto.setContent( post.getContent() );
        postResponseDto.setCity( post.getCity() );
        postResponseDto.setDuration( post.getDuration() );
        List<String> list = post.getDestinations();
        if ( list != null ) {
            postResponseDto.setDestinations( new ArrayList<String>( list ) );
        }
        List<String> list1 = post.getPictures();
        if ( list1 != null ) {
            postResponseDto.setPictures( new ArrayList<String>( list1 ) );
        }

        return postResponseDto;
    }
}
