import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NavigationBar from '../components/NavigationBar';
import { AddPostButton } from '../components/AddPostButton';
import { Post } from '../components/Post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    imageurl: string;
    followerlist: [];
    followinglist: [];
    likedposts: [];
    myposts: [];
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
    const [userId, setUserId] = useState<string | undefined>('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    // const [postIds, setPostIds] = useState<string[]>([]);
    let postIds: string[] = [];
    const [hashtags, setHashtags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUrl = window.location.href;

        const userIdMatch = currentUrl.match(/user_id=([^&]+)/);
        const accessTokenMatch = currentUrl.match(/access_token=([^&]+)/);
        const refreshTokenMatch = currentUrl.match(/refresh_token=([^&]+)/);
    
        if (userIdMatch && accessTokenMatch && refreshTokenMatch) {
            alert('로그인 성공');
            const userId = userIdMatch[1];
            const accessToken = accessTokenMatch[1];
            const refreshToken = refreshTokenMatch[1];
        
            localStorage.setItem('userId', userId);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        
            // 로그인 성공 후 main 페이지로 이동합니다.
            navigate('/main');
        }
      }, []); // 빈 배열을 전달하여 마운트 시 한 번만 실행되도록 합니다.


    useEffect(() => {
        const fetchData = async () => {
            try {
                // localStorage에서 세션 ID와 Access Token을 가져와서 userId와 accessToken 상태 업데이트
                const userId = localStorage.getItem('userId') ?? undefined;
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
            <NavigationBar hashtags={hashtags} userId={userId}/>
            <AddPostButton />
            <InnerContainer>
                {allPosts.map((p) => (
                    // <Post key={p.id} postId={p.id} likeNum={p.likenum}/>
                    <Post key={p.id} p={p} />
                ))}
            </InnerContainer>
        </Container>
    );
};

export default Main;
