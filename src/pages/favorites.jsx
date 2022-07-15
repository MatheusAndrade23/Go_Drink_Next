import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

import { api } from '../services/api';

import { Favorites } from '../templates/Favorites';
import { ErrorComponent } from '../components/ErrorComponent';

import config from '../config';

export default function MyFavorites() {
  const { user } = useContext(AuthContext);
  const { authenticated, favorites, favoritesInfo } = user;
  const { t } = useTranslation();

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>{`${t('headerLinkFavorites')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('createAFavorites')} />
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        <Head>
          <title>{`${t('headerLinkFavorites')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('withOutFavorites')} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${t('headerLinkFavorites')} | ${config.siteName}`}</title>
      </Head>
      <Favorites drinks={favoritesInfo} />
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
