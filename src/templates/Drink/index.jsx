import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { db, api } from '../../services/api';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { IngredientsArray } from '../../utils/ingredients-array';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { Loading } from '../../components/Loading';
import { ReturnButton } from '../../components/ReturnButton';
import { SmallContainer } from '../../components/SmallContainer';
import { ErrorComponent } from '../../components/ErrorComponent';
import { MessageComponent } from '../../components/MessageComponent';

import config from '../../config';

export const Drink = () => {
  const { user, updateFavorites } = useContext(AuthContext);
  const { t } = useTranslation();
  const { id } = useParams();

  const [drink, setDrink] = useState('');
  const [message, setMessage] = useState(undefined);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState({});
  const [loadingControl, setLoadingControl] = useState(true);
  const [errorControl, setErrorControl] = useState({
    error: false,
    message: '',
  });

  const handleFavorite = async () => {
    if (!user.authenticated) {
      setMessage(t('notAuthenticated'));
      return;
    }
    try {
      await api.patch(`/drink/favorites/${user._id}`, {
        drink,
        drinkId: id,
      });
      await updateFavorites(drink);
    } catch (err) {
      setDrink(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await db.get(`/api/json/v1/1/lookup.php?i=${id}`);
        try {
          const drink = resp.data.drinks[0];
          const ingredients = IngredientsArray(drink);
          setIngredients(ingredients);
          setDrink(drink);
          setLoadingControl(false);
        } catch (error) {
          setDrink(null);
        }
      } catch (error) {
        setDrink(undefined);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (drink) {
      document.title = `${drink.strDrink} | ${config.siteName}`;
    } else if (drink === null) {
      window.location.href = '/not-found';
    } else if (drink === undefined) {
      setErrorControl({
        error: true,
        message: t('error500message'),
        code: 500,
      });
      document.title = `${t('serverErrorTitle')} | ${config.siteName} `;
    }
  }, [drink, t]);

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
    <>
      <Header />
      {!errorControl.error ? (
        <Styled.Drink>
          {!loadingControl && drink ? (
            <>
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
                <Styled.Instructions>
                  {drink.strInstructions}
                </Styled.Instructions>
              </Styled.Info>
            </>
          ) : (
            <Loading />
          )}
        </Styled.Drink>
      ) : (
        <ErrorComponent
          message={errorControl.message}
          code={errorControl.code}
        />
      )}
      {message && <MessageComponent message={message} hide={setMessage} />}
      <ReturnButton />
    </>
  );
};
