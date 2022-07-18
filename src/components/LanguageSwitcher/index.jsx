import * as Styled from './styles';
import cookie from 'react-cookies';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import flags from 'flag-icons';
import { useEffect, useState } from 'react';
import { MessageComponent } from '../MessageComponent';

export const LanguageSwitcher = () => {
  const [message, setMessage] = useState(null);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (key) => {
    cookie.save('NEXT_LOCALE', key);
    i18n.changeLanguage(key);

    router.push(router.asPath, router.asPath, { locale: key });
  };
  return (
    <>
      {message && <MessageComponent message={message} hide={setMessage} />}
      <Styled.Container>
        <p>{t('language')}</p>
        {LanguageOptions.map((language) => (
          <Styled.FlagButton
            key={language.key}
            onClick={() => {
              changeLanguage(language.key);
            }}
            name={language.name}
            selected={i18n.language === language.key ? true : false}
            title={language.name}
          >
            <span className={language.flag}></span>
          </Styled.FlagButton>
        ))}
      </Styled.Container>
    </>
  );
};

const LanguageOptions = [
  {
    name: 'Português',
    key: 'ptBr',
    flag: 'fi fi-br fis',
  },
  {
    name: 'English',
    key: 'en',
    flag: 'fi fi-us fis',
  },
];
