import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { db } from '../services/api';

import { AllDrinks } from '../templates/AllDrinks';
import { ErrorComponent } from '../components/ErrorComponent';

import config from '../config';

export default function AllDrinksTemplate({ drinks }) {
  const { t } = useTranslation();

  if (!drinks) {
    return (
      <>
        <Head>
          <title>{`${t('serverErrorTitle')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${t('headerLinkADrinks')} | ${config.siteName}`}</title>
      </Head>
      <AllDrinks drinks={drinks} />
    </>
  );
}

export async function getStaticProps({ locale }) {
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
    drinks = undefined;
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      drinks,
    },
  };
}
