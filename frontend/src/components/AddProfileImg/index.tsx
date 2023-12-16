import styled from "@emotion/styled";
import React, { useRef, useState } from "react";

const Container = styled.div`
    // background-color: #d9d9d9;
    border: 1px solid #D8D8D8;
    border-radius: 50px;
    height: 100px;
    width: 100px;
    overflow: hidden;
    position: absolute;
    left: 120px;
    top: 100px;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProfileImageText = styled.div`
    color: #5a5656;
    font-family: "Alike-Regular", Helvetica;
    margin-top: 40px;
    font-size: 12px;
    font-weight: 400;
    height: 29px;
    letter-spacing: -0.47px;
    line-height: 28.7px;
    text-align: center;
    white-space: nowrap;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

export const AddProfileImg = ({handleFileChange}: {handleFileChange: (file: File) => void}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            handleFileChange(file);

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Container onClick={handleButtonClick}>
            {imageUrl ? (
                <ProfileImage src={imageUrl} alt="Profile" />
            ) : (
                <ProfileImageText>프로필 사진(선택)</ProfileImageText>
            )}            
            <HiddenFileInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleInputChange}
            />
        </Container>
    )
}