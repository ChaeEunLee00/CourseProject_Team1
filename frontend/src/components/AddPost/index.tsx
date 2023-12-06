import styled from "@emotion/styled";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlaceWhenPost } from "../PlaceWhenPost";
import { ContentWhenPost } from "../ContentWhenPost";
import { SubmitAddPost } from "../SubmitAddPost";
import { AddHashtag } from "../AddHashtag";

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

const MainRegionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 600px;
    height: 60px;
    align-items: center;
    justify-content: center;
`;

const MainRegionText = styled.div`
    width: 180px;
    height: 50px;
    font-size: 25px;
    font-weight: bold;
`;

const MainRegionInput = styled.input`
    width: 300px;
    height: 25px;
    padding-left: 5px;
    margin-bottom: 12px;
`;

const AddPlaceWhenPostButton = styled(PlusCircleOutlined)`
    font-size: 30px;
    margin-bottom: 20px;
    width: 50px;
    heigth: 50px;
`;

const TripDurationContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 600px;
    height: 60px;
    align-items: center;
    justify-content: center;
`;

const TripDurationText = styled.div`
    width: 180px;
    height: 50px;
    font-size: 25px;
    font-weight: bold;
`;

const TripDurationInput = styled.input`
    width: 300px;
    height: 25px;
    padding-left: 5px;
    margin-bottom: 12px;
`;

interface AddPostProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalState: Dispatch<SetStateAction<number>>;
}

export const AddPost:React.FC<AddPostProps> = ({setIsModalOpen, setModalState}) => {
    // AddPost에서 서버로 보내줘야 하는 데이터
    // content, city, duration, hashtags, destinations,
    // header에 token,pictures
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const [content, setContent] = useState('');
    const [city, setCity] = useState('');
    const [duration, setDuration] = useState(1);
    const [placeImageUrls, setPlaceImageUrls] = useState<string[]>([]);
    // destinations == placeNames
    const [placeNames, setPlaceNames] = useState<string[]>([]);
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleImageChange = (placeImage: string, placeName: string) => {
        if (placeImageUrls.length < 8) {
            setPlaceImageUrls((prevImages) => [...prevImages, placeImage]);
            setPlaceNames((prevNames) => [...prevNames, placeName]);
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }
    
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value));
    }

    // 버튼 누를 때마다 PlaceWhenPost 하나씩 추가하기 위한 변수(서버로 보내지지 않음)
    const [placeComponents, setPlaceComponents] = useState([<PlaceWhenPost key={0} onImageChange={handleImageChange} />]);
    

    

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
            const data = {
                "city": city,
                "duration": duration,
                "destinations": placeNames,
                "content": content,
                "hashtags": hashtags,
                "pictures": placeImageUrls,
            }

            const response = await axios.post("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/posts", data, {
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + accessToken,
                    "Refresh" : refreshToken,
                },
                withCredentials: true
            });

            console.log(response.data);
            alert("post 성공");
            setModalState(1);
            setIsModalOpen(false);
        } catch (error) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요");
            console.log("post 실패", error);
        }
    };
    return (
        <Container>
            <Title>Create a Post</Title>
            <MainRegionContainer>
                <MainRegionText>Main Region :</MainRegionText>
                <MainRegionInput type="text" onChange={handleCityChange} placeholder="Enter the main city or country during your trip"/>
            </MainRegionContainer>
            <TripDurationContainer>
                <TripDurationText>Trip Duration :</TripDurationText>
                <TripDurationInput type="number" onChange={handleDurationChange} placeholder="(     ) Days ?" />
            </TripDurationContainer>
            {placeComponents}
            <AddPlaceWhenPostButton 
                onClick={handleClick}
                style={{display : placeComponents.length < 8 ? "block" : "none"}}
            />
            {placeComponents.length === 8 && <div>Reached the max number of destinations</div>}
            <ContentWhenPost setContent={setContent}/>
            <AddHashtag setHashtags={setHashtags} hashtags={hashtags} />
            <SubmitAddPost handleAddPost={handleAddPost}/>
        </Container>
    )
}