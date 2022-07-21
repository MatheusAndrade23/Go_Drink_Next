import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Head from 'next/head';

import { Home } from '../templates/Home';

import config from '../config';

export default function HomePage() {
  const { t } = useTranslation();
  const title = `${t('title')} | ${config.siteName}`;
  const url = config.defaultImageUrl;
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={title}
        description={t('description')}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
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
