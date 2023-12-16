import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  background: none;
`;

const InnerContainer = styled.button`
    display: flex;
    align-items: center;
    background: none;
    
`;
const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid #EEEEEE;

`;

const Username = styled.div<{length: number}>`
  font-weight: bold;
  font-size: 13px;
  padding-left: 0px;
  padding-top: 0px;
  text-align: left;
  width: ${(props) => 50 + props.length * 5}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.div`
    border-radius: 8px;
    height: 25px;
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    color: #606060;
    font-family: "Inter-Regular", Helvetica;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.57px;
    line-height: 34.5px;

    &:hover {
        opacity: 80%;
    }
    margin-left: 0px;
`;

let follow = {
    backgroundColor: "#F0F0F0"
}

// let unfollow = {
//     backgroundColor: "#CCCCCC"
// }

interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    imageurl: string;
    followerlist: string[];
    followinglist: string[];
    likedposts: [];
    myposts: [];
}

interface UserInfoProps {
    readonly userId: string;
}

export const UserInfo:React.FC<UserInfoProps> = ({userId}) => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const myUser = localStorage.getItem('userId');
    const [myFollowingList, setMyFollowingList] = useState<string[]>([]);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const handleUserInfoClick = (userId: string) => {
        try {
            navigate(`/profile/${encodeURI(userId)}`);
        } catch (error) {
            console.error("Error userInfo Click");
        }
    };

    const handleFollowing = async () => {
        try{
            const response = await axios
            .post(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}/follow`,
            null,
            {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            });

            console.log(response.data);
            setMyFollowingList(response.data.followinglist);
        } catch(error){
            console.log(error);
            alert('세션이 만료되었습니다. 다시 로그인해주세요..!');
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const response = await axios.get<User>(
                        `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                    );
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error fetching user : ", error);
            }
        }
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const myUserResponse = await axios.get<User>(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${myUser}`
                );
                console.log(myUser);
                // setMyFollowingList(myUserResponse.data.followinglist);
                if (myUserResponse.data.followinglist && myUser) {
                    setMyFollowingList([...myUserResponse.data.followinglist, myUser]);
                }

                console.log("myFollowingList in UserInfo.tsx", myFollowingList);
            } catch (error) {
                console.log("Error fetching following list : ", error);
            }
        };
        fetchFollowingList();
    }, [Button])
    return (
        <Container>
            <InnerContainer 
                onClick={() => {
                    handleUserInfoClick(userId);
                }}
            >
                <ProfilePicture 
                    src={
                        user?.imageurl || "X"
                    }
                />
                <Username length={user?.username?.length || 0}>
                    {user?.username || "Unknown User"}
                </Username>
            </InnerContainer>
            {myFollowingList.includes(userId)
            ? <div></div>
            : <Button onClick={handleFollowing} style={follow}>
                Follow
              </Button>
            }
        </Container>
    )
}