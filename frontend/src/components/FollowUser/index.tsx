import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';
import Modal from "react-modal";
import { FollowList } from "../FollowList";

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
    background-color: #FFFFFF;
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

const Button = styled.div`
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

let follow = {
    backgroundColor: "#F0F0F0"
}

let unfollow = {
    backgroundColor: "#CCCCCC"
    
}

interface FollowUserProps {
    readonly id: string;
    isFollowing: boolean;
}

export const FollowUser: React.FC<FollowUserProps> = ({ id, isFollowing}) => {
    const [imageURL, setImage] = useState('');
    const [username, setUsername] = useState<string | null>(null);
    const [followingList, setFollowingList] = useState<string[]>([]);

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        axios
            .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
            .then((response => {
                setFollowingList(response.data.followinglist)
            }))
            .catch((error)=>console.log(error.response.data));
            console.log("user follow block");
    }, [])
    axios
    .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+id)
    .then((response => {
        setImage(response.data.imageurl)
        setUsername(response.data.username)
    }))
    .catch((error)=>console.log(error.response.data));

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    const handleFollowing = async () => {
        console.log("handle following")

        try{
            const response = await axios
            .post(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${id}/follow`,
            null,
            {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            });

            console.log(response.data);
            setFollowingList(response.data.followinglist);
        } catch(error){
            console.log(error);
            alert('세션이 만료되었습니다. 다시 로그인해주세요..!');
        }
    }
    const handleUnfollowing = async () => {
        console.log("handle unfollowing")

        try{
            const response = await axios
            .post("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+id+"/unfollow",
            {},
            {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            });

            console.log(response.data);
            setFollowingList(response.data.followinglist);

        } catch(error){
            console.log(error);
        }
        console.log(followingList)
        console.log(typeof(id))
        console.log("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+id+"/follow")
    }

    if (followingList.includes(id)) {
        return(
            <UserShow>
                <UserPicture src={imageURL}/>
                <Username>
                    {username}
                </Username>
                {isFollowing
                ?
                <Button onClick={handleUnfollowing} style={unfollow}>
                    Delete
                </Button>
                :
                <div></div>
                }
            </UserShow>
        )
    }
    return(
        <UserShow>
            <UserPicture src={imageURL}/>
            <Username>
                {username}
            </Username>
            <Button onClick={handleFollowing} style={follow}>
                Follow
            </Button>
        </UserShow>
    )
}