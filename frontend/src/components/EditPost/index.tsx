import styled from "@emotion/styled";
import { ContentWhenEditPost } from "../ContentWhenEditPost";
import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SaveButton = styled.button`
    width: 80px;
    height: 40px;
    background-color: white;
    font-size: 15px;
    text-align: center;
`;

interface EditPostProps {
    readonly postId: string | undefined;
    setIsEditPostModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const  EditPost: React.FC<EditPostProps> = ({postId, setIsEditPostModalOpen}) => {
    const [content, setContent] = useState('')

    const handleEditPost = async () => {
        try {
            await axios.put(
                `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/edit`, 
                {
                    content: content
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        Refresh: localStorage.getItem("refreshToken"),
                    },
                    withCredentials: true
                }
            )
        } catch (error) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요..!");
            console.error("Edit Post Error : ", error);
        }

        setIsEditPostModalOpen(false);
    }

    return (
        <Container>
            <ContentWhenEditPost setContent={setContent}/>
            <SaveButton onClick={handleEditPost}>저장</SaveButton>
        </Container>
    )
}