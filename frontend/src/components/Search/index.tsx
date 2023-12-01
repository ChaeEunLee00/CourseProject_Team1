import styled from "@emotion/styled";
import searchLogo from "../../assets/searchLogo.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // left: 345px;
    // top: 0;
    width: 500px;
    height: 80px;
    margin-left: 140px;
    z-index: 1000;
`;


const SearchBarContainer = styled.div`
    position: relative;
`;

const SearchBar = styled.input`
    border: 1px solid #D8D8D8;
    border-radius: 10px;
    width: 450px;
    height: 12px;
    padding: 8px;
    padding-left: 45px; /* 돋보기 이미지를 고려한 왼쪽 패딩 추가 */
`;

const SearchLogo = styled.img`
    position: absolute;
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px; /* 이미지 크기 조정 */
    height: 50px;
`;



export const Search = () => {
    return (
        <Container>
            <SearchBarContainer>
                <SearchBar type="text" placeholder="Search" />
                <SearchLogo alt="searchImg" src={searchLogo} />
            </SearchBarContainer>
        </Container>
    )
}