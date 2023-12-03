import React from 'react';
import styled from '@emotion/styled';
import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfileButton } from '../ProfileButton';
import { Search } from '../Search';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
    hashtags: string[];
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


const NavigationBar:React.FC<NavigationBarProps> = ({hashtags}) => {
    // const handleReload = () => {
    //     window.location.reload();
    //   };

    return (
        <Container>
            <WanderWorldLogo className='navigationBar'/>
            <Search hashtags={hashtags} />
            <ProfileButton />
        </Container>
    )
}

export default NavigationBar;