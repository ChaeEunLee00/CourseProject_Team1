package team1.wanderworld.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;

import java.util.List;

@Repository
public interface SearchRepository extends MongoRepository<Post, String> {
    // text search를 위한 커스텀 쿼리 메소드 정의
    // content 필드를 대상으로 텍스트 검색
    @Query("{'$text': {'$search': ?0}}")
    List<Post> findByContentTextSearch(String keyword);
    // username 필드를 대상으로 텍스트 검색
    @Query("{'$text': {'$search': ?0}}")
    List<User> findByUsername(String keyword);
}
