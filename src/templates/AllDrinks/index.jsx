import * as Styled from '../Kinds/styles';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { db } from '../../services/api';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const AllDrinks = () => {
  const { t } = useTranslation();
  const DRINKS_PER_PAGE = 8;

  const [loadMoreControl, setLoadMoreControl] = useState(DRINKS_PER_PAGE);
  const [drinksToShow, setDrinksToShow] = useState([]);
  const [next, setNext] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [loadingControl, setLoadingControl] = useState(true);
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
    (async () => {
      try {
        const resp = await db.get('/api/json/v1/1/filter.php?a=alcoholic');
        const resp2 = await db.get('/api/json/v1/1/filter.php?a=non_alcoholic');
        const resp3 = await db.get(
          '/api/json/v1/1/filter.php?a=optional_alcohol',
        );
        const alcoholic = resp.data.drinks.reverse();
        const non_alcoholic = resp2.data.drinks.reverse();
        const optional_alcohol = resp3.data.drinks.reverse();
        setDrinks([...alcoholic, ...non_alcoholic, ...optional_alcohol]);
      } catch (err) {
        setDrinks(undefined);
      }
    })();
  }, []);

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      setDrinksToShow(drinks.slice(0, DRINKS_PER_PAGE));
      setLoadingControl(false);
      document.title = `${t('headerLinkADrinks')} | ${config.siteName} `;
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
            {`${t('headerLinkADrinks')}:`}
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
          code={errorControl.code && errorControl.code}
        />
      )}
      <ReturnButton />
    </>
  );
};
