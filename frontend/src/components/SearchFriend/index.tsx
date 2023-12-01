import styled from "@emotion/styled";
import closeButton from "../../assets/closebuttonimg.png"

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
`;

const Title = styled.div`
    position: absolute;
    top: 20px;
    left: 50px;
    width: 400px;
    height: 80px;
    font-family: "Arial", sans-serif;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
`;

const NameInput = styled.input`
    position: absolute;
    top: 100px;
    left: 50px;
    width: 590px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid;
    padding-left: 15px;
`;

const SearchButton = styled.button`
    position: absolute;
    top: 180px;
    left: 310px;
    width: 80px;
    height: 40px;
    cursor: pointer;
    color: black;
    background-color: #D8D8D8;
    outline: none;
    text-align: center;
    padding-left: 14px;
`;

const CloseButton = styled.img`
    position: absolute;
    left: 630px;
    width: 45px;
    height: 45px;
`;

interface SearchFriendProps {
    onClose: () => void;
}

export const SearchFriend: React.FC<SearchFriendProps> = ({onClose}) => {
    return (
        <Container>
            <Title>Search friend by name</Title>
            <NameInput placeholder="name or username"/>
            <SearchButton>Search</SearchButton>
            <CloseButton alt="close button" src={closeButton} onClick={onClose}/>
        </Container>
    )
}