package team1.wanderworld.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import team1.wanderworld.auth.handler.UserAuthenticationEntryPoint;
import team1.wanderworld.auth.handler.UserAuthenticationFailureHandler;
import team1.wanderworld.auth.handler.UserAuthenticationSuccessHandler;
import team1.wanderworld.auth.filter.JwtAuthenticationFilter;
import team1.wanderworld.auth.jwt.JwtTokenizer;
import team1.wanderworld.auth.filter.JwtVerificationFilter;
import team1.wanderworld.auth.userdetail.UserDetailService;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final UserDetailService userDetailService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, UserDetailService userDetailService) {
        this.jwtTokenizer = jwtTokenizer;
        this.userDetailService = userDetailService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers((headers) -> headers
                                .frameOptions((frameOptions) -> frameOptions.sameOrigin()))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/**").permitAll())
                .csrf((csrf) -> csrf.disable())
                .cors(withDefaults())
                .sessionManagement((sessionManagement) ->
                                sessionManagement
                                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(withDefaults())
                .httpBasic(withDefaults())
                .exceptionHandling(exceptionHandle -> exceptionHandle
                        .authenticationEntryPoint(new UserAuthenticationEntryPoint()))
                .apply(new CustomFilterConfigurer());

        return http.build();
    }
    @Bean // 사용자 비밀번호를 암호화 하기 위한 PasswordEncoder 생성메서드를 Bean 으로 등록
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173","http://front-deploy.s3-website.ap-northeast-2.amazonaws.com","http://front-deploy.s3-website.ap-northeast-2.amazonaws.com:5173"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "Refresh"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");


            //인증성공 또는 인증실패시 호출될 객체를 설정
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);


            // 빌더객체에 JwtAuthenticationFilter,JwtVerificationFilter 를 추가해 JWT 인증•검증기능을 적용
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter,JwtAuthenticationFilter.class);
        }
    }
}




