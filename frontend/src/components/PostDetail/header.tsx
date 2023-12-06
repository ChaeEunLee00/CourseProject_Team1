import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { LikeButton } from "../LikeButton";
import { UserInfo } from "../UserInfo";

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
    userId: string;
    likeNum: number | undefined;
    myLikedPosts: string[];
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

const TravelInfo = styled.div`
  font-size: 16px;
`;

export const PostDetailHeader:React.FC<PostDetailHeaderProps> = ({post, userId, likeNum, myLikedPosts}) => {
    return (
        <Container>
            <UserInfo userId={userId}/>
            <TravelInfo>
                {post?.city}, {post?.duration} Days
            </TravelInfo>
            <LikeButton postId={post?.id} likeNum={likeNum} myLikedPosts={myLikedPosts}/>
        </Container>
    )
}