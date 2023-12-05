import React, { useEffect, useState } from "react";
import PhoneImg from '../assets/phone.png';
import styled from "@emotion/styled";
import { Profile } from "../components/Profile";
// import { ProfileEdit } from "../components/ProfileEdit";
import "../App.css";
import '../Fonts/Font.css';
import NavigationBar from '../components/NavigationBar';
import { AddPostButton } from '../components/AddPostButton';
import { Post } from '../components/Post';
import axios from "axios";

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
    margin-top: 120px;
    margin-bottom: 30px;
    gap: 20px;
`;



const Home = () => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/user/${userId}`
                );
                
                console.log(response.data);
                setUserPosts(response.data);
            } catch (error) {
                console.log("hashtag 가져오기 실패", error);
                alert("hashtags 가져오기 실패");
            }
        };
        fetchData();
    }, []);
    return (
        <Container>
            <NavigationBar hashtags={[]}/>
            <AddPostButton />
            <Profile />
            <InnerContainer>
                {userPosts.map((p) => (
                    <Post key={p.id} postId={p.id} />
                ))}
            </InnerContainer>
    </Container>
    );
};

export default Home;
