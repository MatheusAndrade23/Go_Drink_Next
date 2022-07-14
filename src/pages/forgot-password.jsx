import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { ForgotPassword } from '../templates/ForgotPassword';

import config from '../config';

export default function ForgotPasswordTemplate() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t('forgotPassword')} | ${config.siteName}`}</title>
      </Head>
      <ForgotPassword />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
