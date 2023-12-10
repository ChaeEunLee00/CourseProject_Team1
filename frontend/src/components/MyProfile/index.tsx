import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';

import { UsernameEdit } from '../MyProfileEditForm';
import { NameEdit } from '../MyProfileEditForm';
import { PasswordEdit } from '../MyProfileEditForm';
import { ImageEdit } from '../MyProfileEditForm';
import { AddProfileImg } from "../AddProfileImg";


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

export const MyProfile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [imageURL, setImage] = useState('');
    
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

    const userId = localStorage.getItem('userId');
    axios
    .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
    .then((response => {
        setName(response.data.name)
        setUsername(response.data.username)
        setImage(response.data.imageurl)
    }))
    .catch((error)=>console.log(error.response.data));

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    const [new_name, setNewName] = useState<string>('');
    const [new_username, setNewUsername] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_imageURL, setNewImage] = useState('');
    
    const handleEdit = async () => {
        try {
            let data = {}
            if (new_name!=''){
                if (new_username!=''){
                    data = {
                        "username": new_username,
                        "name": new_name,
                    }
                }
                else{
                    data = {
                        "name": new_name,
                    }
                }
            }
            else if (new_username!=''){
                data = {
                    "username": new_username,
                }
            }
            console.log(new_name)
            console.log(typeof new_username)
            
            const response = await axios.put('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/edit', data, {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            // edit 하면 id가 바뀌는가?!
            
        });
        alert('Edit succesfully');

        } catch (error) {
        console.log('Edit fail', error);
        alert('Edit Fail');
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUsername(e.target.value);
    };

    const handleFileChange = (file : string) => {
        setImage(file);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/delete', {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            
        });
        alert('Delete succesfully');

        } catch (error) {
        console.log('Delete fail', error);
        alert('Delete Fail');
        }
    };

    if (isMain){
        return (
            <Container>
                <ProfilePictureShow picture = {imageURL}/>
                <Category>Name</Category>
                <Content>{name}</Content>
                <Category>Username</Category>
                <Content>{username}</Content>
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
                    <Text>Are you sure you want to DELETE?</Text>
                    <ButtonContainer>
                        <DeleteButton to={'/'} onClick={handleDelete} style={red}>
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
                {/* <AddProfileImg handleFileChange={handleFileChange}/> */}
                <ProfilePictureShow picture = {imageURL}/>
                <Category>Name</Category>
                <NameEdit setting={setNewName} parameter={name} />
                <Category>Username</Category>
                <UsernameEdit setting={setNewUsername} parameter={username}/>
                {/* <Category>Password</Category>
                <PasswordEdit setting={setNewPassword} parameter='********'/> */}
                <Button onClick={() => { openMain(); handleEdit(); }} style={blue}>
                    <ButtonText color='#034070'>Save Account</ButtonText>
                </Button>
            </Container>
        )
    }
}