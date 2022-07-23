import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Head from 'next/head';

import { db } from '../../services/api';

import { Search } from '../../templates/Search';
import { ErrorComponent } from '../../components/ErrorComponent';

import config from '../../config';

export default function SearchPage({ drinks, search }) {
  const url = config.defaultImageUrl;
  const router = useRouter();
  const title = `Search | ${config.siteName}`;

  if (drinks === false) {
    const title = `Search: "${search}" | ${config.siteName}`;
    return (
      <>
        <NextSeo
          title={title}
          description={`Server Error - ${config.description}`}
          canonical={config.pageUrl + router.asPath}
          openGraph={{
            url,
            title,
          }}
        />
        <ErrorComponent message="Server Error" />
      </>
    );
  }

  if (drinks === null) {
    const title = `Search: "${search}" | ${config.siteName}`;
    return (
      <>
        <NextSeo
          title={title}
          description={`${title} - ${config.description}`}
          canonical={config.pageUrl + router.asPath}
          openGraph={{
            url,
            title,
          }}
        />
        <ErrorComponent message={`No results for your search: "${search}"`} />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`${title} - ${config.description}`}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Search drinks={drinks} search={search} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { search } = params;
  let drinks = [];
  try {
    const resp = await db.get(`/api/json/v1/1/search.php?s=${search}`);
    try {
      drinks = resp.data.drinks;
    } catch (error) {
      drinks = null;
    }
  } catch (err) {
    drinks = false;
  }

  return {
    props: {
      drinks,
      search,
    },
  };
};
