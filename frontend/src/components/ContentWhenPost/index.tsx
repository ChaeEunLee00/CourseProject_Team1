import styled from "@emotion/styled";
import React, { SetStateAction } from "react";

interface ContentWhenPostProps {
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.textarea`
    width: 600px;
    height: 400px;
    border: 1px solid #D8D8D8;
    padding: 10px;
    font-family: 'Arial', sans-serif;
    overflow: auto;
    resize: none;
`;

export const ContentWhenPost: React.FC<ContentWhenPostProps> = ({setContent}) => {
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
      };
    
    return (
        <Container onChange={handleContentChange}/>
    )
}