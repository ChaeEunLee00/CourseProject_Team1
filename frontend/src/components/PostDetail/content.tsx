import React from "react";
import styled from "@emotion/styled";

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

interface PostDetailContentProps {
    post: Post | null;
}

const Container = styled.div``;

export const PostDetailContent:React.FC<PostDetailContentProps> = ({post}) => {
    const createMarkup = () => {
        return { __html: post?.content || ''};
    };

    return <Container dangerouslySetInnerHTML={createMarkup()} />;
}