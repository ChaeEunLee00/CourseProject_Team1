import React from "react";
import styled from "@emotion/styled";
import { useData } from "../../contexts/DataContext";

interface SignupButtonProps {
    handleSignup: () => Promise<void>;
    passwordLength: number;
}

const Container = styled.button<{ passwordOk: boolean }>`
    background-color: ${(props) => (props.passwordOk ? 'rgba(86, 204, 242, 1)' : 'rgba(86, 204, 242, 0.7)')};
    border-radius: 7px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    left: 33px;
    width: 293px;
    top: 370px;
    position: absolute;
    transition: background-color 0.3s ease; /* 효과를 부드럽게 만듦 */
    cursor: pointer;
    opacity: ${(props) => (props.passwordOk ? 1 : 0.7)}; /* 투명도 설정 */
    &:hover {
        background-color: ${(props) => (props.passwordOk ? '#4ea8e3' : 'rgba(86, 204, 242, 1)')};
    }
`;

const SignupText = styled.div`
    -webkit-text-stroke: 0.5px #ffffff;
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 23px;
    text-align: center;
    width: 72px;
`;

export const SignupButton: React.FC<SignupButtonProps> = ({handleSignup}) => {
    const {password} = useData();
    const passwordLength = password.length;
    const isPasswordOk = passwordLength >= 8;

    return (
        <Container onClick={isPasswordOk? handleSignup : () => {}} passwordOk={isPasswordOk}>
            <SignupText>가입</SignupText>
        </Container>
    )
}