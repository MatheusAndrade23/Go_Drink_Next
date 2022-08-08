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
  const id = drink.idDrink;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    await updateFavorites(id, drink, isFavorite);
  };

  useEffect(() => {
    const { favorites, authenticated } = user;
    if (!authenticated) {
      return;
    }
    if (favorites.includes(id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [id, user]);

  return (
    <main>
      <Header />
      <Styled.Drink>
        <Styled.DrinkImg src={drink.strDrinkThumb} alt={drink.strDrink} />
        <Styled.Info>
          <Styled.Favorite onClick={handleFavorite}>
            {isFavorite ? (
              <AiFillStar title="Remove from Favorites" />
            ) : (
              <AiOutlineStar title="Add to Favorites" />
            )}
          </Styled.Favorite>
          <Heading>{drink.strDrink}</Heading>
          <SmallContainer disposition="row">
            <span>{drink.strCategory}</span>
            <span>{drink.strGlass}</span>
            <span>{drink.strAlcoholic}</span>
          </SmallContainer>
          <SmallContainer disposition="row">
            <Styled.List>
              <>
                <Heading size="small" as="h6">
                  Ingredients:
                </Heading>
                {ingredients.ingredients.map((ingredient, index) => (
                  <li key={`${ingredient}-${index}`}>{ingredient}</li>
                ))}
              </>
            </Styled.List>
            <Styled.List>
              <>
                <Heading size="small" as="h6">
                  Measures:
                </Heading>
                {ingredients.measures.map((measure, index) => (
                  <li key={`${measure}-${index}`}>{measure}</li>
                ))}
              </>
            </Styled.List>
          </SmallContainer>
          <Heading as="h6" size="small">
            Instructions:
          </Heading>
          <Styled.Instructions>{drink.strInstructions}</Styled.Instructions>
        </Styled.Info>
      </Styled.Drink>
      <ReturnButton />
    </main>
  );
};
