import styled from '@emotion/styled';
import React from 'react';
import { useData } from '../../contexts/DataContext';

interface PasswordFormProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  readonly className: string;
}

const Input = styled.input`
  background-color: #F0F0F0;
  border: 1px solid #D8D8D8;
  border-radius: 3px;
  padding-left: 10px;
  height: 38px;
  width: 280px;
`;

export const PasswordForm: React.FC<PasswordFormProps> = ({ setPassword, className }) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <Input
      placeholder='password'
      type='password'
      onChange={handlePasswordChange}
      className={`password ${className}`}
    />
  );
};