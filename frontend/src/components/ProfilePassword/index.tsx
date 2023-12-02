import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const Container = styled(TextField)`
  background-color: #e5e5e5d6;
  height: 57px;
  left: 250px;
  position: absolute;
  top: 320px;
  width: 300px;
`;

export const ProfilePassword = () => {
    return (
        <Container label="password" type="password" />
    )
}