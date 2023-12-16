import styled from "@emotion/styled";
import { SignupBox } from "../components/SignupBox";
import "../App.css";
import { AboutWanderWorld } from "../components/AboutWanderWorld/div";
import { DataProvider } from "../contexts/DataContext";


// 화면 중앙 정렬을 위한 스타일
const Container = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const InnerContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 50px;
    gap: 30px;
    justify-content: center;
    height: 550px;
    position: relative;
    width: 1300px;
`;

const Signup = () => {
    return (
        <Container>
            <InnerContainer>
                <DataProvider>
                    <SignupBox />
                </DataProvider>
                <AboutWanderWorld className="signup"/>
            </InnerContainer>
        </Container>
    );
};

export default Signup;