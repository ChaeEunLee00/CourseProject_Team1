import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { AddPostButton } from "../components/AddPostButton";
import { Post } from "../components/Post";
import axios from "axios";

interface Post {
    id: string;
    user_id: string;
    content: string;
    city: string;
    duration: number;
    likenum: number;
    creationDate: string;
    destinations: string[];
    hashtags: string[];
    pictures: [];
    comments: [];
}

const Container = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 30px;
    gap: 20px;
`;

const SearchResult = () => {
    const { keyword } = useParams<{ keyword : string }>() || { keyword: ""};
    // const [userId, setUserId] = useState<string | null>(null);
    // const [accessToken, setAccessToken] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [hashtags, setHashtags] = useState([]);
    const hashtagPostIdObject: {[key: string]: string[]} = {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                // localStorage에서 세션 ID와 Access Token을 가져와서 userId와 accessToken 상태 업데이트
                // const userId = localStorage.getItem('userId');
                // const accessToken = localStorage.getItem('accessToken');
                const allPostRes = await axios.get<Post[]>(
                    "http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts"
                );
                // setUserId(userId);
                // setAccessToken(accessToken);
                setAllPosts(allPostRes.data);

                // 검색 결과에 맞는 Post 필터링
                const filtered = allPosts.filter((p) => {
                    // keyword가 p의 hashtags, destinations, content, city 중 하나에 포함되는지 확인
                    const keywordToUse = keyword || ''; // 만약 keyword가 undefined이면 빈 문자열로 대체
                    const keywordIncluded =
                        (p.hashtags && p.hashtags.includes(keywordToUse)) ||
                        (p.destinations && p.destinations.some((destination) => destination.includes(keywordToUse))) ||
                        (p.content && p.content.includes(keywordToUse)) ||
                        (p.city && p.city.includes(keywordToUse));

                    return keywordIncluded;
                });

                setFilteredPosts(filtered);

                const hashtagsRes = await axios.get('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/hashtags/get/top5')
                setHashtags(hashtagsRes.data);

                const hashtagsTop5 = hashtagsRes.data;
                await Promise.all(
                    hashtagsTop5.map(async (tag: string) => { // Promise.all 사용
                        const res = await axios.get(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/hashtags/${tag}`);
                        const tagObject = res.data;
                        hashtagPostIdObject[tag] = tagObject.postIdList;
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [keyword, allPosts]);

    return (
        <Container>
            <NavigationBar hashtags={hashtags}/>
            <AddPostButton />
            <InnerContainer>
                {/* {hashtagClicked && (clickedHashtag in hashtagPostIdObject) ? 
                    hashtagPostIdObject[clickedHashtag]?.map((pId: string) => (
                        <Post key={pId} postId={pId}/>
                    )) :
                    posts.map((p) => (
                        <Post key={p.id} postId={p.id}/>
                    ))
                } */}
                {filteredPosts.map((p) => (
                    <Post key={p.id} postId={p.id} />
                ))}
            </InnerContainer>
        </Container>
    )
}

export default SearchResult;