import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head';

import { Home } from '../templates/Home';

import config from '../config';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{config.siteName}</title>
      </Head>
      <Home />
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
