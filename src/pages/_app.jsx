import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo-config';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
      <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        style={{ width: 'max-content' }}
      />
    </ThemeProvider>
  );
};

export default MyApp;
