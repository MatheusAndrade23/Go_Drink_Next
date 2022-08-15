import * as Styled from './styles';

import { useState, useEffect, useContext } from 'react';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { AuthContext } from '../../providers/AuthProvider/index';

import { toast } from 'react-toastify';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { SmallContainer } from '../../components/SmallContainer';

import config from '../../config';

export const Drink = ({ drink, ingredients }) => {
  const { user, updateFavorites } = useContext(AuthContext);
  const {
    idDrink: id,
    strDrink,
    strCategory,
    strGlass,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
  } = drink;

  const isFavorite = user.favorites.includes(id) ? true : false;

  const handleUpdateFavorites = async () => {
    updateFavorites(id, drink, isFavorite);
  };

  return (
    <>
      <Header />
      <Styled.Drink>
        <Styled.DrinkImg src={strDrinkThumb} alt={drink.strDrink} />
        <Styled.Info>
          <Styled.Favorite onClick={handleUpdateFavorites}>
            {isFavorite ? (
              <AiFillStar title="Remove from Favorites" />
            ) : (
              <AiOutlineStar title="Add to Favorites" />
            )}
          </Styled.Favorite>
          <Heading>{strDrink}</Heading>
          <SmallContainer disposition="row">
            <span>{strCategory}</span>
            <span>{strGlass}</span>
            <span>{strAlcoholic}</span>
          </SmallContainer>
          <SmallContainer disposition="row">
            <Styled.List>
              <table>
                <tr>Ingredients:</tr>
                {ingredients.ingredients.map((ingredient, index) => (
                  <tr key={`${ingredient}-${index}`}>{ingredient}</tr>
                ))}
              </table>
            </Styled.List>
            <Styled.List>
              <table>
                <tr>Measures:</tr>
                {ingredients.measures.map((measure, index) => (
                  <tr key={`${measure}-${index}`}>{measure}</tr>
                ))}
              </table>
            </Styled.List>
          </SmallContainer>
          <Heading as="h6" size="small">
            Instructions:
          </Heading>
          <Styled.Instructions>{strInstructions}</Styled.Instructions>
        </Styled.Info>
      </Styled.Drink>
      <ReturnButton />
    </>
  );
};
