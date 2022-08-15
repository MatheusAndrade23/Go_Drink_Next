import { NextSeo } from 'next-seo';

import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Auth } from '../../templates/Auth';
import { ErrorComponent } from '../../components/ErrorComponent';

import { toast } from 'react-toastify';

import config from '../../config';

export default function AuthPage({ action }) {
  const { user, logout } = useContext(AuthContext);
  const { authenticated } = user;
  const { siteName } = config;

  // const router = useRouter();
  // const { action } = router.query;

  if (authenticated && action !== 'signout') {
    window.location.href = '/';
    return (
      <>
        <NextSeo title={`Authenticated | ${siteName}`} />
        <ErrorComponent message="Redirecting..." />
      </>
    );
  }

  return <Auth action={action} />;
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
