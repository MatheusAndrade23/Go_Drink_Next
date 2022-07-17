/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { useTranslation } from 'next-i18next';

import { FaCocktail } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';

import { Header } from '../../components/Header';

import { TextComponent } from '../../components/TextComponent';
import { SmallContainer } from '../../components/SmallContainer';
import { DrinkComponent } from '../../components/DrinkComponent';
import { RandomDrinkComponent } from '../../components/RandomDrinkComponent';

import config from '../../config';
import popularDrinks from './popular-drinks.js';

export const Home = (props) => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <Styled.HomeContainer>
        <Styled.Init>
          <img
            src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
          <SmallContainer>
            <Styled.Title>{t('welcome')}</Styled.Title>
            <TextComponent size="medium">{t('description')}</TextComponent>
            <Styled.Info>
              <SmallContainer disposition="row">
                <FaCocktail />
                <p>{t('tCocktails')}</p>
              </SmallContainer>
              <SmallContainer disposition="row">
                <GiFruitBowl />
                <p>{t('tIngredients')}</p>
              </SmallContainer>
            </Styled.Info>
            <TextComponent size="medium">{t('feature')}</TextComponent>
          </SmallContainer>
          <img
            src="https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
        </Styled.Init>
        <Styled.SecTitle>{t('popularTitle')}</Styled.SecTitle>
        <Styled.RandomDrinks>
          {popularDrinks.drinks.map((drink) => (
            <DrinkComponent drink={drink} key={drink.idDrink} />
          ))}
        </Styled.RandomDrinks>
        <Styled.SecTitle>{t('randomTitle')}</Styled.SecTitle>
        <Styled.RandomDrinks>
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
          <RandomDrinkComponent />
        </Styled.RandomDrinks>
      </Styled.HomeContainer>
    </main>
  );
};
