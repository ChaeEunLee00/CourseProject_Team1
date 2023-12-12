import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import { error } from 'console';

const Container = styled.div`
  width: 200px;
  height: 40px;
  margin-right: 10px;
  text-align: right;
  // border: 1px solid #D9D9D9;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-end;
`;

const Liketext = styled.div`
    color: #034070;
    font-family: "Inter-Regular", Helvetica;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.57px;
    line-height: 34.5px;
    width: 30px;
    // border: 1px solid #D9D9D9;
    text-align: center;
    vertical-align: top;
`;


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

interface LikeButtonProps {
    readonly postId: string | undefined;
    likeNum: number | undefined;
    readonly userId: string;
}
// const LikeIcon = styled.div`
//     font-size: 20px;
//     cursor: pointer;
// `;
export const LikeButton:React.FC<LikeButtonProps>  = ({postId, likeNum, userId}) => {
    const [myLikedPosts, setMyLikedPosts] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [count, setCount] = useState<number | undefined>(likeNum);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const handleLikeButtonClicked = async () => {
        try {
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

                    // 좋아요 상태를 토글하고, 좋아요 수 업데이트
            setIsChecked(!isChecked);
            setCount((prevCount) => (prevCount !== undefined ? (isChecked ? prevCount - 1 : prevCount + 1) : 0));
        } catch (error) {
            console.error('Like Button', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get<User>(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                );
                if (userResponse.data) {
                    setMyLikedPosts(userResponse.data.likedposts);
                }
                if (postId !== undefined) {
                    if (myLikedPosts.includes(postId)) {
                        setIsChecked(true);
                    }
                }
                console.log(isChecked);
            } catch (error) {
                console.log('Error fetching user', error);
            }
        };
        fetchData();
    }, []);

    

    return (
        <Container>
            {isChecked ? 
                <HeartFilled className='like-button red' onClick={handleLikeButtonClicked} />
                : <HeartOutlined className='like-button' onClick={handleLikeButtonClicked} />
            }
            <Liketext>{count}</Liketext>
        </Container>
    );
};
