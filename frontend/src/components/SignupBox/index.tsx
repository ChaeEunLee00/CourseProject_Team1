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

export const SignupBox = () => {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const {password, setPassword} = useData();
    const [profileImage, setProfileImage] = useState(null);
    const passwordLength = password.length;

    const handleFileChange = (file) => {
        setProfileImage(file);
    };

    const handleSignup = async () => {
        try {
            // 회원가입 정보를 서버로 전송
            const formData = new FormData();
            formData.append("username", username);
            formData.append("name", name);
            formData.append("password", password);
            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            const response = await axios.post("/api/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // 파일 전송 시 필요한 헤더
                },
            });

            // 서버 응답 처리(현재는 콘솔에 데이터를 출력)
            console.log(response.data);
        } catch (error) {
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
