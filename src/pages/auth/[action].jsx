import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Auth } from '../../templates/Auth';
import { ErrorComponent } from '../../components/ErrorComponent';

import config from '../../config';

export default function AuthPage({ action }) {
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  if (user.authenticated && action !== 'signout') {
    window.location.href = '/';
    return (
      <>
        <Head>
          <title>{`${t('loginSingUp')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('redirecting')} />
      </>
    );
  }

  if (action === 'signout') {
    logout();
    return (
      <>
        <Head>
          <title>{`${t('loginSingUp')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('redirecting')} />
      </>
    );
  }

  if (action === 'signup') {
    return (
      <>
        <Head>
          <title>{`${t('loginSingUp')} | ${config.siteName}`}</title>
        </Head>
        <Auth action={action} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${t('loginSingIn')} | ${config.siteName}`}</title>
      </Head>
      <Auth action={action} />
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { action: 'signin' },
      },
      {
        params: { action: 'signup' },
      },
      {
        params: { action: 'signout' },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ locale, params }) => {
  const action = params.action.toLowerCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      action,
    },
  };
};
