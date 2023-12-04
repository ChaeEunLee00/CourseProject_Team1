import styled from "@emotion/styled";
import closeButton from "../../assets/closebuttonimg.png"
import axios from 'axios';
import { useRef, useState } from "react";
import { FollowUser } from '../FollowUser';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
`;

const FindContainer = styled.div`
    width: 470px;
    height: 110px;
    background-color: white;
    position: absolute;
    top: 70px;
    left: 100px;
    padding: 10px;
    border: 1px solid #D9D9D9;
`;


const Title = styled.div`
    position: absolute;
    top: 20px;
    left: 50px;
    width: 400px;
    height: 80px;
    font-family: "Arial", sans-serif;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
`;

const NameInput = styled.input`
    position: absolute;
    top: 250px;
    left: 50px;
    width: 440px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid;
    padding-left: 15px;
`;

const SearchButton = styled.button`
    position: absolute;
    top: 245px;
    left: 550px;
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
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');

    const handleOnKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSearch();
        }
    }

    const onChange = (e) => {
        setUsername(e.target.value);
    };
 
    const handleSearch = async () => {
        axios
        .get("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/search/users/"+username)
        .then((response => {
            setId(response.data[0].id)
            console.log({id})
            if (id==undefined) {
                alert('No user');
            }
        }))
        .catch((error)=>{console.log(error); setId('');});
    }
    if (id == ''){
        return (
            <Container onKeyDown={handleOnKeyPress}>
                <Title>Search friend by name</Title>
                <NameInput onChange={onChange} value={username} placeholder="name or username"/>
                <SearchButton onClick={handleSearch}>Search</SearchButton>
                <CloseButton alt="close button" src={closeButton} onClick={onClose}/>
            </Container>
        )
    }
    return (
        <Container onKeyDown={handleOnKeyPress}>
            <Title>Search friend by name</Title>
            <FindContainer>
                <FollowUser id={id}/>
            </FindContainer>
            <NameInput onChange={onChange} value={username} placeholder="name or username"/>
            <SearchButton onClick={handleSearch}>Search</SearchButton>
            <CloseButton alt="close button" src={closeButton} onClick={onClose}/>
        </Container>
    )
}