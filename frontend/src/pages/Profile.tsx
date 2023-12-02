import React from "react";
import PhoneImg from '../assets/phone.png';
import styled from "@emotion/styled";
import { Profile } from "../components/Profile";
import { ProfileEdit } from "../components/ProfileEdit";
import "../App.css";
import '../Fonts/Font.css';
import NavigationBar from '../components/NavigationBar';
import { AddPostButton } from '../components/AddPostButton';
import { Post } from '../components/Post';

const Container = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
`;

// 스크롤 문제로 좌측 프로필 위치 고정
// const MainContainer = styled.div`
//     border: 1px solid #D9D9D9;

//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     margin-top: 100px;
//     margin-bottom: 30px;
//     gap: 20px;

//     width: 100vw;
//     justify-content: space-between;
// `;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 30px;
    gap: 20px;
`;

const PhoneImage = styled.img`
  height: 782px;
  left: 45px;
  object-fit: cover;
  // position: absolute;
  top: 91px;
  width: 36px;
`;

const Home = () => {
  return (
      <Container>
          <NavigationBar />
          
          <AddPostButton />
          <Profile Picture={PhoneImg}/>
          <InnerContainer>
              <Post />
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

export default Home;
