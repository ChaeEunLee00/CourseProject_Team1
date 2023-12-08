import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';

const Container = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

interface LikeButtonProps {
    readonly postId: string | undefined;
    likeNum: number | undefined;
    isInMyLikedPosts: boolean;
}

export const LikeButton:React.FC<LikeButtonProps>  = ({postId, likeNum, isInMyLikedPosts}) => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const [isChecked, setIsChecked] = useState(isInMyLikedPosts);
    const [count, setCount] = useState<number | undefined>(likeNum);

    console.log(count);
    console.log("isInMyLikedPosts : ", isInMyLikedPosts);
    console.log("isChecked : ", isChecked);
    const handleLikeButtonClicked = async () => {
        try {
            // 페이지 새로고침하면 isChecked 무조건 다 false 나옴
            
            const endPoint = isChecked
            ? `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/unlike`
            : `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/like`;
        
            // 좋아요 또는 좋아요 취소 요청
            await axios.post(endPoint, null, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Refresh": refreshToken,
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            console.log("post 요청 끝");

            // 좋아요 상태를 토글하고, 좋아요 수 업데이트
            setIsChecked(!isChecked);
            setCount((prevCount) => (prevCount !== undefined ? (isChecked ? prevCount - 1 : prevCount + 1) : 0));
        } catch (error) {
            console.error('Like Button', error);
        }
    };

    return (
        <Container>
            {isChecked ? 
                <HeartFilled className='like-button red' onClick={handleLikeButtonClicked} />
                : <HeartOutlined className='like-button' onClick={handleLikeButtonClicked} />
            }
            <h3>{count}</h3>
        </Container>
    );
};
