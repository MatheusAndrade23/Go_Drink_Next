import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Logo } from '../Logo';
import { HeaderMenu } from '../HeaderMenu';
import { LinkComponent } from '../LinkComponent';
import { SmallContainer } from '../SmallContainer';
import { InputComponent } from '../InputComponent';
import { ButtonComponent } from '../ButtonComponent';
import { MessageComponent } from '../MessageComponent';

export const Header = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const { search } = useParams();

  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  const SearchInput = (e) => {
    setUrl(e.target.value);
  };

  const SearchSubmit = () => {
    if (url) {
      window.location.href = `/search/${url}`;
    } else {
      setMessage(t('emptySearchMessage'));
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const enterPressed = (e) => {
      if (e.key === 'Enter' && url.length > 0) {
        window.location.href = `/search/${url}`;
      } else if (url.length < 0) {
        setMessage(t('emptySearchMessage'));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    };

    window.addEventListener('keydown', (e) => {
      enterPressed(e);
    });

    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, [search, t, url]);

  return (
    <>
      <Styled.Header>
        <SmallContainer>
          <Logo text="GODRINK" smallText="GD" />
        </SmallContainer>
        <SmallContainer disposition="row">
          <InputComponent
            type="text"
            handleChange={SearchInput}
            placeholder={t('searchPlaceholder')}
            name="search"
          />
          <ButtonComponent
            handleSubmit={SearchSubmit}
            model="icon"
            name={t('searchButton')}
          >
            <FaSearch />
          </ButtonComponent>
        </SmallContainer>
        {user.authenticated ? (
          <LinkComponent link="/auth/signout">
            {t('loginSingOut')}
          </LinkComponent>
        ) : (
          <LinkComponent link="/auth/signin">{t('loginSingIn')}</LinkComponent>
        )}
      </Styled.Header>
      <HeaderMenu />
      {message && <MessageComponent message={message} />}
    </>
  );
};
