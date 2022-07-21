import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Head from 'next/head';

import { db } from '../../services/api';

import { Search } from '../../templates/Search';
import { ErrorComponent } from '../../components/ErrorComponent';

import config from '../../config';

export default function SearchPage({ drinks, search }) {
  const { t } = useTranslation();
  const url = config.defaultImageUrl;
  const router = useRouter();
  const title = `${t('headerLinkADrinks')} | ${config.siteName}`;

  if (drinks === false) {
    const title = `${t('serverErrorTitle')} | ${config.siteName}`;
    return (
      <>
        <NextSeo
          title={title}
          description={`${t('serverErrorTitle')} - ${t('description')}`}
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

  if (drinks === null) {
    const title = `${t('searchTitle')}: "${search}" | ${config.siteName}`;
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
        <ErrorComponent message={`${t('noResultsSearch')}: "${search}"`} />
      </>
    );
  }

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
      <Search drinks={drinks} search={search} />
    </>
  );
}

export const getServerSideProps = async ({ locale, params }) => {
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
      ...(await serverSideTranslations(locale, ['common'])),
      drinks,
      search,
    },
  };
};
