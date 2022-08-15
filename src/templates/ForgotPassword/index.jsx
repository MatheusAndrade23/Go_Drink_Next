import * as Styled from './styles';

import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { TextComponent } from '../../components/TextComponent';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

export const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

  const [emailAddress, setEmailAddress] = useState('');

  const handleGetEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const handleSendEmail = () => {
    forgotPassword(emailAddress);
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
          handleChange={handleGetEmailAddress}
        />
        <ButtonComponent bold={false} handleSubmit={handleSendEmail}>
          Send Email
        </ButtonComponent>
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
