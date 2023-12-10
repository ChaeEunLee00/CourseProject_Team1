import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NavigationBar from '../components/NavigationBar';
import { AddPostButton } from '../components/AddPostButton';
import { Post } from '../components/Post';
import axios from 'axios';

interface Post {
    id: string;
    user_id: string;
    content: string;
    city: string;
    duration: number;
    likenum: number;
    creationDate: string;
    destinations: [];
    hashtags: [];
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
    margin-top: 140px;
    margin-bottom: 30px;
    gap: 25px;
`;


const Main = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    // const [postIds, setPostIds] = useState<string[]>([]);
    let postIds: string[] = [];
    const [hashtags, setHashtags] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // localStorage에서 세션 ID와 Access Token을 가져와서 userId와 accessToken 상태 업데이트
                const userId = localStorage.getItem('userId');
                const accessToken = localStorage.getItem('accessToken');
                const allPostRes = await axios.get<Post[]>(
                    "http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts"
                );
                setUserId(userId);
                setAccessToken(accessToken);
                setAllPosts(allPostRes.data);
                
                // postIds는 현재 모든 Post의 id만을 요소로 가지는 string 배열임

                const hashtagsRes = await axios.get('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/hashtags/get/top5')
                setHashtags(hashtagsRes.data);

            } catch (error) {
                console.log("hashtag 가져오기 실패", error);
                alert("hashtags 가져오기 실패");
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <NavigationBar hashtags={hashtags}/>
            <AddPostButton />
            <InnerContainer>
                {allPosts.map((p) => (
                    <Post key={p.id} postId={p.id} likeNum={p.likenum}/>
                ))}
            </InnerContainer>
        </Container>
    );
};

export default Main;
