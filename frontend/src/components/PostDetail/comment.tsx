import React from "react";
import styled from "@emotion/styled";
import { UserInfo } from "../UserInfo";


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
    deleteComment: (userId: string, commentId: string) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Title = styled.div`
    border-bottom: 1px solid #D8D8D8;
    width: 700px;
    margin-bottom: 20px;
    padding-bottom: 10px;
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

const Comment = styled.div`
    width: 500px;
    font-size: 13px;
`;

const DeleteCommentButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: white;
    font-size: 10px;
`;


const NewCommentContainer = styled.div`
    width: 700px;
    height: 30px;
    display: flex;
    gap: 30px;
`;

const NewCommentInput = styled.textarea`
    width: 600px;
`;

const NewCommentButton = styled.button`
    font-size: 10px;
    background-color: #D8D8D8;
`;

export const PostDetailComment: React.FC<PostDetailCommentProps> = ({ comments, newComment, setNewComment, addComment, deleteComment }) => {
    const userId = localStorage.getItem("userId");
    
    return (
        <Container>
            <Title>Comments</Title>
            {/* 기존 댓글 목록 표시 */}
            <CommentsContainer>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <UserInfo userId={comment.userId} />
                        <Comment key={comment.id}>{comment.content}</Comment>
                        {userId === comment.userId && (
                            <DeleteCommentButton onClick={() => deleteComment(comment.userId, comment.id)}>
                                삭제
                            </DeleteCommentButton>
                        )}
                    </div>
                ))}
            </CommentsContainer>
            {/* 새로운 댓글 작성 UI */}
            <NewCommentContainer>
                <NewCommentInput 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="댓글 추가.."
                    // onKeyDown={(e) => {
                    //     if (e.key === "Enter") {
                    //         e.preventDefault();
                    //         addComment();
                    //     }
                    // }}
                />
                <NewCommentButton onClick={addComment}>등록</NewCommentButton>
            </NewCommentContainer>
        </Container>
    );
};
