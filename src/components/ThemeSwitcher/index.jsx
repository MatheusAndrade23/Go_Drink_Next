import * as Styled from './styles';

import { useContext } from 'react';

import { ThemeSwitcherContext } from '../../providers/ThemeProvider';

export const ThemeSwitcher = () => {
  const { themeSwitcher, theme } = useContext(ThemeSwitcherContext);
  const text = `${
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  }`;

  return (
    <Styled.Container onClick={themeSwitcher} title={text}>
      {text}
    </Styled.Container>
  );
};
