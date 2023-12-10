import styled from "@emotion/styled";
import searchLogo from "../../assets/searchLogo.png";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
    hashtags: string[];
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 550px;
    height: 100px;
    // margin-left: 200px;
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
    width: 550px;
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



export const Search:React.FC<SearchProps> = ({hashtags = []}) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchKeyword.trim() !== "") {
            // Enter키 눌렀을 때 동작 정의
            // 검색 결과 페이지로 이동하고 검색어 전달
            navigate(`/search-results/${encodeURIComponent(searchKeyword)}`);
        }
    };

    const handleHashtagClick = (hashtag: string) => {
        try {
            navigate(`/search-results/${encodeURIComponent(hashtag)}`);
        } catch (error) {
            console.error("Error fetching hashtag data", error);
        }
    };

    return (
        <Container>
            <SearchBarContainer>
                <SearchBar 
                    type="text" 
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                />
                <SearchLogo alt="searchImg" src={searchLogo} />
                <HashtagsContainer>
                    {hashtags.map((hashtag) => (
                        <HashtagButton
                            key={hashtag}
                            onClick={() => {
                                handleHashtagClick(hashtag); 
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