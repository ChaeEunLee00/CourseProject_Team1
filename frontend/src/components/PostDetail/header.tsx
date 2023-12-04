import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { LikeButton } from "../LikeButton";

interface Post {
    id: string;
    user_id: string;
    content: string;
    city: string;
    duration: number;
    likenum: number;
    creationDate: string;
    destinations: [];
    hashtags: [];
    pictures: [];
    comments: [];
}
  
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

interface PostDetailHeaderProps {
    post: Post | null;
    user: User | undefined;
}

const Container = styled.div`
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
  object-fit: cover;
`;

const Username = styled.div`
  font-weight: bold;
`;

const TravelInfo = styled.div`
  font-size: 16px;
`;

export const PostDetailHeader:React.FC<PostDetailHeaderProps> = ({post, user}) => {
    return (
        <Container>
            <UserInfo>
                <ProfilePicture
                src={
                    user?.imageurl || "X"
                }
                />
                <Username>
                {user?.username || "Unknown User"}
                </Username>
            </UserInfo>
            <TravelInfo>
                {post?.city}, {post?.duration} Days
            </TravelInfo>
            <LikeButton />
        </Container>
    )
}