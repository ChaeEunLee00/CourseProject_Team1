package team1.wanderworld.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LoginResponseDto {
    private String id;
    private String name;
    private String username;
    private String imageurl;
    private String accessToken;
    private String refreshToken;

}
