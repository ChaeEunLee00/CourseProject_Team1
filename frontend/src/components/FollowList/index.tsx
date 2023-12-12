import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FollowUser } from '../FollowUser';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;
`;

interface FollowListProps {
    ing: boolean;
    readonly userId: string | undefined;
}

export const FollowList: React.FC<FollowListProps> = ({ ing, userId}) => {
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    useEffect(() => {
        axios
        .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/"+userId)
        .then((response => {
            setFollowingList(response.data.followinglist)
            setFollowerList(response.data.followerlist)
            
            console.log(1)
        }))
        .catch((error)=>console.log(error.response.data));
    }, [])
    if (ing) {
        if (followingList.length == 0){
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
        if (followerList.length == 0){
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