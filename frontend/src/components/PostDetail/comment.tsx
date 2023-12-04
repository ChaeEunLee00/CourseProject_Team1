import React from "react";
import styled from "@emotion/styled";

const Container = styled.div``;

interface Comment {
    id: string;
    creationDate: string;
    userId: string;
    content: string;
    postId: string;
}

interface PostDetailCommentProps {
    comments: Comment[];
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;
    addComment: () => void;
}

export const PostDetailComment: React.FC<PostDetailCommentProps> = ({ comments, newComment, setNewComment, addComment }) => {
    return (
        <Container>
            {/* 기존 댓글 목록 표시 */}
            {comments.map((comment) => (
                <div key={comment.id}>{comment.content}</div>
            ))}

            {/* 새로운 댓글 작성 UI */}
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={addComment}>댓글 추가</button>
        </Container>
    );
};
