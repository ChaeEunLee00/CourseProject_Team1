import styled from "@emotion/styled";
import addfriendImg from "../../assets/addPerson.png";
import heartLogo from "../../assets/heart.png";
import profileLogo from "../../assets/profileImg.png";
import Modal from "react-modal";
import { useState } from "react";
import { SearchFriend } from "../SearchFriend";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 80px;
    padding-top: 10px;
    // margin-left: 130px;
    // border: 1px solid #D9D9D9;
`;
const AddFreind = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 30px;
    cursor: pointer; 
    &:hover {
        opacity: 60%;
    }
`;

const LikedPostsButton = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 30px;
    cursor: pointer; 
    &:hover {
        opacity: 60%;
    }
`;

const ProfileLink = styled(Link)`
    width: 50px;
    height: 50px;
`;

const Profile = styled.img`
    padding-top: 6px;
    width: 40px;
    height: 40px;
    cursor: pointer; 
    &:hover {
        opacity: 60%;
    }
`;


const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "700px",
        height: "300px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #D8D8D8",
        borderRadius: "20px",
        padding: "20px",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

export const ProfileButton = () => {
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
                <AddFreind alt="add friend" src={addfriendImg} onClick={openModal} />
                <LikedPostsButton alt="liked post button" src={heartLogo} />
                <ProfileLink to="/profile">
                    <Profile alt="profile" src={profileLogo}/>
                </ProfileLink>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Add Friend Modal"
            >
                <SearchFriend onClose={closeModal}/>
            </Modal>
        </>
    );
}