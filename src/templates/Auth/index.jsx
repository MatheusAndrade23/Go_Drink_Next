import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { LinkComponent } from '../../components/LinkComponent';
import { TextComponent } from '../../components/TextComponent';
import { InputComponent } from '../../components/InputComponent';
import { SmallContainer } from '../../components/SmallContainer';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const Auth = () => {
  const { user, login, logout, register } = useContext(AuthContext);
  const { t } = useTranslation();
  const { action } = useParams();
  const navigate = useNavigate();

  const [loginControl, setLoginControl] = useState('signIn');
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleGetInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async () => {
    const { email, password } = userInfo;

    if (loginControl === 'signin') {
      login(email, password);
    } else {
      register(email, password);
    }
  };

  useEffect(() => {
    if (user.authenticated && action.toLocaleLowerCase() !== 'signout') {
      navigate('/');
    }
  }, [action, navigate, user]);

  useEffect(() => {
    const login = action.toLowerCase();
    switch (login) {
      case 'signin':
        setLoginControl('signin');
        document.title = `${t('loginSingIn')} | ${config.siteName}`;
        break;

      case 'signup':
        setLoginControl('signup');
        document.title = `${t('loginSingUp')} | ${config.siteName}`;
        break;

      case 'signout':
        logout();
        break;

      default:
        navigate('/not-found');
        break;
    }
  }, [action, logout, navigate, t]);

  return (
    <Styled.Container>
      <Styled.Login>
        <Heading size="medium" as="h4">
          GODRINK
        </Heading>
        <InputComponent
          text={`${t('email')}:`}
          placeholder={t('typeEmail')}
          name="email"
          type="email"
          handleChange={handleGetInfo}
        />
        <Styled.PasswordContainer>
          <InputComponent
            text={`${t('password')}:`}
            placeholder={t('typePassword')}
            name="password"
            type={showPassword ? 'text' : 'password'}
            handleChange={handleGetInfo}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </Styled.PasswordContainer>
        <ButtonComponent bold={false} handleSubmit={handleSubmitLogin}>
          {loginControl === 'signin' ? t('loginSingIn') : t('loginSingUp')}
        </ButtonComponent>
        <Styled.OtherAction>
          <TextComponent>
            {loginControl == 'signin'
              ? t('doNotHaveAccount')
              : t('haveAccount')}
          </TextComponent>
          <LinkComponent
            link={loginControl !== 'signin' ? '/auth/signin' : '/auth/signup'}
          >
            {loginControl !== 'signin' ? t('loginSingIn') : t('loginSingUp')}
          </LinkComponent>
        </Styled.OtherAction>
        {loginControl === 'signin' && (
          <Styled.ResetPassword href="/forgot-password">
            {t('forgotPassword')}
          </Styled.ResetPassword>
        )}
      </Styled.Login>
      <ReturnButton />
    </Styled.Container>
  );
};
