/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { useState, useEffect } from 'react';

import { db } from '../../services/api';

import { Heading } from '../Heading';
import { Loading } from '../Loading';

export const RandomDrinkComponent = () => {
  const [drink, setDrink] = useState({});
  const [error, setError] = useState(false);
  const [loadingControl, setLoadingControl] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await db.get('/api/json/v1/1/random.php');
        setDrink(resp.data.drinks[0]);
        setLoadingControl(false);
      } catch (error) {
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
          title={`${drink.strDrink} details`}
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
          <Heading as="h6" size="small">
            Server Error
          </Heading>
        </Styled.Drink>
      )}
    </>
  );
};
