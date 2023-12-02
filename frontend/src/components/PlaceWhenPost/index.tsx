import styled from "@emotion/styled";
import { PictureOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";

// Place 사진과 이름, 사진을 추가하는 버튼까지 

interface PlaceWhenPostProps {
    onImageChange: (file: File, placeName: string) => void;
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


export const PlaceWhenPost: React.FC<PlaceWhenPostProps> = ({onImageChange}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [placeName, setPlaceName] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            onImageChange(file, placeName);

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };
    
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Container>
            <ImageContainer onClick={handleButtonClick}>
                {imageUrl ? (
                    <PlaceImage src={imageUrl} alt="place" />
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
        </Container>
    )
}