import { appWithTranslation } from 'next-i18next';

import { ThemeProvider } from '../providers/ThemeProvider';
import { AuthProvider } from '../providers/AuthProvider';

import { Footer } from '../components/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
