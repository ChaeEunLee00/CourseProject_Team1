import styled from '@emotion/styled';

interface NameFormProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
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

export const NameForm: React.FC<NameFormProps> =  ({setName, className}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Input 
    placeholder="Name" 
    type="text"
    onChange={handleNameChange}
    className={`nameform ${className}`}/>
  );
};

