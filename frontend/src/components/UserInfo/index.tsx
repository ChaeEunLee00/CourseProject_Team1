import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    readonly userId: string | undefined;
}

const Container = styled.div`
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

export const UserInfo:React.FC<UserInfoProps> = ({userId}) => {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                );

                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error fetching user : ", error);
            }
        }
        fetchUser();
    })
    return (
        <Container>
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