import Head from 'next/head';

import { PageNotFound } from '../templates/PageNotFound';

import config from '../config';

export default function Page404() {
  return (
    <>
      <Head>
        <title>This page does not exist!</title>
        <meta name="description" content={config.description} />
      </Head>
      <PageNotFound />
    </>
  );
}
