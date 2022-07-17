import * as Styled from '../Kinds/styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

export const Search = ({ drinks, search }) => {
  const { t } = useTranslation();
  const DRINKS_PER_PAGE = 8;

  const [loadMoreControl, setLoadMoreControl] = useState(DRINKS_PER_PAGE);
  const [drinksToShow, setDrinksToShow] = useState([]);
  const [next, setNext] = useState(0);

  const handleShowMoreDrinks = () => {
    const nextPage = next + DRINKS_PER_PAGE;
    const nextDrinks = drinks.slice(nextPage, nextPage + DRINKS_PER_PAGE);
    setDrinksToShow([...drinksToShow, ...nextDrinks]);
    setNext(nextPage);
    setLoadMoreControl((loaded) => loaded + DRINKS_PER_PAGE);
  };

  useEffect(() => {
    setDrinksToShow(drinks.slice(0, DRINKS_PER_PAGE));
  }, [drinks]);

  return (
    <main>
      <Header search={search} />
      <Styled.Container>
        <Heading size="small" as="h4">
          {`${t('searchTitle')}: "${search}"`}
        </Heading>
        <Styled.DrinksContainer>
          {drinksToShow.map((drink) => (
            <DrinkComponent drink={drink} key={drink.idDrink} />
          ))}
        </Styled.DrinksContainer>
        {loadMoreControl < drinks.length && (
          <ButtonComponent handleSubmit={handleShowMoreDrinks} bold={false}>
            {t('loadMoreButton')}
          </ButtonComponent>
        )}
      </Styled.Container>
      <ReturnButton />
    </main>
  );
};
