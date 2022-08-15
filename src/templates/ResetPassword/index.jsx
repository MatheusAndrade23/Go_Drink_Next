import * as Styled from './styles';

import { useState, useContext } from 'react';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { TextComponent } from '../../components/TextComponent';

export const ResetPassword = ({ token, email }) => {
  const { resetPassword } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleChangePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  const handleGetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = () => {
    resetPassword(email, token, password);
  };

  return (
    <Styled.Container>
      <Styled.Login>
        <Heading size="medium" as="h4">
          GODRINK
        </Heading>
        <TextComponent>Please type your new password below.</TextComponent>
        <Styled.PasswordContainer>
          <InputComponent
            text="Password"
            placeholder="Type your new Password here..."
            name="password"
            type={showPassword ? 'text' : 'password'}
            handleChange={handleGetPassword}
          />
          <button onClick={handleChangePasswordVisibility}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </Styled.PasswordContainer>
        <ButtonComponent bold={false} handleSubmit={handleResetPassword}>
          Change password
        </ButtonComponent>
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
