import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { db } from '../../services/api';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { Loading } from '../../components/Loading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const Kinds = () => {
  const { index, kind } = useParams();
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

  const getTemplateTitle = (index, word) => {
    const wordFormatted = `${word.charAt(0).toUpperCase()}${word
      .slice(1)
      .replace(/_/, ' ')}`;
    switch (index) {
      case 'i':
        return `${t('ingredientTitle')} ${wordFormatted}:`;

      case 'c':
        return `${t('drinksKindCategory')} ${wordFormatted} ${t('category')}:`;

      case 'g':
        return `${t('drinksKindGlass')} ${wordFormatted} ${
          word.includes('lass') ? ':' : index === 'g' && `${t('glass')}:`
        }`;

      case 'a':
        if (wordFormatted.charAt(0) === 'A') {
          return `${t('headerLinkAlcoholic')}:`;
        } else if (wordFormatted.charAt(0) === 'N') {
          return `${t('headerLinkNAlcoholic')}:`;
        } else {
          return `${t('headerLinkOAlcoholic')}:`;
        }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await db.get(`/api/json/v1/1/filter.php?${index}=${kind}`);
        try {
          const drinks = resp.data.drinks.reverse();
          setDrinks(drinks);
          setLoadingControl(false);
          setDrinksToShow(drinks.slice(0, DRINKS_PER_PAGE));
        } catch (error) {
          setDrinks(null);
        }
      } catch (err) {
        setDrinks(undefined);
      }
    })();
  }, [index, kind]);

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      document.title = `${`${kind.charAt(0).toUpperCase()}${kind
        .slice(1)
        .replace(/_/, ' ')}`} | ${config.siteName} `;
    } else if (drinks === null) {
      window.location.href = '/not-found';
    } else if (drinks === undefined) {
      setErrorControl({
        error: true,
        message: t('error500message'),
        code: 500,
      });
      document.title = `${t('serverErrorTitle')} | ${config.siteName} `;
    }
  }, [drinks, kind, t]);

  return (
    <>
      <Header />
      {!errorControl.error ? (
        <Styled.Container>
          {!loadingControl ? (
            <>
              <Heading size="small" as="h4">
                {getTemplateTitle(index, kind)}
              </Heading>
              <Styled.DrinksContainer>
                {drinksToShow.map((drink) => (
                  <DrinkComponent drink={drink} key={drink.idDrink} />
                ))}
              </Styled.DrinksContainer>
            </>
          ) : (
            <Styled.DrinksContainer>
              <Loading />
            </Styled.DrinksContainer>
          )}
          {drinks && loadMoreControl < drinks.length && (
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
