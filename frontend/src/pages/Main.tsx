import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NavigationBar from '../components/NavigationBar';
import { AddPostButton } from '../components/AddPostButton';
import { Post } from '../components/Post';
import axios from 'axios';

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
    margin-top: 100px;
    margin-bottom: 30px;
    gap: 20px;
`;


const Main = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [hashtags, setHashtags] = useState<string[] | null>(null);

    useEffect(() => {
        // const fetchData = async () => {
        try {
            // localStorage에서 세션 ID와 Access Token을 가져와서 userId와 accessToken 상태 업데이트
            const userId = localStorage.getItem('userId');
            const accessToken = localStorage.getItem('accessToken');
            setUserId(userId);
            setAccessToken(accessToken);

            // 서버에서 hashtags top5 가져오기
            // const hashtagResponse = axios.get('http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/hashtags/top5');
            axios.get('http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/hashtags/top5')
                .then((response => {
                    setHashtags(response.data);
                }));
            // const responseData = hashtagResponse.data;
            // setHashtags(responseData);
            // alert("hashtags 가져오기 성공");
            // console.log(hashtagResponse.data);
        } catch (error) {
            console.log("hashtag 가져오기 실패", error);
            alert("hashtags 가져오기 실패");
        }
        // };
        // fetchData();
    }, []);

    

    return (
        <Container>
            <NavigationBar />
            <AddPostButton />
            <InnerContainer>
                <Post />
                {/* {hashtags && hashtags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                ))} */}
                <div>{hashtags}</div>
                <div>{userId}</div>
                <div>{accessToken}</div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </InnerContainer>
        </Container>
    );
  };
  
export default Main;
