import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Head from 'next/head';

import { Home } from '../templates/Home';

import config from '../config';

export default function HomePage() {
  const title = `Best Cocktails Recipes | ${config.siteName}`;
  const url = config.defaultImageUrl;
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={title}
        description={config.description}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Home />
    </>
  );
}
