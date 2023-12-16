import styled from '@emotion/styled';
import GoogleImg from '../../assets/googleLogo.png';
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

interface Props {
    readonly className: string;
}

const Container = styled.a`
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

const LoginText = styled.a`
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

const GoogleLogo = styled.img`
    height: 32px;
    object-fit: cover;
    // width: 39px;
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

    // const handleLogin = async () => {
    //     try {
    //         console.log(1);
    //         const response = await axios.get<User>('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google',
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 withCredentials: true
    //             }
    //         );
            
    //         console.log("response : ", response);
    //         alert('Signup succesfully');

    //     } catch (error) {
    //         console.log('Signup fail', error);
    //         alert('Signup Fail');
    //     }
    // };

    return (
        // <Container onClick={handleLogin} className={`social-login ${className}`}>
        <Container href='http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google' className={`social-login ${className}`}>
            <GoogleLogo src={GoogleImg} />
            <LoginText>Continue with google</LoginText>
        </Container>
    );
}

// export const SocialLogin = () => {
//     const clientId = '135931039101-e336dl04g4qgj5btod68qghuvm4n0ds2.apps.googleusercontent.com'
//     return (
//         <>
//             <GoogleOAuthProvider clientId={clientId}>
//                 <GoogleLogin
//                     onSuccess={(res) => {
//                         console.log(res);
//                         if (res.credential !== undefined) {
//                             const USER_CREDENTIAL = jwtDecode(res.credential);
//                             console.log(USER_CREDENTIAL);
//                         }
//                     }}
//                     onError={() => {
//                         console.log("login failed");
//                     }}
//                 />
//             </GoogleOAuthProvider>
//         </>
//     );
// };