import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { db } from '../services/api';

import { Header } from '../components/Header';
import { AllDrinks } from '../templates/AllDrinks';
import { ErrorComponent } from '../components/ErrorComponent';

import config from '../config';

export default function AllDrinksPage({ drinks }) {
  const { defaultImageUrl: url, pageUrl, siteName, description } = config;
  const title = `All Drinks | ${siteName}`;
  const router = useRouter();

  if (!drinks === null) {
    return (
      <>
        <NextSeo title={`Server Error | ${siteName}`} />
        <ErrorComponent message="Server Error" />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`All Drinks - ${description}`}
        canonical={pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Header />
      <AllDrinks drinks={drinks} />
    </>
  );
}

export const getStaticProps = async () => {
  let drinks = [];
  try {
    const resp = await db.get('/api/json/v1/1/filter.php?a=alcoholic');
    const resp2 = await db.get('/api/json/v1/1/filter.php?a=non_alcoholic');
    const resp3 = await db.get('/api/json/v1/1/filter.php?a=optional_alcohol');

    const alcoholic = resp.data.drinks.reverse();
    const non_alcoholic = resp2.data.drinks.reverse();
    const optional_alcohol = resp3.data.drinks.reverse();

    drinks = [...alcoholic, ...non_alcoholic, ...optional_alcohol];
  } catch (err) {
    drinks = null;
  }
  return {
    props: {
      drinks,
    },
  };
};
