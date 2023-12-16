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

const LikedPosts = () => {
    const { keyword } = useParams<{ keyword : string }>() || { keyword: ""};
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [hashtags, setHashtags] = useState([]);
    const [userId, setUserId] = useState<string | undefined>('');
    const [myLikedPosts, setMyLikedPosts] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // localStorage에서 세션 ID와 Access Token을 가져와서 userId와 accessToken 상태 업데이트
                const userId = localStorage.getItem('userId') ?? undefined;
                // const accessToken = localStorage.getItem('accessToken');
                const allPostRes = await axios.get<Post[]>(
                    "http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts"
                );
                // myUserId
                setUserId(userId);
                setAllPosts(allPostRes.data);

                const userResponse = await axios.get<User>(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                );

                setMyLikedPosts(userResponse.data.likedposts);

                // 검색 결과에 맞는 Post 필터링
                const filtered = allPosts.filter((p) => {
                    const postsIncluded =
                        p.id && myLikedPosts.includes(p.id);
                    return postsIncluded;
                });

                setFilteredPosts(filtered);

                const hashtagsRes = await axios.get('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/hashtags/get/top5')
                setHashtags(hashtagsRes.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [keyword, allPosts]);
// keyword, allPosts
    return (
        <Container>
            <NavigationBar hashtags={hashtags} userId={userId}/>
            <AddPostButton />
            <InnerContainer>
                {filteredPosts.map((p) => (
                    <Post key={p.id} p={p}/>
                ))}
            </InnerContainer>
        </Container>
    )
}

export default LikedPosts;