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

  if (user.authenticated && action !== 'signout') {
    window.location.href = '/';
    return (
      <>
        <Head>
          <title>{`Sign Up | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message="Redirecting..." />
      </>
    );
  }

  if (action === 'signout') {
    logout();
    return (
      <>
        <Head>
          <title>{`Sign Up | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message="Redirecting..." />
      </>
    );
  }

  if (action === 'signup') {
    return (
      <>
        <Head>
          <title>{`Sign Up | ${config.siteName}`}</title>
        </Head>
        <Auth action={action} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Sign In | ${config.siteName}`}</title>
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

export const getStaticProps = async ({ params }) => {
  const action = params.action.toLowerCase();

  return {
    props: {
      action,
    },
  };
};
