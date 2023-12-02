import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "react-modal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { MyProfile } from "../MyProfile";

const Container = styled.div`
    background-color: #B1D2E8;
    border-radius: 13px;
    height: 40px;
    width: 200px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
        opacity: 80%;
    }
`;

const ProfileText = styled.div`
    color: #034070;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.57px;
    line-height: 34.5px;
    text-align: center;
    vertical-align: center;
    // border: 1px solid #D9D9D9;
`;

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "500px",
        height: "600px",
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
}

export const MyProfileButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Container onClick={openModal}>
                <ProfileText>My Profile</ProfileText>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="My Profile"
            >
                <MyProfile/>
            </Modal>
        </>
    )
}