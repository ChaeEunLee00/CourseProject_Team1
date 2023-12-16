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

export const ProfilePictureShow = ({ Picture }: { Picture: string }) => {
    console.log(Picture)

    return (
        <CircleImage src={"https://wanderworld-s3-bucket.s3.ap-northeast-2.amazonaws.com/ui2_img4.jpg"}/> //alt="No Image" 
    )
};