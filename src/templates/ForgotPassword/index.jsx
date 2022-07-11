import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const handleGetInfo = (e) => {
    setEmail(e.target.value);
  };

  const sendMail = () => {
    forgotPassword(email);
  };

  useEffect(() => {
    document.title = `${t('forgotPassword')} | ${config.siteName}`;
  }, [t]);

  return (
    <Styled.Container>
      <Styled.Login>
        <Heading size="medium" as="h4">
          GODRINK
        </Heading>
        <TextComponent>{t('forgotInfo')}</TextComponent>
        <InputComponent
          text={`${t('email')}:`}
          placeholder={t('typeEmail')}
          name="email"
          type="email"
          handleChange={handleGetInfo}
        />
        <ButtonComponent bold={false} handleSubmit={sendMail}>
          {t('sendMail')}
        </ButtonComponent>
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
