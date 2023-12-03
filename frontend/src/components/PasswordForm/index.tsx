import styled from '@emotion/styled';
import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface PasswordFormProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  readonly className: string;
  username: string;
}

const Input = styled.input`
  background-color: #F0F0F0;
  border: 1px solid #D8D8D8;
  border-radius: 3px;
  padding-left: 10px;
  height: 38px;
  width: 280px;
`;

export const PasswordForm: React.FC<PasswordFormProps> = ({ username, setPassword, className }) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const navigate = useNavigate();

  return (
    <Input
      placeholder='password'
      type='password'
      onChange={handlePasswordChange}
      className={`password ${className}`}
    />
  );
};