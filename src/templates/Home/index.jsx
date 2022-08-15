/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { FaCocktail } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';

import { Header } from '../../components/Header';

import { TextComponent } from '../../components/TextComponent';
import { SmallContainer } from '../../components/SmallContainer';
import { DrinkComponent } from '../../components/DrinkComponent';
import { DrinksContainer } from '../../components/DrinksContainer';
import { RandomDrinkComponent } from '../../components/RandomDrinkComponent';

import config from '../../config';
import popularDrinks from './popular-drinks.js';

export const Home = (props) => {
  return (
    <>
      <Header />
      <Styled.HomeContainer>
        <Styled.Init>
          <img
            src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
          <SmallContainer>
            <Styled.Title>Welcome to GODRINK</Styled.Title>
            <TextComponent size="medium">
              An open source website with over 600 different cocktails recipes
              from around the world.
            </TextComponent>
            <Styled.Info>
              <SmallContainer disposition="row">
                <FaCocktail />
                <p>Total Cocktails: 635</p>
              </SmallContainer>
              <SmallContainer disposition="row">
                <GiFruitBowl />
                <p>Total Ingredients: 488</p>
              </SmallContainer>
            </Styled.Info>
            <TextComponent size="medium">
              You can also add your favorite recipes to a favorites list, but
              for that you need to create an account before.
            </TextComponent>
          </SmallContainer>
          <img
            src="https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Drink image"
          />
        </Styled.Init>
        <Styled.SecTitle>Popular drinks:</Styled.SecTitle>
        <DrinksContainer drinks={popularDrinks.drinks} />
        <Styled.SecTitle>Random Drinks:</Styled.SecTitle>
        <Styled.RandomDrinks>
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
    </>
  );
};
