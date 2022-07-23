import * as Styled from './styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';

import config from '../../config';

export const Kinds = ({ drinks, index, kind }) => {
  const getTemplateTitle = (index, word) => {
    const wordFormatted = `${word.charAt(0).toUpperCase()}${word
      .slice(1)
      .replace(/_/, ' ')}`;
    switch (index) {
      case 'i':
        return `Drinks that are made with ${wordFormatted}:`;

      case 'c':
        return `Drinks of the ${wordFormatted} category:`;

      case 'g':
        return `Drinks of the ${wordFormatted} ${
          word.includes('lass') ? ':' : index === 'g' && `glass:`
        }`;

      case 'a':
        if (wordFormatted.charAt(0) === 'A') {
          return `Alcoholic:`;
        } else if (wordFormatted.charAt(0) === 'N') {
          return `Non Alcoholic:`;
        } else {
          return `Optional Alcoholic:`;
        }
    }
  };

  return (
    <main>
      <Header />
      <Styled.Container>
        <Heading size="small" as="h4">
          {getTemplateTitle(index, kind)}
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
