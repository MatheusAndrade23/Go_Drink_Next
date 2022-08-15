import { NextSeo } from 'next-seo';

import { ForgotPassword } from '../templates/ForgotPassword';

import config from '../config';

export default function ForgotPasswordTemplate() {
  return (
    <>
      <NextSeo title={`Forgot my password | ${config.siteName}`} />
      <ForgotPassword />
    </>
  );
}
