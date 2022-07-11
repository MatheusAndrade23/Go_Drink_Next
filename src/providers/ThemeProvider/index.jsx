import P from 'prop-types';

import { createContext, useEffect, useState } from 'react';

import { ThemeProvider as ThemeStyledProvider } from 'styled-components';

import { GlobalStyles } from '../../styles/global-styles';

import { DarkTheme } from '../../styles/theme/DarkTheme.js';
import { LightTheme } from '../../styles/theme/LightTheme.js';

export const ThemeSwitcherContext = createContext('');

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const recoveredTheme = localStorage.getItem('theme');

    if (recoveredTheme) {
      setTheme(recoveredTheme);
    }
  }, []);

  const themeSwitcher = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeStyledProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <ThemeSwitcherContext.Provider value={{ themeSwitcher, theme }}>
        {children}
      </ThemeSwitcherContext.Provider>
      <GlobalStyles />
    </ThemeStyledProvider>
  );
};

ThemeProvider.propTypes = {
  children: P.node.isRequired,
};
