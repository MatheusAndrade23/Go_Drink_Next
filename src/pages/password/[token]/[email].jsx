import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router';

import { ResetPassword } from '../../../templates/ResetPassword';

import config from '../../../config';

export default function ResetPasswordPage() {
  const { siteName } = config;
  const router = useRouter();

  const { email, token } = router.query;

  return (
    <>
      <NextSeo title={`Change password | ${siteName}`} />
      <ResetPassword email={email} token={token} />
    </>
  );
}
