import styled from '@emotion/styled';

interface UsernameFormProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
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

export const UsernameForm: React.FC<UsernameFormProps> =  ({setUsername, className}) => {
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <Input 
    placeholder="Username" 
    type="text"
    onChange={handleUsernameChange}
    className={`username ${className}`}/>
  );
};

