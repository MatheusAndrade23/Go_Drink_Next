import * as Styled from './styles';

import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';

import config from '../../config';

export const Kinds = ({ drinks, index, kind }) => {
  const { t } = useTranslation();

  const getTemplateTitle = (index, word) => {
    const wordFormatted = `${word.charAt(0).toUpperCase()}${word
      .slice(1)
      .replace(/_/, ' ')}`;
    switch (index) {
      case 'i':
        return `${t('ingredientTitle')} ${wordFormatted}:`;

      case 'c':
        return `${t('drinksKindCategory')} ${wordFormatted} ${t('category')}:`;

      case 'g':
        return `${t('drinksKindGlass')} ${wordFormatted} ${
          word.includes('lass') ? ':' : index === 'g' && `${t('glass')}:`
        }`;

      case 'a':
        if (wordFormatted.charAt(0) === 'A') {
          return `${t('headerLinkAlcoholic')}:`;
        } else if (wordFormatted.charAt(0) === 'N') {
          return `${t('headerLinkNAlcoholic')}:`;
        } else {
          return `${t('headerLinkOAlcoholic')}:`;
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
