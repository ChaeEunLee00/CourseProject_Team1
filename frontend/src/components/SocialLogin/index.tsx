import styled from '@emotion/styled';
import KakaotalkImg from '../../assets/kakaotalk_sharing_btn_medium.png';
import GoogleImg from '../../assets/googleLogo.png';
import FacebookImg from '../../assets/googleLogo.png';//페이스북_로고_심볼형_RGB.png';
import axios from "axios";
import { Link } from "react-router-dom";

interface Props {
    readonly className: string;
}

const Container = styled.button`
    border: 1px solid #D8D8D8;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 290px;
    left: 33px;
    margin-top: 340px;
    position: absolute;
    transition: background-color 0.3s ease; /* 효과를 부드럽게 만듦 */
    cursor: pointer;
    &:hover {
        background-color: #EEEEEE;
    }
    background-color: #FFFFFF;
    border: 1px solid #D8D8D8;

`;

const LoginText = styled.div`
    // -webkit-text-stroke: 0.5px #ffffff;
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 23px;
    text-align: center;
    padding-left: 10px;
    // width: 72px;
`;

const KakaotalkLogo = styled.img`
    height: 33px;
    object-fit: cover;
    width: 33px;
`;

const GoogleLogo = styled.img`
    height: 32px;
    object-fit: cover;
    // width: 39px;
`;

const FacebookLogo = styled.img`
    height: 32px;
    object-fit: cover;
    width: 32px;
`;

interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    imageurl: string;
    followerlist: [];
    followinglist: [];
    likedposts: [];
    myposts: [];
}

export const SocialLogin = ({className}: Props) => {

    const handleLogin = async () => {
        try {
            const response = await axios.get<User>('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google');
            
            console.log(response)
            alert('Signup succesfully');

        } catch (error) {
        console.log('Signup fail', error);
        alert('Signup Fail');
        }
    };

    return (
        <Container onClick={handleLogin} className={`social-login ${className}`}>
            <GoogleLogo src={GoogleImg} />
            <LoginText>Continue with google</LoginText>
        </Container>
    );
}