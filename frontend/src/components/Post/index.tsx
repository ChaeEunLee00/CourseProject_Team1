import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { LikeButton } from "../LikeButton";
import axios from "axios";
import { useData } from "../../contexts/DataContext";

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
`;

const Username = styled.div`
  font-weight: bold;
`;

const TravelInfo = styled.div`
  font-size: 16px;
`;

const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

// PostDetail 컴포넌트 스타일
const DetailContainer = styled.div``;

export const Post: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const displayPosts = posts;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/posts"
        );
        setPosts(response.data);
        console.log("Fetched Posts:", response.data);
        const userIds = response.data.map((post) => post.user_id);
        console.log("User IDs:", userIds);

        // Extract unique user IDs from posts
        const uniqueUserIds = [
          ...new Set(response.data.map((post) => post.user_id)),
        ];

        // Fetch user details for each unique user ID
        const userPromises = uniqueUserIds.map((user_id) =>
          axios.get<User>(
            `http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/users/${user_id}`
          )
        );

        // Wait for all user details to be fetched
        const usersData = await Promise.all(userPromises);

        // Set the users state with fetched user details
        setUsers(usersData.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {displayPosts.map((p) => (
        <Container key={p.id}>
          <Title>
            <UserInfo>
              <ProfilePicture
                src={
                  users.find((user) => user.id === p.user_id)?.imageurl || "X"
                }
              />
              <Username>
                {users.find((user) => user.id === p.user_id)?.username ||
                  "Unknown User"}
              </Username>
            </UserInfo>
            <TravelInfo>
              {p.city}, {p.duration} Days
            </TravelInfo>
            <LikeButton />
          </Title>
          <Places onClick={openModal}>
            {[...Array(10)].map((_, index) => (
              <Place key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {p.pictures && p.pictures.length > index && (
                    <img
                      src={p.pictures[index]}
                      alt={`Place ${index + 1}`}
                      width="120"
                      height="120"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  {index < p.destinations.length - 1 && (
                    <span style={{ marginLeft: "5px" }}>&rarr;</span>
                  )}
                </div>
                <div>{p.destinations[index]}</div>
              </Place>
            ))}
          </Places>
        </Container>
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Post Detail Modal"
      >
        <DetailContainer></DetailContainer>
      </Modal>
    </>
  );
};
//export default Post;
