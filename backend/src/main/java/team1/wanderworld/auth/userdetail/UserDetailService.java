package team1.wanderworld.auth.userdetail;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.UserRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;


@Component
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override // DB 에서 조회한 사용자정보를 UserDetails 객체에 담아 반환하는 메서드
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UserDetail(findUser);
    }



    //Todo: UserDetail 내부클래스 (인증•인가에 사용되는 객체)
    //      엔티티필드값을 UserDetails 인터페이스에서 요구하는 값으로 매핑해서 반환
    //      엔티티 변경시 UserDetail 객체도 자동업데이트
    public final class UserDetail extends User implements UserDetails {
        UserDetail(User user) {
            setId((user.getId()));
            setName(user.getName());
            setUsername(user.getUsername());
            setImageurl(user.getImageurl());
            setPassword(user.getPassword());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return Collections.emptyList();
        }

        @Override
        public String getUsername() {
            return super.getUsername();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }





}
