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

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>{`My Favorites | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message="Please create an account or log in before having a list of favorite drinks!" />
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        <Head>
          <title>{`My Favorites | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message="You do not have any favorite drink yet!" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`My Favorites | ${config.siteName}`}</title>
      </Head>
      <Favorites />
    </>
  );
}
