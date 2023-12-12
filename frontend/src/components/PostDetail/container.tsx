import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PostDetailComment } from "./comment";
import { PostDetailContent } from "./content";
import { PostDetailHeader } from "./header";
import { PostDetailRoute } from "./route";
import axios from "axios";

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

interface Comment {
    id: string;
    creationDate: string;
    userId: string;
    content: string;
    postId: string;
}

interface PostDetailProps {
    postId: string;
    userId: string;
    likeNum: number | undefined;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const PostDetail:React.FC<PostDetailProps> = ({postId, userId, likeNum}) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("")


    useEffect(() => {
        const fetchPostAndUser = async () => {
            try {
                const response = await axios.get<Post>(
                    `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}`
                );
        
                if (response.data) {
                setPost(response.data);
                // const userId = response.data.user_id;
                // const userResponse = await axios.get<User>(
                //     `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`
                // );
        
                // setUser(userResponse.data);
                } else {
                console.error("Post data is undefined");
                }
            } catch (error) {
                    console.error("Error fetching data:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get<Comment[]>(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/comments`);
                setComments(response.data);
                // 디버깅
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
    // Call the fetchPosts function when the component mounts
    fetchPostAndUser();
    fetchComments();
    }, [comments]); // Empty dependency array ensures it runs only once when the component mounts

    const addComment = async () => {
        try {
            await axios.post(
                `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/comments`,
                {content: newComment}, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                        // "Authorization" : accessToken,
                        "Refresh" : refreshToken,
                    },
                // withCredentials: true
                }
            );
            const response = await axios.get<Comment[]>(`http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts/${postId}/comments`);
            setComments(response.data);
            setNewComment("");
            
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const deleteComment = async (userId : string, commentId : string) => {
        try {
            const userIdLogin = localStorage.getItem("userId");
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            await axios.delete(
                `http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/comments/${commentId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Refresh" : refreshToken,
                    },
                    withCredentials: true
                }
            );
        } catch (error) {
            console.log("Delete comment Error : ", error);
        }
    };

    return (
        <Container>
            <PostDetailHeader post={post} userId={userId} likeNum={likeNum}/>
            <PostDetailRoute post={post}/>
            <PostDetailContent post={post}/>
            <PostDetailComment 
                comments={comments} 
                newComment={newComment} 
                setNewComment={setNewComment} 
                addComment={addComment} 
                deleteComment={deleteComment}
            />
        </Container>
    )
}