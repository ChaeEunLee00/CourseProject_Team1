package team1.wanderworld.Models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "user" )
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String password;
    private String imageurl;
    private List<String> followerlist = new ArrayList<>(); //follower와 ManyToMany 관계 -> id 값만 저장
    private List<String> followinglist = new ArrayList<>(); //following과 ManyToMany 관계 관계 -> id 값만 저장
    private List<Post> likedposts = new ArrayList<>(); //포스트와 oneToMany 관계 관계 -> id 값만 저장 - 아직 안함
    private List<Post> myposts = new ArrayList<>(); //post와 oneToMany관계 관계 -> id 값만 저장 - 아직 안함

}

