package team1.wanderworld.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import team1.wanderworld.Models.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Post 엔티티와 상호 작용하기 위한 데이터베이스 레포지토리
    List<Post> findByContentContaining(String keyword);
}
