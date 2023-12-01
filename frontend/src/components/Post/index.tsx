import styled from "@emotion/styled";
import React, { useState } from "react";
import Modal from "react-modal";
import { LikeButton } from "../LikeButton";

const Container = styled.div`
    width: 600px;
    border: 1px solid #D8D8D8;
    border-radius: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: flex-start;
    // padding-top: 10px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const ProfilePicture = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Username = styled.div`
    font-weight: bold;
`;

const TravelInfo = styled.div`
    font-size: 16px;
`;


const Places = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
`;

const Place = styled.div`
    margin: 5px;
    text-align: center;
`;

// 모달 스타일
const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "700px",
        height: "700px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #D8D8D8",
        borderRadius: "5px",
        padding: "20px",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
};

// PostDetail 컴포넌트 스타일
const DetailContainer = styled.div`
`;

export const Post = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Container>
                <Title>
                    <UserInfo>
                        <ProfilePicture />
                        <Username>Username</Username>
                    </UserInfo>
                    <TravelInfo>City, Total Time</TravelInfo>
                    <LikeButton />
                </Title>
                <Places onClick={openModal}>
                    {[...Array(10)].map((_, index) =>(
                        <Place key={index}>
                            <img src={`japan${index+1}`} alt={`Place ${index + 1}`} width="120" height="120" style={{ borderRadius: '50%' }} />
                            <div>Place {index + 1}</div>
                        </Place>
                    ))}
                </Places>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Post Detail Modal"
            >
                <DetailContainer>

                </DetailContainer>
            </Modal>
        </>
    )
}