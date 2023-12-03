import styled from "@emotion/styled";
import React, { useState } from "react";
import Modal from "react-modal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AddPost } from "../AddPost";

const Container = styled.div`
    width: 100px;
    height: 50px;
    position: fixed;
    top: 100px;
    margin-left: 750px;
`;

const AddButton = styled(PlusCircleOutlined)`
    width: 40px;
    height: 40px;
    font-size: 35px;
    cursor: pointer;
`;

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
}

export const AddPostButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // 확인 창 표시
        const confirmClose = window.confirm("정말 나가시겠습니까?");
        if (confirmClose) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Container>
                <AddButton onClick={openModal} />
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Create Post Modal"
            >
                <AddPost />
            </Modal>
        </>
    )
}