import styled from "@emotion/styled";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import axios from "axios";
import { PlaceWhenPost } from "../PlaceWhenPost";
import { ContentWhenPost } from "../ContentWhenPost";
import { SubmitAddPost } from "../SubmitAddPost";

interface AddPostProps {
    handleClose: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    width: 600px;
    height: 50px;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const AddPlaceWhenPostButton = styled(PlusCircleOutlined)`
    font-size: 30px;
    margin-bottom: 20px;
    width: 50px;
    heigth: 50px;
`;


export const AddPost: React.FC<AddPostProps> = ({handleClose}) => {
    const [placeImages, setPlaceImages] = useState<File[]>([]);
    const [placeNames, setPlaceNames] = useState<string[]>([]);

    const handleImageChange = (file: File, placeName: string) => {
        if (placeImages.length < 8) {
            setPlaceImages((prevImages) => [...prevImages, file]);
            setPlaceNames((prevNames) => [...prevNames, placeName]);
        }
    };

    const [placeComponents, setPlaceComponents] = useState([<PlaceWhenPost key={0} onImageChange={handleImageChange} />]);
    const [content, setContent] = useState('');

    

    const handleClick = () => {
        if (placeComponents.length < 8) {
            setPlaceComponents((prevComponents) => [
                ...prevComponents,
                <PlaceWhenPost key={prevComponents.length} onImageChange={handleImageChange} />,
            ]);
        }
    };

    const handleAddPost = async () => {
        try {
            // Post 정보를 서버로 전송
            // 작성한 사용자 객체
            // 첨부한 이미지와 글
            // 해시태그
            const formData = new FormData();

            formData.append("content", content);

            placeImages.forEach((image, index) => {
                formData.append(`placeImage${index + 1}`, image);
                formData.append(`placeName${index + 1}`, placeNames[index]);
            });

            // placeNames.forEach((placeName, index) => {
            //     formData.append(`placeName${index + 1}`, placeName);
            // });

            const response = await axios.post("/api/post", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            });

            console.log(response.data);
            alert("post 성공");
        } catch (error) {
            alert("post 실패" + error);
            console.log("post 실패", error);
        }
    };
    return (
        <Container>
            <Title>Create a Post</Title>
            {placeComponents}
            <AddPlaceWhenPostButton 
                onClick={handleClick}
                style={{display : placeComponents.length < 8 ? "block" : "none"}}
            />
            {placeComponents.length === 8 && <div>Reached the max number of destinations</div>}
            <ContentWhenPost setContent={setContent}/>
            <SubmitAddPost handleAddPost={handleAddPost}/>
        </Container>
    )
}