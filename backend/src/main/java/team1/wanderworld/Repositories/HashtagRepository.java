package team1.wanderworld.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import team1.wanderworld.Models.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    // Hashtag 엔티티와 상호작용하기 위한 데이터베이스 리포지터리
    Hashtag findByTag(String tag);
}
