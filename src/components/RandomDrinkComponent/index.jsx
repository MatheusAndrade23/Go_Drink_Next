import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import { db } from '../../services/api';

import { Heading } from '../Heading';
import { Loading } from '../Loading';

export const RandomDrinkComponent = () => {
  const { t } = useTranslation();

  const [drink, setDrink] = useState([]);
  const [error, setError] = useState(false);
  const [loadingControl, setLoadingControl] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await db.get('/api/json/v1/1/random.php');
        setDrink(resp.data.drinks[0]);
        setLoadingControl(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoadingControl(false);
      }
    })();
  }, []);

  return (
    <>
      {!error && !loadingControl ? (
        <Styled.Drink
          key={drink.idDrink}
          onClick={() => (window.location.href = `/drink/${drink.idDrink}`)}
          title={`${drink.strDrink} ${t('details')}`}
        >
          <img src={drink.strDrinkThumb} alt={drink.strDrink} loading="lazy" />
          <Heading as="h6" size="small">
            {drink.strDrink}
          </Heading>
        </Styled.Drink>
      ) : loadingControl ? (
        <Styled.Drink>
          <Loading />
        </Styled.Drink>
      ) : (
        <Styled.Drink>
          <Heading as="h5" size="small">
            {t('error500message')}
          </Heading>
        </Styled.Drink>
      )}
    </>
  );
};
