import styled from "@emotion/styled";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import axios from "axios";
import { WanderWorldLogo } from "../WanderWorldLogo";
import { SignupButton } from "../SignupButton";
import { UsernameForm } from "../UsernameForm";
import { NameForm } from "../NameForm";
import { PasswordForm } from "../PasswordForm";
import { OrText } from "../OrText";
import { SocialLogin } from "../SocialLogin";
import { ToLogin } from "../ToLogin";
import { AddProfileImg } from "../AddProfileImg";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    height: 600px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InnerContainer = styled.div`
    border: 1px solid #D8D8D8;
    background-color: #ffffff;
    height: 554px;
    width: 350px;
    position: relative;
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

export const SignupBox = () => {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const {password, setPassword} = useData();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const passwordLength = password.length;
    const navigate = useNavigate();

    const handleFileChange = (file : File) => {
        setProfileImage(file);
    };

    const handleSignup = async () => {
        try {
            // 회원가입 정보를 서버로 전송
            const requestData = {
                username,
                name,
                password,
                profileImage: profileImage ? profileImage : null,
            };

            const response = await axios.post("http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users", requestData, {
                headers: {
                    "Content-Type": "application/json", // 파일 전송 시 필요한 헤더
                },
                withCredentials: true
            }
            );

            // 서버 응답 처리(현재는 콘솔에 데이터를 출력)
            console.log(response.data)
            
            const loginResponse = await axios.post('http://ec2-52-79-243-141.ap-northeast-2.compute.amazonaws.com:8080/users/login', {username, password}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
                }
            );

            // const userId = response.data.id;
            console.log(loginResponse.data);
            // 세션 ID를 localge에 저장
            localStorage.setItem('userId', loginResponse.data.id);
            localStorage.setItem('accessToken', loginResponse.data.access_token);
            localStorage.setItem('refreshToken', loginResponse.data.refresh_token);
            // 서버 응답 처리(현재는 콘솔에 데이터를 출력)
            console.log(response.data);

            alert("회원가입 성공");
            navigate('/main');
        } catch (error) {
            alert('회원가입 실패' + error);
            console.log('회원가입 실패', error);
        }
    };
    return (
        <Container>
            <InnerContainer>
                <WanderWorldLogo className="signup" />
                <AddProfileImg handleFileChange={handleFileChange}/>
                <SignupButton handleSignup={handleSignup} passwordLength={passwordLength}/>
                <UsernameForm setUsername={setUsername} className="signup"/>
                <NameForm setName={setName} className="signup"/>
                <PasswordForm setPassword={setPassword} className="signup"/>
                <OrText className="signup"/>
                <SocialLogin className="signup"/>
            </InnerContainer>
            <ToLogin toLogin="/"/>
        </Container>
    )
}
