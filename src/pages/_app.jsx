import { appWithTranslation } from "next-i18next";

import { ThemeProvider } from "../providers/ThemeProvider";
import { AuthProvider } from "../providers/AuthProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
