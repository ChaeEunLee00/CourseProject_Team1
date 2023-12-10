package team1.wanderworld.auth.oauth.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import team1.wanderworld.auth.dto.LoginResponseDto;
import team1.wanderworld.auth.jwt.JwtTokenizer;
import team1.wanderworld.auth.oauth.CustomOAuth2User;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private ObjectMapper mapper;

    public OAuth2LoginSuccessHandler(JwtTokenizer jwtTokenizer, ObjectMapper mapper){
        this.jwtTokenizer =jwtTokenizer;
        this.mapper = mapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        log.info("Oauth 로그인 성공");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        loginSuccess(response, oAuth2User);
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", oAuth2User.getId());
        claims.put("username", oAuth2User.getUsername());

        String subject = String.valueOf(oAuth2User.getId());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        log.info("accessToken : {}", accessToken);
        log.info("refreshToken : {}", refreshToken);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setId(oAuth2User.getId());
        loginResponseDto.setUsername(oAuth2User.getUsername());
        loginResponseDto.setAccessToken(accessToken);
        loginResponseDto.setRefreshToken(refreshToken);

        String result = mapper.writeValueAsString(loginResponseDto);
        response.getWriter().write(result);
        response.sendRedirect(createURI(accessToken, refreshToken));
    }
    private String createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("localhost")
//                .host("front-deploy.s3-website.ap-northeast-2.amazonaws.com")
//                .port(5173)
                .path("/oauth")
                .queryParams(queryParams)
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();
    }

}
