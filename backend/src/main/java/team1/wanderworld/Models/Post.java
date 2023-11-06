package team1.wanderworld.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    private String content;

    // Getter와 Setter 메서드
}
