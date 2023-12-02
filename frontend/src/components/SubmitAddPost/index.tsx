import styled from "@emotion/styled";
import React from "react";

interface SubmitAddPostProps {
    handleAddPost: () => Promise<void>;
}

const Container = styled.button`
    background-color: #D8D8D8;
    width: 80px;
    height: 40px;
    margin-top: 20px;
    font-weight: 0.5px;
`;

export const SubmitAddPost: React.FC<SubmitAddPostProps> = ({handleAddPost}) => {
    return (
        <Container onClick={handleAddPost}>Save</Container>
    )
}