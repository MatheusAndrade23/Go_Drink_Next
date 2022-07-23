import * as Styled from './styles';

import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { TextComponent } from '../../components/TextComponent';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

  const [email, setEmail] = useState('');

  const handleGetInfo = (e) => {
    setEmail(e.target.value);
  };

  const sendMail = () => {
    forgotPassword(email);
  };

  return (
    <Styled.Container>
      <Styled.Login>
        <Heading size="medium" as="h4">
          GODRINK
        </Heading>
        <TextComponent>
          We will send you an email with the link to change your password!
        </TextComponent>
        <InputComponent
          text="Email:"
          placeholder="Type your email here..."
          name="email"
          type="email"
          handleChange={handleGetInfo}
        />
        <ButtonComponent bold={false} handleSubmit={sendMail}>
          Send Email
        </ButtonComponent>
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
