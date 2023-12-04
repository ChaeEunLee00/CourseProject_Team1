import React from 'react';
import styled from '@emotion/styled';
import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfileButton } from '../ProfileButton';
import { Search } from '../Search';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
    hashtags: string[];
    handleHashtag: (hashtag: string) => void;
}

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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    flex-direction: row;
`;


const NavigationBar:React.FC<NavigationBarProps> = ({hashtags, handleHashtag}) => {
    return (
        <Container>
            <WanderWorldLogo className='navigationBar'/>
            <Search hashtags={hashtags} handleHashtag={handleHashtag}/>
            <ProfileButton />
        </Container>
    )
}

export default NavigationBar;