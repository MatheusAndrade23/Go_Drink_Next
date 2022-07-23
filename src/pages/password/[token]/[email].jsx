import Head from 'next/head';

import { ResetPassword } from '../../../templates/ResetPassword';

import config from '../../../config';

export default function ResetPasswordPage({ email, token }) {
  return (
    <>
      <Head>
        <title>{`Change password | ${config.siteName}`}</title>
      </Head>
      <ResetPassword email={email} token={token} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { email, token } = params;
  return {
    props: {
      email,
      token,
    },
  };
};
