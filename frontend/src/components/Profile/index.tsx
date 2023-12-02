import styled from '@emotion/styled';
// import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfilePictureShow } from '../ProfilePictureShow';
import { MyProfileButton } from '../MyProfileButton';
import { useState } from "react";
import Modal from "react-modal";
import { FollowList } from '../FollowList';
import axios from 'axios';

const Container = styled.div`
    background-color: #FFFFFF;
    position: fixed;
    top: 80px;
    left: 0;    
    width: 400px;
    height: 80%;
    padding: 10px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;

    // border: 1px solid #D9D9D9;
`;  

const Text = styled.div`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    text-align: center;
    padding: 15px; 
    // border: 1px solid #D9D9D9;
    // cursor: pointer; 
`;

const TextNotSelected = styled.div`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    text-align: center;
    padding: 10px;
    // border: 1px solid #D9D9D9;
    cursor: pointer; 
    &:hover {
        opacity: 60%;
    }
`;

const TextSelected = styled.div`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    text-align: center;
    width: 120px;
    padding-bottom : 20px;
  
    border-bottom: 2px solid #000000;

    // border: 1px solid #D9D9D9;
    cursor: pointer; 
    &:hover {
        opacity: 60%;
    }
`;

const FollowContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;   
    display: flex;
    justify-content: center;
    padding: 20px;
    // border: 1px solid #D9D9D9;
`;

const FollowInnerContainer = styled.div`
    // border: 1px solid #D9D9D9;

    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 23px;
    margin-right: 10px;
    margin-left: 10px;
    text-align: center;

    cursor: pointer;
    &:hover {
        opacity: 60%;
    }

`;

const FollowTitleContainer = styled.div`
    // width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;   
    display: flex;
    justify-content: center;
    padding: 20px;
    border-bottom: 1px solid #D9D9D9;
    // text-align: center;
    justify-content: space-around;
    margin-bottom: 10px;
`;

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "500px",
        height: "600px",
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
    }
}

export const Profile = ({ Picture }: { Picture: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ShowFollowing, setIsFollowing] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [imageURL, setImage] = useState<string | null>(null);
    const [followingNum, setFollowingNum] = useState<number | null>(null);
    const [followerNum, setFollowerNum] = useState<number | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openFollowing = () => {
        setIsFollowing(true);
    };

    const openFollower = () => {
        setIsFollowing(false);
    };

    const userId = localStorage.getItem('userId');
    // const accessToken = localStorage.getItem('accessToken');        
    axios
    .get("http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
    .then((response => {
        setUsername(response.data.username)
        setImage(response.data.imageurl)
        setFollowingNum(response.data.followinglist.length)
        setFollowerNum(response.data.followerlist.length)
    }))
    .catch((error)=>console.log(error.response.data));

    //팔로잉
    if (ShowFollowing){
        return (
            <>
            <Container>
                <ProfilePictureShow Picture = {imageURL}/>
                <Text>{username}</Text>
                <FollowContainer>
                    <FollowInnerContainer onClick={() => {openModal();openFollowing();}}>
                        <Text>{followingNum}</Text>
                        <Text>following</Text>
                    </FollowInnerContainer>
                    <FollowInnerContainer onClick={() => {openModal();openFollower();}}>
                        <Text>{followerNum}</Text>
                        <Text>follower</Text>
                    </FollowInnerContainer>
                </FollowContainer>
                <MyProfileButton/>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="My Profile"
            >
                <FollowTitleContainer>
                    <TextSelected>Following</TextSelected>
                    <TextNotSelected onClick={openFollower}>Follower</TextNotSelected>
                </FollowTitleContainer>
                <FollowList ing={true}/>
            </Modal>
            </>
        )
    }
    // 팔로워
    return (
        <>
        <Container>
            <ProfilePictureShow Picture = {imageURL}/>
            <Text>{username}</Text>
            <FollowContainer>
                <FollowInnerContainer onClick={() => {openModal();openFollowing();}}>
                    <Text>{followingNum}</Text>
                    <Text>following</Text>
                </FollowInnerContainer>
                <FollowInnerContainer onClick={() => {openModal();openFollower();}}>
                    <Text>{followerNum}</Text>
                    <Text>follower</Text>
                </FollowInnerContainer>
            </FollowContainer>
            <MyProfileButton/>
        </Container>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="My Profile"
        >
            <FollowTitleContainer>
                <TextNotSelected onClick={openFollowing}>Following</TextNotSelected>
                <TextSelected>Follower</TextSelected>
            </FollowTitleContainer>
            <FollowList ing={false}/>
        </Modal>
        </>
    )
    
}