import * as Styled from './styles';

import { useContext } from 'react';

import { ThemeSwitcherContext } from '../../providers/ThemeProvider/index';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { themeSwitcher, theme } = useContext(ThemeSwitcherContext);
  const text = `${theme === 'dark' ? t('lightTheme') : t('darkTheme')}`;

  return (
    <Styled.Container onClick={themeSwitcher} title={text}>
      {text}
    </Styled.Container>
  );
};
