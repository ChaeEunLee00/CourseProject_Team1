import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { PlaceWhenPost } from "../PlaceWhenPost";
import { ContentWhenPost } from "../ContentWhenPost";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    width: 600px;
    height: 50px;
    font-size: 35px;
    font-weight: bold;
`;

export const AddPost = () => {
    const [placeImage, setPlaceImage] = useState<File | null>(null);
    const [content, setContent] = useState('');

    const handleImageChange = (file: File) => {
        setPlaceImage(file);
    };

    const handleAddPost = async () => {
        try {
            // Post 정보를 서버로 전송
            // 작성한 사용자 객체
            // 첨부한 이미지와 글
            // 해시태그
            const formData = new FormData();

            formData.append("content", content);
            
            if (placeImage) {
                formData.append("placeImage", placeImage);
            }

            const response = await axios.post("/api/post", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            });

            console.log(response.data);
        } catch (error) {
            console.log("post 실패", error);
        }
    };
    return (
        <Container>
            <Title>Create a Post</Title>
            <PlaceWhenPost onImageChange={handleImageChange} />
            <ContentWhenPost setContent={setContent}/>
        </Container>
    )
}