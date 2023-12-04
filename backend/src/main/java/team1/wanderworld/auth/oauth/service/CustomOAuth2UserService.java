package team1.wanderworld.auth.oauth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.UserRepository;
import team1.wanderworld.Services.UserService;
import team1.wanderworld.auth.oauth.CustomOAuth2User;

import java.util.Optional;

@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserService userService;
    private final UserRepository userRepository;


    public CustomOAuth2UserService(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 -> OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getAttribute("sub");
        String loginId = provider + "_" +providerId;

        Optional<User> optionalUser = userRepository.findById(loginId);

        if(optionalUser.isEmpty()) {
            User user = new User();
            user.setId(loginId);
            user.setName(oAuth2User.getAttribute("name"));
            user.setUsername(oAuth2User.getAttribute("email"));
            user.setImageurl(oAuth2User.getAttribute("picture"));

            userService.createUser(user);
            return CustomOAuth2User.of(user, oAuth2User.getAttributes(), providerId);
        } else {
            User findUser = optionalUser.get();
            return CustomOAuth2User.of(findUser, oAuth2User.getAttributes(), providerId);
        }
    }

}

