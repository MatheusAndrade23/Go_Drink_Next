import { createContext, useEffect, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { GlobalStyles } from '../../styles/global-styles';

import { DarkTheme } from '../../styles/theme/DarkTheme.js';
import { LightTheme } from '../../styles/theme/LightTheme.js';

export const ThemeSwitcherContext = createContext('');

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const recoveredTheme = localStorage.getItem('@go-drink/theme');

    if (recoveredTheme) {
      setTheme(recoveredTheme);
    }
  }, []);

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('@go-drink/theme', newTheme);
  };

  return (
    <StyledThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <ThemeSwitcherContext.Provider value={{ changeTheme, theme }}>
        {children}
      </ThemeSwitcherContext.Provider>
      <GlobalStyles />
    </StyledThemeProvider>
  );
};
