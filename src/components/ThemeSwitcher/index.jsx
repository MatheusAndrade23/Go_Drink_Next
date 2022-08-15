import * as Styled from './styles';

import { useContext } from 'react';

import { ThemeSwitcherContext } from '../../providers/ThemeProvider';

export const ThemeSwitcher = () => {
  const { changeTheme, theme } = useContext(ThemeSwitcherContext);
  const text =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  const handleChangeTheme = () => {
    changeTheme();
  };

  return (
    <Styled.Container onClick={handleChangeTheme} title={text}>
      {text}
    </Styled.Container>
  );
};
