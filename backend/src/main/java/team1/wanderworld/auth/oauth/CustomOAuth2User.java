package team1.wanderworld.auth.oauth;


import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import team1.wanderworld.Models.User;

import java.util.Collection;
import java.util.Map;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private String id;

    private String username;


    /**
     * Constructs a {@code DefaultOAuth2User} using the provided parameters.
     *
     * @param authorities      the authorities granted to the user
     * @param attributes       the attributes about the user
     * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
     *                         {@link #getAttributes()}
     */
    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            String id,
                            String username) {
        super(authorities, attributes, nameAttributeKey);
        this.id = id;
        this.username = username;
    }

    public static CustomOAuth2User of(User user,
                                      Map<String, Object> attributes,
                                      String nameAttributeKey) {
        return new CustomOAuth2User(
                null,
                attributes,
                nameAttributeKey,
                user.getId(),
                user.getUsername()
        );
    }
}
