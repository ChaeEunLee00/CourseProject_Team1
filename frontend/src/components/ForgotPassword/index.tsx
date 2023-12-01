import styled from '@emotion/styled';

const Container = styled.div`
  color: #000000;
  font-family: "Inter-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 49px;
  letter-spacing: -0.38px;
  line-height: 23px;
  position: absolute;
  text-align: center;
  top: 385px;
  white-space: nowrap;
`;

export const ForgotPassword = () => {
    return (
        <Container>비밀번호를 잊으셨나요?</Container>
    )
}