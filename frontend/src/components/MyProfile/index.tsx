import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;

    
`;

let red = {
    backgroundColor: "#EB8988"
}

let blue = {
    backgroundColor: "#B1D2E8"
}

const Button = styled.div`
    border-radius: 13px;
    height: 40px;
    width: 140px;
    left: 305px;
    bottom: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    margin: 10px;
    &:hover {
        opacity: 80%;
    }
`;

const DeleteButton = styled(Link)`
    border-radius: 13px;
    height: 40px;
    width: 140px;
    left: 305px;
    bottom: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    margin: 10px;
    &:hover {
        opacity: 80%;
    }
`;

const ButtonText = styled.div`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.57px;
    line-height: 34.5px;
    text-align: center;
    vertical-align: center; 
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;   
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const Text = styled.div`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    text-align: center;
    padding-top: 60px;   
    padding-bottom: 20px;   
`;
const Category = styled.div`
    width: 200px;

    color: #808080;
    font-family: "Inter-Regular", Helvetica;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    text-align: left;
    padding-bottom: 10px;   
`;

const Content = styled.div`
    border-radius: 5px;
    height: 3px;
    width: 200px;

    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    width: 200px;
    text-align: center;
    padding-top: 15px;   
    padding-bottom: 15px;   
    margin-bottom: 30px;
    border: 1px solid #D9D9D9;
`;

const ContentEdit = styled.input`
    border-radius: 5px;
    height: 3px;
    width: 200px;

    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    width: 200px;
    text-align: center;
    padding-top: 15px;   
    padding-bottom: 15px;   
    margin-bottom: 30px;
    border: 1px solid #D9D9D9;
`;

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "500px",
        height: "200px",
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

export const MyProfile = ({ Picture }: { Picture: string }) => {
    const [isMain, setIsMain] = useState(true);
    const [isDelete, setIsDelete] = useState(false);

    const openMain = () => {
        setIsMain(true);
    };

    const openEdit = () => {
        setIsMain(false);
    };

    const openDelete = () => {
        setIsDelete(true);
    };

    const closeDelete = () => {
        setIsDelete(false);
    };

    if (isMain){
        return (
            <Container>
                <ProfilePictureShow Picture = {Picture}/>
                <Category>Name</Category>
                <Content>김애플</Content>
                <Category>Username</Category>
                <Content>김아이폰</Content>
                <Button onClick={openEdit} style={blue}>
                    <ButtonText color='#034070'>Edit Account</ButtonText>
                </Button>
                <Button style={red}>
                    <ButtonText onClick={openDelete} color='#990600'>Delete Account</ButtonText>
                </Button>

                <Modal
                    isOpen={isDelete}
                    onRequestClose={closeDelete}
                    style={customModalStyles}
                    contentLabel="Delete the account?"
                >
                    <Text>Are you sure 삭제?</Text>
                    <ButtonContainer>
                        <DeleteButton to={'/'} style={red}>
                            <ButtonText>Delete</ButtonText>
                        </DeleteButton>
                        <Button onClick={closeDelete} style={blue}>
                            <ButtonText>Keep</ButtonText>
                        </Button>
                    </ButtonContainer>
                </Modal>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <ProfilePictureShow Picture = {Picture}/>
                <Category>Name</Category>
                <ContentEdit type="text" placeholder="김애플" />
                <Category>Username</Category>
                <ContentEdit type="text" placeholder="김아이폰" />
                <Category>Password</Category>
                <ContentEdit type="text" placeholder="********" />
                <Button onClick={openMain} style={blue}>
                    <ButtonText color='#034070'>Save Account</ButtonText>
                </Button>
            </Container>
        )
    }
}