import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';

import { db, api } from '../../services/api';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { IngredientsArray } from '../../utils/ingredients-array';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { SmallContainer } from '../../components/SmallContainer';

import config from '../../config';

export const Drink = ({ drink, ingredients }) => {
  const { user, updateFavorites } = useContext(AuthContext);
  const { t } = useTranslation();
  const id = drink.idDrink;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    await updateFavorites(id, drink);
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
              <AiFillStar title={t('removeFavorites')} />
            ) : (
              <AiOutlineStar title={t('addFavorite')} />
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
                  {`${t('drinkIngredients')}:`}
                </Heading>
                {ingredients.ingredients.map((ingredient, index) => (
                  <li key={`${ingredient}-${index}`}>{ingredient}</li>
                ))}
              </>
            </Styled.List>
            <Styled.List>
              <>
                <Heading size="small" as="h6">
                  {`${t('drinkMeasures')}:`}
                </Heading>
                {ingredients.measures.map((measure, index) => (
                  <li key={`${measure}-${index}`}>{measure}</li>
                ))}
              </>
            </Styled.List>
          </SmallContainer>
          <Heading as="h6" size="small">
            {t('instructions')}
          </Heading>
          <Styled.Instructions>{drink.strInstructions}</Styled.Instructions>
        </Styled.Info>
      </Styled.Drink>
      <ReturnButton />
    </main>
  );
};
