import styled from "@emotion/styled";
import { Link } from "react-router-dom";


const Container = styled.div`
    border: 1px solid #D8D8D8;
    background-color: #ffffff;
    height: 55px;
    // left: 678px;
    position: relative; 
    // top: 519px;
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const SignupLink = styled(Link)`
    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    height: 44px;
    // left: 55px;
    letter-spacing: -0.38px;
    line-height: 23px;
    // position: absolute;
    text-align: center;
    vertical-align: center;
    // top: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const ToSignup = ({ toSignup }: { toSignup: string }) => {
    return (
        <Container>
            <SignupLink to={toSignup}>Don't have an account? Sign up</SignupLink>
        </Container>
    )
}
