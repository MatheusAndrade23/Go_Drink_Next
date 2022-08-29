import { NextSeo } from 'next-seo';

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

import { api } from '../services/api';

import { Favorites } from '../templates/Favorites';
import { Header } from '../components/Header';
import { ErrorComponent } from '../components/ErrorComponent';

import config from '../config';

export default function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const { authenticated, favorites, favoritesInfo } = user;
  const title = `My Favorites | ${config.siteName}`;

  if (!authenticated) {
    return (
      <>
        <NextSeo title={title} />
        <ErrorComponent message="Please create an account or log in before having a list of favorite drinks!" />
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        <NextSeo title={title} />
        <ErrorComponent message="You do not have any favorite drink yet!" />
      </>
    );
  }

  return (
    <>
      <NextSeo title={title} />
      <Header />
      <Favorites />
    </>
  );
}
