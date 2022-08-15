import * as Styled from './styles';

import { DrinkComponent } from '../DrinkComponent';

export const DrinksContainer = ({ drinks }) => {
  return (
    <Styled.DrinksContainer>
      {drinks.map((drink) => (
        <DrinkComponent drink={drink} key={drink.idDrink} />
      ))}
    </Styled.DrinksContainer>
  );
};
