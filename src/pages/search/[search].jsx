import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { db } from '../../services/api';

import { Search } from '../../templates/Search';
import { ErrorComponent } from '../../components/ErrorComponent';

import config from '../../config';

export default function SearchPage({ drinks, search }) {
  const { t } = useTranslation();

  if (drinks === false) {
    return (
      <>
        <Head>
          <title>{`${t('serverErrorTitle')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('serverErrorTitle')} />
      </>
    );
  }

  if (drinks === null) {
    return (
      <>
        <Head>
          <title>{`${t('searchTitle')}: "${search}" | ${
            config.siteName
          }`}</title>
        </Head>
        <ErrorComponent message={`${t('noResultsSearch')}: "${search}"`} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${t('headerLinkADrinks')} | ${config.siteName}`}</title>
      </Head>
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
