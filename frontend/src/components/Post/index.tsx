import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
// import { LikeButton } from "../LikeButton";
import { PostDetail } from "../PostDetail/container";
import { UserInfo } from "../UserInfo";
import { EditPost } from "../EditPost";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const Container = styled.div`
  width: 700px;
  border: 1px solid #d8d8d8;
  border-radius: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  padding: 5px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TravelInfo = styled.div`
  width: 200px;
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
  likedposts: string[];
  myposts: [];
}

interface PostProps {
  readonly p: Post;
}


export const Post: React.FC<PostProps> = ({p}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  // const [post, setPost] = useState<Post>(p);
  // const [userId, setUserId] = useState<string>(p.user_id);
  const userId = p.user_id;
  const postId = p.id;

  // likeButton 관련
  const [myLikedPosts, setMyLikedPosts] = useState<string[]>([]);
  const [count, setCount] = useState<number | undefined>(p.likenum);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

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

  // 데이터 axios로 가져오기
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
          <UserInfo userId={userId}/>
          <TravelInfo>
            {p?.city}, {p?.duration} Days
          </TravelInfo>
          <LikeButton>
            {myLikedPosts.includes(postId) ? 
                <HeartFilled className='like-button red' onClick={handleLikeButtonClicked} />
                : <HeartOutlined className='like-button' onClick={handleLikeButtonClicked} />
            }
            <Liketext>{count}</Liketext>
          </LikeButton>
        </Title>
        <Places onClick={openModal}>
          {[...Array(10)].map((_, index) => (
            <Place key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {p?.pictures && p.pictures.length > index && (
                  <img
                      style={{
                        objectFit: "cover",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                      }}
                      src={p.pictures[index]}
                      alt={`Place ${index + 1}`}
                  />
                )}
                {index < (p?.destinations?.length || 0) - 1 && (
                  <span style={{margin: "10px" }}>&rarr;</span> // 
                )}
              </div>
              <PlaceName>{p?.destinations[index]}</PlaceName>
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
        <PostDetail userId ={userId} p={p} likeNum={p?.likenum} />
      </Modal>
    </>
  );
};
