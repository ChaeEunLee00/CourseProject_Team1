import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
// import { LikeButton } from "../LikeButton";
import { UserInfo } from "../UserInfo";
import Modal from "react-modal";
import { EditPost } from "../EditPost";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    // justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const TravelInfo = styled.div`
  font-size: 16px;
`;

const EditButton = styled.button`
  width: 30px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  text-align: center;
  margin-left: 100px;
  padding: 0px;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 40px;
  background-color: white;
  font-size: 12px;
  text-align: center;
  padding: 0px;
  margin-left: 30px;
`;

const LikeButton = styled.div`
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

// 모달 스타일
const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "700px",
      height: "700px",
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
    },
};

interface Post {
    id: string;
    user_id: string;
    content: string;
    city: string;
    duration: number;
    likenum: number;
    creationDate: string;
    destinations: string[];
    hashtags: string[];
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
}

export const PostDetailHeader:React.FC<PostDetailHeaderProps> = ({post, userId}) => {
    const postId = post?.id || '';
    const isCurrentUserPost = userId === localStorage.getItem("userId");
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
    const [myLikedPosts, setMyLikedPosts] = useState<string[]>([]);
    const [count, setCount] = useState<number | undefined>(post?.likenum);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 게시물 삭제
    const handleDelete = () => {
        if (window.confirm("이 게시물을 삭제하시겠습니까?")) {
        axios
            .delete(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                Refresh: localStorage.getItem("refreshToken"),
            },
            })
            .then((response) => {
            // 성공적인 삭제 처리, 가령 UI에서 게시물을 제거
            alert("게시물이 성공적으로 삭제되었습니다.");
            window.location.reload();
            // console.log("게시물이 성공적으로 삭제되었습니다:", postId);
            })
            .catch((error) => {
            // Post 삭제 중 오류 처리
            console.error("게시물 삭제 중 오류:", error);
            });
        }
    };

     // 좋아요 버튼 클릭시 함수
    const handleLikeButtonClicked = async () => {
        try {
        if (myLikedPosts.includes(postId)) {
            await axios.post(
            `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/unlike`, null, {
                headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Refresh": refreshToken,
                "Content-Type": "application/json",
                },
                withCredentials: true
            }
            );
            setCount((prevCount) => (prevCount !== undefined ? prevCount - 1 : 0));
        } else {
            await axios.post(
            `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/like`, null, {
                headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Refresh": refreshToken,
                "Content-Type": "application/json",
                },
                withCredentials: true
            }
            );
            setCount((prevCount) => (prevCount !== undefined ? prevCount + 1 : 0));
        }
        } catch (error) {
        console.log(error);
        }
    }

    const openEditPostModal = () => {
        if (window.confirm("이 게시물을 수정하시겠습니까?")) {
            setIsEditPostModalOpen(true);
        }
    };
    
    const closeEditPostModal = () => {
        setIsEditPostModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userResponse = await axios.get<User>(
              `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${localStorage.getItem("userId")}`
            );
            setMyLikedPosts(userResponse.data.likedposts);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
          
        };
    
        fetchData();
      }, [count]);

    return (
        <>
            <Container>
                <UserInfo userId={userId}/>
                <TravelInfo>
                    {post?.city}, {post?.duration} Days
                </TravelInfo>
                {isCurrentUserPost && (
                <>
                    <EditButton onClick={openEditPostModal}>편집</EditButton>
                    <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                </>
                )}
                {/* <LikeButton>
                    {myLikedPosts.includes(postId) ? 
                        <HeartFilled className='like-button red' onClick={handleLikeButtonClicked} />
                        : <HeartOutlined className='like-button' onClick={handleLikeButtonClicked} />
                    }
                    <Liketext>{count}</Liketext>
                </LikeButton> */}
            </Container>
            <Modal
                isOpen={isEditPostModalOpen}
                onRequestClose={closeEditPostModal}
                style={customModalStyles}
                contentLabel="Edit Post Modal"
            >
                <EditPost postId={post?.id} setIsEditPostModalOpen={setIsEditPostModalOpen}/>
            </Modal>
        </>
    )
}