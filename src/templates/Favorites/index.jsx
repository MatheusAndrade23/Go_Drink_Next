import * as Styled from '../Kinds/styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { DrinkComponent } from '../../components/DrinkComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import config from '../../config';

export const Favorites = ({ drinks }) => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <Styled.Container>
        <Heading size="small" as="h4">
          {`${t('favorites')}:`}
        </Heading>
        <Styled.DrinksContainer>
          {drinks.map((drink) => (
            <DrinkComponent drink={drink} key={drink.idDrink} />
          ))}
        </Styled.DrinksContainer>
      </Styled.Container>
      <ReturnButton />
    </main>
  );
};
