import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import axios from "axios";

// Place 사진과 이름, 사진을 추가하는 버튼까지 

interface PlaceWhenPostProps {
    onImageChange: (placeImage: string, placeName: string) => void;
}

const Container = styled.div`
    width: 600px;
    height: 120px;
    display: flex;
    justify-content: center;
`;

const ImageContainer = styled.div`
    border: 1px solid #D8D8D8;
    height: 100px;
    width: 100px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PlaceImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const PlaceImageIcon = styled(PictureOutlined)`
    font-size: 50px;
`;

const HiddenPictureInput = styled.input`
    display: none;
`;

const PlaceName = styled.input`
    width: 150px;
    height: 20px;
    margin-top: 35px;
    margin-left: 40px;
`;

const SaveButton = styled.button`
    width: 50px;
    height: 30px;
    background-color: #D8D8D8;
    text-align: center;
    padding: 0;
    margin-top: 32px;
    margin-left: 40px;
`;

export const PlaceWhenPost: React.FC<PlaceWhenPostProps> = ({onImageChange}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [realImageUrl, setRealImageUrl] = useState<string>('');
    const [tmpImageUrl, setTmpImageUrl] = useState<string | null>(null);
    const [placeName, setPlaceName] = useState<string>('');

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/upload', formData);
            setRealImageUrl(response.data);
            
            const tmpImageUrl = URL.createObjectURL(file);
            setTmpImageUrl(tmpImageUrl);
        }
    };
    
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveButtonClick = () => {
        if (realImageUrl && placeName) {
            onImageChange(realImageUrl, placeName);
            alert("사진이 첨부되었습니다!");
        } else {
            alert("Please attach an image and fill in the place name.");
        }
        
    }

    return (
        <Container>
            <ImageContainer onClick={handleButtonClick}>
                {tmpImageUrl ? (
                    <PlaceImage src={tmpImageUrl} alt="place" />
                ) : (
                    <PlaceImageIcon />
                )}
                <HiddenPictureInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                />
            </ImageContainer>
            <PlaceName
                type="text"
                placeholder="Place Name"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <SaveButton onClick={handleSaveButtonClick}>저장</SaveButton>
        </Container>
    )
}