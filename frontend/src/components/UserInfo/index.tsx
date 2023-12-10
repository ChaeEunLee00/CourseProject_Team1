import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    imageurl: string;
    followerlist: [];
    followinglist: [];
    likedposts: [];
    myposts: [];
}

interface UserInfoProps {
    readonly userId: string;
}

const Container = styled.button`
  width: 200px;
  display: flex;
  align-items: center;
  background: none;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid #EEEEEE;

`;

const Username = styled.div`
  font-weight: bold;
  font-size: 13px;
  padding-left: 5px;
  padding-bottom: 5px;
`;

export const UserInfo:React.FC<UserInfoProps> = ({userId}) => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    const handleUserInfoClick = (userId: string) => {
        try {
            navigate(`/profile/${encodeURI(userId)}`);
        } catch (error) {
            console.error("Error userInfo Click");
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const response = await axios.get<User>(
                        `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                    );
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error fetching user : ", error);
            }
        }
        fetchUser();
    }, [userId])
    return (
        <Container onClick={() => {
                handleUserInfoClick(userId);
            }}>
            <ProfilePicture 
                src={
                    user?.imageurl || "X"
                }
            />
            <Username>
                {user?.username || "Unknown User"}
            </Username>
        </Container>
    )
}