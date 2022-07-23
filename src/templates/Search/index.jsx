import * as Styled from '../Kinds/styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';

export const Search = ({ drinks, search }) => {
  return (
    <main>
      <Header search={search} />
      <Styled.Container>
        <Heading size="small" as="h4">
          {`Search: "${search}"`}
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
