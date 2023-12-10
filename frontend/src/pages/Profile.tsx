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
import { useParams } from "react-router-dom";

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



const User = () => {
    const { keyword } = useParams<{ keyword : string }>() || { keyword: ""};
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const userId = keyword;
    const [hashtags, setHashtags] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // setUserId(keyword);
                const response = await axios.get(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/user/${keyword}`
                );
                
                console.log(response.data);
                setUserPosts(response.data);

                const hashtagsRes = await axios.get('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/hashtags/get/top5')
                setHashtags(hashtagsRes.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    

    return (
        <Container>
            <NavigationBar hashtags={hashtags} userId={userId}/>
            <AddPostButton />
            <Profile userId={keyword}/>
            <InnerContainer>
                {userPosts.map((p) => (
                    <Post key={p.id} postId={p.id} likeNum={p.likenum}/>
                ))}
            </InnerContainer>
        </Container>
    );
};

export default User;
