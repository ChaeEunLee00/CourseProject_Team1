import styled from '@emotion/styled';
// import { WanderWorldLogo } from '../WanderWorldLogo';
import { ProfilePictureShow } from '../ProfilePictureShow';
import { MyProfileButton } from '../MyProfileButton';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FollowList } from '../FollowList';
import axios from 'axios';
import { MyProfile } from "../MyProfile";

const Container = styled.div`
    background-color: #FFFFFF;
    position: fixed;
    top: 120px;
    left: 0;    
    width: 300px;
    height: 80%;
    padding: 10px;
    padding-top: 40px;
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
const ProfileContainer = styled.div`
    background-color: #B1D2E8;
    border-radius: 13px;
    height: 40px;
    width: 200px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
        opacity: 80%;
    }
`;
const ProfileText = styled.div`
    color: #034070;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.57px;
    line-height: 34.5px;
    text-align: center;
    vertical-align: center;
    // border: 1px solid #D9D9D9;
`;

interface ProfileProps {
    readonly userId: string | undefined;
}

export const Profile: React.FC<ProfileProps> = ({userId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ShowFollowing, setIsFollowing] = useState(true);
    const [username, setUsername] = useState('');
    const [imageURL, setImage] = useState('');
    const [followingNum, setFollowingNum] = useState([]);
    const [followerNum, setFollowerNum] = useState([]);
    const myUserId = localStorage.getItem('userId');


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("close modal");
        useEffect;
        setIsModalOpen(false);
    };

    const openFollowing = () => {
        setIsFollowing(true);
        console.log(followingNum)
    };

    const openFollower = () => {
        setIsFollowing(false);
    };
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    useEffect(() => {
        try {
            
            // const accessToken = localStorage.getItem('accessToken');        
            const response = axios
            .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
            .then((response => {
                setUsername(response.data.username)
                setImage(response.data.imageurl)
                setFollowingNum(response.data.followinglist.length)
                setFollowerNum(response.data.followerlist.length)
            }));
        } catch (error) {
            console.log(error);
        }
    }, [isModalOpen, isEditOpen])
    console.log(isModalOpen)
    
    return (
        <>
        <Container>
            <ProfilePictureShow picture={imageURL}/>
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
            {/* <MyProfileButton/> */}
            {myUserId === userId
            ? <ProfileContainer onClick={openEdit}>
                <ProfileText>My Profile</ProfileText>
             </ProfileContainer>
            : <div></div>
            }
        </Container>
        <Modal
                isOpen={isEditOpen}
                onRequestClose={closeEdit}
                style={customModalStyles}
                contentLabel="My Profile"
        >
                <MyProfile/>
        </Modal>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="My Profile"
        >   
        {
            ShowFollowing
            ?
            <>
            <FollowTitleContainer>
                <TextSelected>Following</TextSelected>
                <TextNotSelected onClick={openFollower}>Follower</TextNotSelected>
            </FollowTitleContainer>
            <FollowList ing={true} userId={userId}/>
            </>
            :
            <>
            <FollowTitleContainer>
                <TextNotSelected onClick={openFollowing}>Following</TextNotSelected>
                <TextSelected>Follower</TextSelected>
            </FollowTitleContainer>
            <FollowList ing={false} userId={userId}/>
            </>
        }
        </Modal>
        </>
    )    
}