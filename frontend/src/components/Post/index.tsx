import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { LikeButton } from "../LikeButton";
import axios from "axios";
import { useData } from "../../contexts/DataContext";
import { PostDetail } from "../PostDetail/container";
import { UserInfo } from "../UserInfo";

interface PostProps {
  readonly postId: string;
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
  width: 600px;
  border: 1px solid #d8d8d8;
  border-radius: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  // justify-content: flex-start;
  // padding-top: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  padding: 5px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TravelInfo = styled.div`
  font-size: 16px;
`;

const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // border: 1px solid #d8d8d8;
  cursor: pointer;

`;

const Place = styled.div`
  margin: 5px;
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


export const Post: React.FC<PostProps> = ({postId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState<Post>();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const response = await axios.get<Post>(
          `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}`
        );

        if (response.data) {
          setPost(response.data);
          setUserId(response.data.user_id);
          // const userResponse = await axios.get<User>(
          //   `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
          // );

          // setUser(userResponse.data);
        } else {
          console.error("Post data is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPostAndUser();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

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
          <LikeButton postId={postId}/>
        </Title>
        <Places onClick={openModal}>
          {[...Array(10)].map((_, index) => (
            <Place key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {post?.pictures && post.pictures.length > index && (
                  <img
                    src={post.pictures[index]}
                    alt={`Place ${index + 1}`}
                    width="120"
                    height="120"
                    style={{ borderRadius: "50%" }}
                  />
                )}
                {index < (post?.destinations?.length || 0) - 1 && (
                  <span style={{ marginLeft: "5px" }}>&rarr;</span>
                )}
              </div>
              <div>{post?.destinations[index]}</div>
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
        <PostDetail userId ={userId} postId={postId}/>
      </Modal>
    </>
  );
};
