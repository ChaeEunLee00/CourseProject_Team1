import styled from "@emotion/styled";

import { AboutWanderWorldP } from "./p";

interface Props {
    readonly className: string;
}

const Container = styled.div`
  height: 31px;
  left: -2px;
  width: 1408px;
`;

export const AboutWanderWorld = ({className}: Props) => {
    return (
        <Container className={`about-wander-world ${className}`}>
            <AboutWanderWorldP />
        </Container>
    )
}