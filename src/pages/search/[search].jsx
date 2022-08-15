import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { db } from '../../services/api';

import { Search } from '../../templates/Search';
import { Header } from '../../components/Header';
import { ErrorComponent } from '../../components/ErrorComponent';

import config from '../../config';

export default function SearchPage({ drinks, search }) {
  const { defaultImageUrl: url, pageUrl, siteName, description } = config;
  const router = useRouter();
  const title = `Search: "${search}" | ${siteName}`;

  if (drinks === undefined) {
    return (
      <>
        <NextSeo title={`Server Error | ${siteName}`} />
        <ErrorComponent message="Server Error" />
      </>
    );
  }

  if (drinks === null) {
    return (
      <>
        <NextSeo title={title} />
        <Header search={search} />
        <ErrorComponent message={`No results for your search: "${search}"`} />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`${title} - ${description}`}
        canonical={pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Header search={search} />
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
    drinks = undefined;
  }

  return {
    props: {
      drinks,
      search,
    },
  };
};
