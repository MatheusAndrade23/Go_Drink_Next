import * as Styled from './styles';

import { useTranslation } from 'react-i18next';

import flags from 'flag-icons';
import { useEffect, useState } from 'react';
import { MessageComponent } from '../MessageComponent';

export const LanguageSwitcher = () => {
  const [message, setMessage] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const recoveredLanguage = localStorage.getItem('language');

    if (recoveredLanguage) {
      i18n.changeLanguage(recoveredLanguage);
    }
  }, [i18n]);

  const changeLanguage = (key) => {
    i18n.changeLanguage(key);
    localStorage.setItem('language', key);

    if (key == 'ptBr') {
      setMessage('Nem tudo foi traduzido para português!');
    }
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
