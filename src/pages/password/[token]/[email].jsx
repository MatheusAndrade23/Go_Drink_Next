import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { ResetPassword } from '../../../templates/ResetPassword';

import config from '../../../config';

export default function ResetPasswordPage({ email, token }) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t('recPassword')} | ${config.siteName}`}</title>
      </Head>
      <ResetPassword email={email} token={token} />
    </>
  );
}

export const getServerSideProps = async ({ locale, params }) => {
  const { email, token } = params;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      email,
      token,
    },
  };
};
