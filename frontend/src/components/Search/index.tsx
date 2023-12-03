import styled from "@emotion/styled";
import searchLogo from "../../assets/searchLogo.png";
import React from "react";
import { useState } from "react";

interface SearchProps {
    hashtags: string[];
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // left: 345px;
    // top: 0;
    width: 550px;
    height: 100px;
    margin-left: 200px;
    z-index: 1000;
`;


const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchBar = styled.input`
    border: 1px solid #D8D8D8;
    border-radius: 10px;
    width: 540px;
    height: 12px;
    padding: 8px;
    padding-left: 45px; /* 돋보기 이미지를 고려한 왼쪽 패딩 추가 */
`;

const SearchLogo = styled.img`
    position: absolute;
    left: 1px;
    top: 25%;
    transform: translateY(-50%);
    width: 50px; /* 이미지 크기 조정 */
    height: 50px;
`;

const HashtagsContainer = styled.div`
    width: 450px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 72px;
`;

const HashtagButton = styled.button`
    width: 80px;
    height: 30px;
    cursor: pointer;
    margin-right: 40px;
    background: none;
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    padding: 0;
    border: none;
`;



export const Search:React.FC<SearchProps> = ({hashtags}) => {
    const [selectedHashtag, setSelectedHashtag] = useState('');

    const handleHashtagClick = async (hashtag: string) => {
        try {
            const response = await fetch(`http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/hashtags/${hashtag}`);
            const data = await response.json();
            // main page update
            console.log(data.postIdList);
        } catch (error) {
            console.error("Error fetching hashtag data", error);
        }
    };

    return (
        <Container>
            <SearchBarContainer>
                <SearchBar type="text" placeholder="Search" />
                <SearchLogo alt="searchImg" src={searchLogo} />
                <HashtagsContainer>
                    {hashtags.map((hashtag) => (
                        <HashtagButton
                            key={hashtag}
                            onClick={() => {
                                setSelectedHashtag(hashtag)
                                handleHashtagClick(selectedHashtag)
                            }}
                        >
                            #{hashtag}
                        </HashtagButton>
                    ))}
                </HashtagsContainer>
            </SearchBarContainer>
        </Container>
    )
}