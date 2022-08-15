import { NextSeo } from 'next-seo';

import { PageNotFound } from '../templates/PageNotFound';

import config from '../config';

export default function Page404() {
  return (
    <>
      <NextSeo title={`This page does not exist! | ${config.siteName}`} />
      <PageNotFound />
    </>
  );
}
