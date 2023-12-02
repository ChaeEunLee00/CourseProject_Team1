import React from 'react';
import styled from '@emotion/styled';

const CircleImage = styled.img`
    text-align: center;    
    vertical-align: center;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    border: 1px solid #D9D9D9;
    margin: 50px;
`;

export const ProfilePictureShow = ({ Picture }: { Picture: string | null }) => {
    return (
        <CircleImage src={Picture}/> //alt="No Image" 
    )
};