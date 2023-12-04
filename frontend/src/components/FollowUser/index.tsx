import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';
import Modal from "react-modal";

const UserShow = styled.div`
    display: flex;
    flex-direction: row;
    // display: flex;
    // justify-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    // border: 1px solid #D9D9D9;
    width: 450px;
`;

const UserPicture = styled.img`
    text-align: center;    
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #D9D9D9;
`;

const Username = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;
`;

const DeleteButton = styled.div`
    background-color: #E0E0E0;
    border-radius: 8px;
    height: 30px;
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    color: #606060;
    font-family: "Inter-Regular", Helvetica;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.57px;
    line-height: 34.5px;

    &:hover {
        opacity: 80%;
    }
`;

export const FollowUser = ({ id }: { id: string }) => {
    const [imageURL, setImage] = useState('');
    const [username, setUsername] = useState<string | null>(null);
    
    axios
    .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+id)
    .then((response => {
        setImage(response.data.imageurl)
        setUsername(response.data.username)
    }))
    .catch((error)=>console.log(error.response.data));

    return(
        <UserShow>
            <UserPicture src={imageURL}/>
            <Username>
                {username}
            </Username>
            <DeleteButton>
                Delete
            </DeleteButton>
        </UserShow>
    )
}