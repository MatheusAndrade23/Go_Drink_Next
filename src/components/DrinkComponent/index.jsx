/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { Heading } from '../Heading';

export const DrinkComponent = ({ drink }) => {
  const { idDrink, strDrink, strDrinkThumb } = drink;
  return (
    <Styled.Drink
      onClick={() => (window.location.href = `/drink/${idDrink}`)}
      title={`${strDrink} details`}
    >
      <img src={strDrinkThumb} alt={strDrink} loading="lazy" />
      <Heading as="h6" size="small">
        {strDrink}
      </Heading>
    </Styled.Drink>
  );
};
