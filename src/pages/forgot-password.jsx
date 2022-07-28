import Head from 'next/head';

import { ForgotPassword } from '../templates/ForgotPassword';

import config from '../config';

export default function ForgotPasswordTemplate() {
  return (
    <>
      <Head>
        <title>{`Forgot my password | ${config.siteName}`}</title>
      </Head>
      <ForgotPassword />
    </>
  );
}
