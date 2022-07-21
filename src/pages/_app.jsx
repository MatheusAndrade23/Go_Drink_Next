import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo-config';
import { appWithTranslation } from 'next-i18next';

import { ThemeProvider } from '../providers/ThemeProvider';
import { AuthProvider } from '../providers/AuthProvider';

import { Footer } from '../components/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
