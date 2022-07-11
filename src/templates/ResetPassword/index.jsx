import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { TextComponent } from '../../components/TextComponent';

import config from '../../config';

export const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const { token, email } = useParams();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(null);
  const [password, setPassword] = useState('');

  const handleGetInfo = (e) => {
    setPassword(e.target.value);
  };

  const setNewPassword = () => {
    resetPassword(email, token, password);
  };

  useEffect(() => {
    document.title = `${t('recPassword')} | ${config.siteName}`;
  }, [t]);

  return (
    <Styled.Container>
      <Styled.Login>
        <Heading size="medium" as="h4">
          GODRINK
        </Heading>
        <TextComponent>{t('weResetPassword')}</TextComponent>
        <Styled.PasswordContainer>
          <InputComponent
            text={`${t('password')}:`}
            placeholder={t('newPassword')}
            name="password"
            type={showPassword ? 'text' : 'password'}
            handleChange={handleGetInfo}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </Styled.PasswordContainer>
        <ButtonComponent bold={false} handleSubmit={setNewPassword}>
          {t('recPassword')}
        </ButtonComponent>
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
