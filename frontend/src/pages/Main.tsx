import React from 'react';
import styled from '@emotion/styled';
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

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 30px;
    gap: 20px;
`;


const Main = () => {
    return (
        <Container>
            <NavigationBar />
            <AddPostButton />
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
  
export default Main;
