package team1.wanderworld.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import team1.wanderworld.Models.User;
import team1.wanderworld.auth.jwt.JwtTokenizer;
import team1.wanderworld.auth.dto.LoginDto;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response){

        //ObjectMapper 는 HTTP 요청바디를 LoginDto 객체(사용자가 입력한 로그인 정보)로 변환한다.
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(),LoginDto.class);

        //사용자가 입력한 로그인 정보가 담긴 객체
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword());

        //내부적으로 사용자의 로그인정보를 가지고 인증하고 성공하면 Authentication 객체반환
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override //HTTP 요청•응답객체, 서블릿필터체인(요청넘기기), 인증객체를 인자로 받는다.
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        // 인증에 성공한 사용자정보를 가져온다
        User user = (User)authResult.getPrincipal();

        // 사용자 정보를 가지고 토큰을 생성한다
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        //HTTP 응답 header 에 Authorization 키와 access token 값을 설정한다(Bearer: JWT 토큰임을 나타내는 문자열)
        response.setHeader("Authorization","Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        //인증에 성공한 사용자에게 서비스리소스에대한 접근권한이 부여된 상태로 리다이렉트할 때 호출됨.
        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        //토큰발급시 userId 넣어보기
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());

        String subject = String.valueOf(user.getId());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

            return refreshToken;
    }
}
