import * as Styled from '../Kinds/styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const Favorites = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const DRINKS_PER_PAGE = 8;

  const [next, setNext] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [drinksToShow, setDrinksToShow] = useState([]);
  const [loadingControl, setLoadingControl] = useState(true);
  const [loadMoreControl, setLoadMoreControl] = useState(DRINKS_PER_PAGE);
  const [errorControl, setErrorControl] = useState({
    error: false,
    message: '',
  });

  const handleShowMoreDrinks = () => {
    const nextPage = next + DRINKS_PER_PAGE;
    const nextDrinks = drinks.slice(nextPage, nextPage + DRINKS_PER_PAGE);
    setDrinksToShow([...drinksToShow, ...nextDrinks]);
    setNext(nextPage);
    setLoadMoreControl((loaded) => loaded + DRINKS_PER_PAGE);
  };

  useEffect(() => {
    const { authenticated, favorites, favoritesInfo } = user;
    if (!authenticated) {
      setErrorControl({
        error: true,
        message: t('createAFavorites'),
      });
      return;
    }
    if (favorites.length === 0) {
      setDrinks(null);
      return;
    }

    setDrinks(favoritesInfo);
  }, [t, user]);

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      setLoadingControl(false);
      setDrinksToShow(drinks.slice(0, DRINKS_PER_PAGE));
      document.title = `${t('headerLinkFavorites')} | ${config.siteName} `;
    } else if (drinks === null) {
      setLoadingControl(false);
      setErrorControl({
        error: true,
        message: t('withOutFavorites'),
      });
      document.title = `${t('headerLinkFavorites')} | ${config.siteName} `;
    } else if (drinks === undefined) {
      setErrorControl({
        error: true,
        message: t('error500message'),
        code: 500,
      });
      document.title = `${t('serverErrorTitle')} | ${config.siteName} `;
    }
  }, [drinks, t]);

  return (
    <>
      <Header />
      {!errorControl.error ? (
        <Styled.Container>
          <Heading size="small" as="h4">
            {`${t('favorites')}:`}
          </Heading>
          {!loadingControl ? (
            <Styled.DrinksContainer>
              {drinksToShow.map((drink) => (
                <DrinkComponent drink={drink} key={drink.idDrink} />
              ))}
            </Styled.DrinksContainer>
          ) : (
            <Styled.DrinksContainer>
              <Loading />
            </Styled.DrinksContainer>
          )}
          {drinks && drinks.length > 0 && loadMoreControl < drinks.length && (
            <ButtonComponent handleSubmit={handleShowMoreDrinks} bold={false}>
              {t('loadMoreButton')}
            </ButtonComponent>
          )}
        </Styled.Container>
      ) : (
        <ErrorComponent
          message={errorControl.message}
          code={errorControl.code}
        />
      )}
      <ReturnButton />
    </>
  );
};
