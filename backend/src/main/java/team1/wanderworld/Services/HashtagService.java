package team1.wanderworld.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team1.wanderworld.Models.Hashtag;
import team1.wanderworld.Models.Post;
import team1.wanderworld.Models.User;
import team1.wanderworld.Repositories.HashtagRepository;
import team1.wanderworld.Repositories.PostRepository;
import team1.wanderworld.common.exception.BusinessLogicException;
import team1.wanderworld.common.exception.ExceptionCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HashtagService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private HashtagRepository hashtagRepository;

    public void saveHashtag(List<String> hashtags, String postId) {

        for(String hashtag : hashtags){
            Optional<Hashtag> optionalHashTag = verifyExistsHashTag(hashtag);
            //기존에 있는 hashtag일 경우 -> 찾아서 postId 추가
            if(optionalHashTag.isPresent()){
                Hashtag findHashTag = optionalHashTag.get();

                List<String> postIdList = findHashTag.getPostIdList();
                postIdList.add(postId);
                findHashTag.setPostIdList(postIdList);

                findHashTag.setCount(postIdList.size());

                hashtagRepository.save(findHashTag);
            }
            else{
                //없는 hashtag일 경우 -> 새로 생성
                Hashtag newHashtag = new Hashtag();

                newHashtag.setName(hashtag);

                List<String> postIdList = new ArrayList<>();
                postIdList.add(postId);
                newHashtag.setPostIdList(postIdList);

                newHashtag.setCount(postIdList.size());

                hashtagRepository.save(newHashtag);
            }
        }
    }

    public void updatdHashtag(List<String> hashtags, String postId) {

        for(String hashtag : hashtags){
            Optional<Hashtag> optionalHashTag = verifyExistsHashTag(hashtag);
            //기존에 있는 hashtag일 경우 -> 수정 전 사용했던 hashtag 일 경우 postId 삭제
            if(optionalHashTag.isPresent()){
                Hashtag findHashTag = optionalHashTag.get();
                List<String> postIdList = findHashTag.getPostIdList();

                postIdList.remove(postId);
                findHashTag.setPostIdList(postIdList);
                findHashTag.setCount(postIdList.size());
                hashtagRepository.save(findHashTag);
            }
        }
        //수정된 hashtag들 새로 저장
        saveHashtag(hashtags,postId);
    }

    private Optional<Hashtag> verifyExistsHashTag(String hashTag) {
        return hashtagRepository.findByName(hashTag);
    }

//    public List<Hashtag> getAllHashtags() {
//        return hashtagRepository.findAll();
//    }
//
//    public Optional<Hashtag> getHashtagByName(String name) {
//        return hashtagRepository.findByName(name);
//    }
//
//    public Hashtag createHashtag(String name) {
//        Hashtag hashtag = new Hashtag();
//        hashtag.setName(name);
//        return hashtagRepository.save(hashtag);
//    }
//
//    public Hashtag getOrCreateHashtag(String name) {
//        Optional<Hashtag> existingHashtag = hashtagRepository.findByName(name);
//
//        return existingHashtag.orElseGet(() -> {
//            Hashtag newHashtag = new Hashtag();
//            newHashtag.setName(name);
//            return hashtagRepository.save(newHashtag);
//        });
//    }
//
//    public void connectHashtagToPost(Hashtag hashtag, Post post) {
//        hashtag.getPostIdList().add(post.getId());
//        hashtag.setCount(hashtag.getPostIdList().size());
//        hashtagRepository.save(hashtag);
//
//        post.getHashtags().add(hashtag.getName());
//        postRepository.save(post);
//    }
}
