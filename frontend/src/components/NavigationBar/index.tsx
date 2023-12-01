import React from 'react';
import styled from '@emotion/styled';
import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfileButton } from '../ProfileButton';
import { Search } from '../Search';
import { Link } from 'react-router-dom';


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    flex-direction: row;
`;



const NavigationBar = () => {
    const handleReload = () => {
        window.location.reload();
      };

    return (
        <Container>
            <WanderWorldLogo className='navigationBar'/>
            <Search />
            <ProfileButton />
        </Container>
    )
}

export default NavigationBar;