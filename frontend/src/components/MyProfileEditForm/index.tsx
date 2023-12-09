import styled from '@emotion/styled';

interface MyProfileEditFormProps {
  setting: React.Dispatch<React.SetStateAction<string>>;
  // setName: React.Dispatch<React.SetStateAction<string>>;
  // setUsername: React.Dispatch<React.SetStateAction<string>>;
  // setUsername: React.Dispatch<React.SetStateAction<string>>;
  readonly parameter: string;
  
}

const Input = styled.input`
    border-radius: 5px;
    height: 3px;
    width: 200px;

    color: #000000;
    font-family: "Inter-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.38px;
    line-height: 3px;
    width: 200px;
    text-align: center;
    padding-top: 15px;   
    padding-bottom: 15px;   
    margin-bottom: 30px;
    border: 1px solid #D9D9D9;
`;


export const NameEdit: React.FC<MyProfileEditFormProps> =  ({setting, parameter}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setting(e.target.value);
  };
  return (
    <Input 
    placeholder={parameter} 
    onChange={handleChange}/>
  );
};

export const UsernameEdit: React.FC<MyProfileEditFormProps> =  ({setting, parameter}) => {
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setting(e.target.value);
  };
  return (
    <Input 
    placeholder={parameter} 
    onChange={handleUsernameChange}/>
  );
};

export const PasswordEdit: React.FC<MyProfileEditFormProps> =  ({setting, parameter}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setting(e.target.value);
  };
  return (
    <Input 
    placeholder={parameter} 
    onChange={handleChange}/>
  );
};

export const ImageEdit: React.FC<MyProfileEditFormProps> =  ({setting, parameter}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setting(e.target.value);
  };
  return (
    <Input 
    placeholder={parameter} 
    onChange={handleChange}/>
  );
};