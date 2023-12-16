import styled from '@emotion/styled';

interface Props {
  readonly className: string;
}

const Container = styled.div`
  color: #000000;
  font-family: "Inter-Regular", Helvetica;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.38px;
  line-height: 23px;
  text-align: center;
  white-space: nowrap;
  padding-top: 10px;
`;

export const OrText = ({className}: Props) => {
    return (
        <Container className={`or-text ${className}`}>Or</Container>
    )
}