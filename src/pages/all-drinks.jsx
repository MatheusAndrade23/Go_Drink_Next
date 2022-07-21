import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Head from 'next/head';

import { db } from '../services/api';

import { AllDrinks } from '../templates/AllDrinks';
import { ErrorComponent } from '../components/ErrorComponent';

import config from '../config';

export default function AllDrinksTemplate({ drinks }) {
  const { t } = useTranslation();
  const url = config.defaultImageUrl;
  const router = useRouter();

  const title = !drinks
    ? `${t('serverErrorTitle')} | ${config.siteName}`
    : `${t('headerLinkADrinks')} | ${config.siteName}`;

  if (!drinks) {
    return (
      <>
        <NextSeo
          title={title}
          description={`${title} - ${t('description')}`}
          canonical={config.pageUrl + router.asPath}
          openGraph={{
            url,
            title,
          }}
        />
        <ErrorComponent message={t('serverErrorTitle')} />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`${t('headerLinkADrinks')} - ${t('description')}`}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <AllDrinks drinks={drinks} />
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
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
};
