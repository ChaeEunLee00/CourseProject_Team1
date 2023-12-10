import React from 'react';
import styled from '@emotion/styled';
import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfileButton } from '../ProfileButton';
import { Search } from '../Search';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
    hashtags: string[];
    readonly userId: string | undefined;
}
  
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110px;
    background-color: #ffffff;
    // padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid #D9D9D9;
`;


const NavigationBar:React.FC<NavigationBarProps> = ({hashtags, userId}) => {
    return (
        <Container>
            <WanderWorldLogo className='navigationBar'/>
            <Search hashtags={hashtags}/>
            <ProfileButton userId={userId}/>
        </Container>
    )
}

export default NavigationBar;