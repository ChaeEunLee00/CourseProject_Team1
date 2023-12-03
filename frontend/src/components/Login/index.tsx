import styled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import { LoginButton } from '../LoginButton';
import { OrText } from '../OrText';
import { useNavigate } from "react-router-dom";
import { PasswordForm } from '../PasswordForm';
import { UsernameForm } from '../UsernameForm';
import { WanderWorldLogo } from '../WanderWorldLogo';
import { SocialLogin } from '../SocialLogin';
import { ToSignup } from '../ToSignup';
import { useData } from '../../contexts/DataContext';

const Container = styled.div`
    height: 575px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 370px;
`;

const InnerContainer = styled.div`
    border: 1px solid #D8D8D8;
    background-color: #ffffff;
    height: 514px;
    position: relative;
    width: 350px;
`;
export const Login = () => {
    const [username, setUsername] = useState<string>("");
    const {password, setPassword} = useData();
    const passwordLength = password.length;
    const navigate = useNavigate();

    const handleLogin = async () => {
        // 로그인 정보를 서버로 전송
        try {
            const response = await axios.post('http://ec2-15-164-217-231.ap-northeast-2.compute.amazonaws.com:8080/users/login', {username, password}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );

        // 세션 ID를 localstorage에 저장
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        // 서버 응답 처리(현재는 콘솔에 데이터를 출력)
        console.log(response.data);
        alert('로그인 성공');

        // 로그인 성공 후 main 페이지로 이동
        navigate('/main');
        } catch (error) {
        console.log('로그인 실패', error);
        alert('로그인 실패');
        }
    };

    return (
        <Container>
            <InnerContainer>
                <WanderWorldLogo className='login' />
                <LoginButton handleLogin={handleLogin} passwordLength={passwordLength} />
                <UsernameForm setUsername={setUsername} className='login'/>
                <PasswordForm setPassword={setPassword} className="login"/>
                <OrText className='login'/>
                {/* <ForgotPassword /> */}
                <SocialLogin className='login'/>
            </InnerContainer>
            <ToSignup toSignup="/signup" />
        </Container>
    )
}