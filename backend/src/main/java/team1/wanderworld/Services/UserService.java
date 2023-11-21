package team1.wanderworld.Services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.UserRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository
                       ,PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // [회원등록]
    public User createUser(User user) {
        verifyExistsUserName(user.getUsername());

        // 회원가입시, 사용자 password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        User saveUser = userRepository.save(user);

        return saveUser;
    }


    // [회원프로필수정]
    public User updateUser(User user) {

        User findUser = findVerifiedUser(user.getId());
        Optional.ofNullable(user.getName())
                .ifPresent(name -> findUser.setName(name));
        Optional.ofNullable(user.getUsername())
                .ifPresent(userName -> findUser.setUsername(userName));
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(password));
        Optional.ofNullable(user.getImageurl())
                .ifPresent(imageUrl -> findUser.setImageurl(imageUrl));

        return userRepository.save(findUser); // save 따로 안해줘도 되나?
    }


    // 회원조회
    public User findUser(String userId) {
        User user = findVerifiedUser(userId);
        return user;
    }

    // 회원탈퇴
    public void deleteUser(String userId) {
        User user = findVerifiedUser(userId);
        userRepository.delete(user);
    }

    // 팔로우 -> 팔로우 요청한 유저의 팔로잉 리스트에 팔로우 하는 유저 추가
    //       -> 팔로우 받는 유저의 팔로워 리스트에 팔로우 요청한 유저 추가
    public User followUser(String userId, String followId) {
        User user = findVerifiedUser(userId);
        User followUser = findVerifiedUser(followId);

        //팔로우 요청한 유저의 팔로잉 리스트에 팔로우 하는 유저 추가
        List<String> followingList = user.getFollowinglist();
        followingList.add(followId);
        user.setFollowinglist(followingList);
        userRepository.save(user);

        //팔로우 받는 유저의 팔로워 리스트에 팔로우 요청한 유저 추가
        List<String> followerList = followUser.getFollowerlist();
        followerList.add(userId);
        followUser.setFollowerlist(followerList);
        userRepository.save(followUser);

        return user;
    }

    // 팔로우취소 -> 팔로우 취소 요청한 유저의 팔로잉 리스트에 팔로우 하는 유저 삭제
    //          -> 팔로우 받았던 유저의 팔로워 리스트에 팔로우 취소 요청한 유저 삭제
    public User unfollowUser(String userId, String unfollowId) {
        User user = findVerifiedUser(userId);
        User unfollowUser = findVerifiedUser(unfollowId);

        //팔로우 취소 요청한 유저의 팔로잉 리스트에 팔로우 하는 유저 삭제
        List<String> followingList = user.getFollowinglist();
        followingList.remove(unfollowId);
        user.setFollowinglist(followingList);
        userRepository.save(user);

        //팔로우 받았던 유저의 팔로워 리스트에 팔로우 취소 요청한 유저 삭제
        List<String> followerList = unfollowUser.getFollowerlist();
        followerList.remove(userId);
        unfollowUser.setFollowerlist(followerList);
        userRepository.save(unfollowUser);

        return user;
    }

    // 이미 등록된 username인지 확인
    private void verifyExistsUserName(String userName) {
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXIST);
    }


    // 존재하는 회원인지 확인
    public User findVerifiedUser(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

//    // 전체회원조회(우선 id 기준 정렬)
//    public Page<User> findUsers(int page, int size) {
//        Page<User> users = userRepository.findAll(PageRequest.of(page, size, Sort.by("userId").descending()));
//        List<User> userList = users.getContent();
//        List<User> updatedList = new ArrayList<>();
//
//        for (User user : userList) {
////            int questionCount = questionRepository.countByUserId(user.getUserId());
//            int questionCount = getQuestionCount(user.getUserId());
//            int answerCount = getAnswerCount(user.getUserId());
//            user.setQuestionCount(questionCount);
//            user.setAnswerCount(answerCount);
//            updatedList.add(user);
//        }
//        return new PageImpl<>(updatedList, users.getPageable(), users.getTotalElements());
//    }


//
//
//
//    // questionCount 정보불러오기
//    private int getQuestionCount(long userId) {
//        Optional<User> findUser = userRepository.findById(userId);
//        if (findUser.isPresent()) {
//            User user = findUser.get();
//            List<Question> questionList = user.getQuestions();
//
//            return questionList.size();
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
//
//
//    private int getAnswerCount(long userId) {
//        Optional<User> findUser = userRepository.findById(userId);
//        if (findUser.isPresent()) {
//            User user = findUser.get();
//            List<Answer> answerList = user.getAnswers();
//
//            return answerList.size();
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
//
//
//
//
//    // 로그인요청의 email 로 User 객체반환 (로그인요청시 JWT 토큰정보와 user DB 비교를위해 필요)
//    public User findUserEmail(LoginDto loginDto) {
//        String email = loginDto.getEmail();
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//
//        if(optionalUser.isEmpty()){
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//        User user = optionalUser.get();
//        String password = loginDto.getPassword();
//
//        if(!password.equals(user.getPassword())){ //Error 리스폰스 적용해야합니다.
//            throw new BusinessLogicException(ExceptionCode.USER_EXIST); //일단 임시응답
//        }
//        return user;
//    }

}
