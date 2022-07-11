import { render } from '@testing-library/react';
import { ThemeProvider } from '../providers/ThemeProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderTheme = (children) => {
  return render(
    <Router>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </Router>,
  );
};
