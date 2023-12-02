import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { ProfilePictureShow } from '../ProfilePictureShow';
import Modal from "react-modal";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;
`;

const UserShow = styled.div`
    display: flex;
    flex-direction: row;
    // display: flex;
    // justify-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    // border: 1px solid #D9D9D9;
    width: 450px;
`;

const UserPicture = styled.div`
    text-align: center;    
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #D9D9D9;
`;

const Username = styled.div`
    display: flex;
    flex-direction: column;
    // display: flex;
    // justify-content: center;
    align-items: center;
    
    // border: 1px solid #D9D9D9;
`;

const DeleteButton = styled.div`
    background-color: #E0E0E0;
    border-radius: 8px;
    height: 30px;
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
`;

export const FollowList = ({ ing }: { ing: boolean }) => {
    if (ing) {
        return (
            <Container>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        최갤럭시
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>

                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>
                <UserShow>
                    <UserPicture/>
                    <Username>
                        김수한무거북이와두루미
                    </Username>
                    <DeleteButton>
                        Delete
                    </DeleteButton>
                </UserShow>

            </Container>
        )
    }
    return(
        <Container>
            <Username>
                찐따.
            </Username>
        </Container>
    )
}