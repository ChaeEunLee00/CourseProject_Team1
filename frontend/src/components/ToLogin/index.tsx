import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
    border: 1px solid #D8D8D8;
    background-color: #ffffff;
    height: 55px;
    width: 350px;
    position: relative;
`;


const LoginLink = styled(Link)`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 20px;
    font-weight: 400;
    height: 44px;
    left: 55px;
    letter-spacing: -0.38px;
    line-height: 23px;
    position: absolute;
    text-align: center;
    top: 15px;
    width: 238px;
`;

export const ToLogin = ({toLogin}: {toLogin: string}) => {
    return (
        <Container>
            <LoginLink to={toLogin}>Do you have an account?</LoginLink>
        </Container>
    );
};
