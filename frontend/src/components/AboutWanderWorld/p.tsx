import styled from "@emotion/styled";

import { AboutWanderWorldSpan } from "./span";

const Container = styled.p`
  align-self: stretch;
  color: #000000cc;
  font-family: "Inter-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.12px;
  line-height: 16px;
  position: relative;
  text-align: center;
`;

export const AboutWanderWorldP = () => {
    return (
        <Container>
            <AboutWanderWorldSpan />
        </Container>
    )
}