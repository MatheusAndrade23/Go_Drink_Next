import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { PageNotFound } from '../templates/PageNotFound';

export default function Page404() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('pageNotFound')}</title>
      </Head>
      <PageNotFound />
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
