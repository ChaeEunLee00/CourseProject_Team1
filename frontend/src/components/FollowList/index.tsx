import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';
import { FollowUser } from '../FollowUser';
import Modal from "react-modal";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;
`;

export const FollowList = ({ ing }: { ing: boolean }) => {
    const [followingList, setFollowingList] = useState<string[] | null>(null);
    const [followerList, setFollowerList] = useState<string[] | null>(null);
    
    const userId = localStorage.getItem('userId');
    axios
    .get("http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
    .then((response => {
        setFollowingList(response.data.followinglist)
        setFollowerList(response.data.followerlist)
    }))
    .catch((error)=>console.log(error.response.data));

    if (ing) {
        if (followingList == null){
            return(
                <Container>
                    No Following
                </Container>
            )
        }
        return(
            <Container>
                {followingList.map((id, index) => (
                    <FollowUser id={id}/>
                ))}
            </Container>
        )
    }
    else{
        if (followerList == null){
            return(
                <Container>
                    No Follower
                </Container>
            )
        }
        return(
            <Container>
                {followerList.map((id, index) => (
                    <FollowUser id={id}/>
                ))}
            </Container>
        )
    }
}