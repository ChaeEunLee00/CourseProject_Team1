import React from 'react';
import styled from '@emotion/styled';
// import ExampleImg from "../frontend/src/assets/페이스북_로고_심볼형_RGB.png";

const CircleImage = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 2px solid #D9D9D9;
    left: 330px;
    top: 50px;
    position: absolute;
`;

export const ProfilePictureEdit = ({ Picture }: { Picture: string }) => {
    const imageUrl = Picture ? { Picture } : undefined// URL.createObjectURL(Picture) : undefined;

    return (
        <div>
            <CircleImage src={Picture} alt="Profile" />
        </div>
    );
};