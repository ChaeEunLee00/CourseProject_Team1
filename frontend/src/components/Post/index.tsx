import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { LikeButton } from "../LikeButton";
import axios from "axios";
import { useData } from "../../contexts/DataContext";
import { PostDetail } from "../PostDetail/container";
import { UserInfo } from "../UserInfo";
import { EditPost } from "../EditPost";

interface PostProps {
  readonly postId: string;
  likeNum: number;
}

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

const Container = styled.div`
  width: 700px;
  border: 1px solid #d8d8d8;
  border-radius: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  // justify-content: flex-start;
  padding-top: 10px;
  // padding-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 93%;
  padding: 5px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TravelInfo = styled.div`
  width: 400px;
  // border: 1px solid #d8d8d8;

  // padding-right: 70px;
  font-size: 16px;
`;

const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // border: 1px solid #d8d8d8;
  cursor: pointer;
  padding: 10px;

`;

const Place = styled.div`
  // margin: 5px;
  // padding: 5px;
  text-align: center;
`;

const PlaceName = styled.div`
  max-width: 120px;
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
  // border: 1px solid #d8d8d8;
`;

const EditButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: white;
  font-size: 15px;
  text-align: center;
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: white;
  font-size: 15px;
  text-align: center;
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


export const Post: React.FC<PostProps> = ({postId, likeNum}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [post, setPost] = useState<Post>();
  const [userId, setUserId] = useState<string>('');
  const myLikedPosts = localStorage.getItem("myLikedPosts");
  const isInMyLikedPosts = (myLikedPosts && myLikedPosts.includes(postId)) ? true : false;
  const isCurrentUserPost = userId === localStorage.getItem("userId");

  const handleDelete = () => {
    // 게시물을 삭제하는 논리를 구현합니다.
    // API 요청 전에 확인 대화 상자를 표시할 수 있습니다.
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
          console.log("게시물이 성공적으로 삭제되었습니다:", postId);
        })
        .catch((error) => {
          // Post 삭제 중 오류 처리
          console.error("게시물 삭제 중 오류:", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Post>(
          `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}`
        );
        
        if (response.data) {
          setPost(response.data);
          setUserId(response.data.user_id);
        } else {
          console.error("Post data is undefined");
        }

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const openEditPostModal = () => {
    if (window.confirm("이 게시물을 수정하시겠습니까?")) {
      setIsEditPostModalOpen(true);
    }
  }

  const closeEditPostModal = () => {
    setIsEditPostModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <Title>
          <UserInfo userId={userId} />
          <TravelInfo>
            {post?.city}, {post?.duration} Days
          </TravelInfo>
          {isCurrentUserPost && (
            <>
              <EditButton onClick={openEditPostModal}>편집</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </>
          )}
          <LikeButton 
            postId={post?.id} 
            likeNum={likeNum} 
            isInMyLikedPosts={isInMyLikedPosts}
          />
        </Title>
        <Places onClick={openModal}>
          {[...Array(10)].map((_, index) => (
            <Place key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {post?.pictures && post.pictures.length > index && (
                  <img
                      style={{
                        objectFit: "cover",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                      }}
                      src={post.pictures[index]}
                      alt={`Place ${index + 1}`}
                  />
                )}
                {index < (post?.destinations?.length || 0) - 1 && (
                  <span style={{margin: "10px" }}>&rarr;</span> // 
                )}
              </div>
              <PlaceName>{post?.destinations[index]}</PlaceName>
            </Place>
          ))}
        </Places>
      </Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Post Detail Modal"
      >
        <PostDetail userId ={userId} postId={postId} likeNum={post?.likenum} isInMyLikedPosts={isInMyLikedPosts}/>
      </Modal>
      <Modal
        isOpen={isEditPostModalOpen}
        onRequestClose={closeEditPostModal}
        style={customModalStyles}
        contentLabel="Edit Post Modal"
      >
        <EditPost postId={postId} setIsEditPostModalOpen={setIsEditPostModalOpen}/>
      </Modal>
    </>
  );
};
