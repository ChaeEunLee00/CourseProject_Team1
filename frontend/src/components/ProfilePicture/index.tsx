import React from 'react';
import styled from '@emotion/styled';

const CircleImage = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #fff;
`;

const ProfilePicture = ({ file }) => {
    const imageUrl = file ? URL.createObjectURL(file) : undefined;

    return (
        <div>
            <CircleImage src={imageUrl} alt="Profile" />
        </div>
    );
};

export default ProfilePicture;