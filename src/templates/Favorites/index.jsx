import * as Styled from '../Kinds/styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';

import config from '../../config';

export const Favorites = ({ drinks }) => {
  return (
    <main>
      <Header />
      <Styled.Container>
        <Heading size="small" as="h4">
          Favorites:
        </Heading>
        <Styled.DrinksContainer>
          {drinks.map((drink) => (
            <DrinkComponent drink={drink} key={drink.idDrink} />
          ))}
        </Styled.DrinksContainer>
      </Styled.Container>
      <ReturnButton />
    </main>
  );
};
