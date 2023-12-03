import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const Container = styled(TextField)`
  background-color: #e5e5e5d6;
  height: 57px;
  width: 300px;
  position: absolute;
  left: 250px;
  top: 250px;
`;

export const ProfileUsername = () => {
    return (
        <Container label="김아이폰" type="username" />
    )
}