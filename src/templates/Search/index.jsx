import * as Styled from '../Kinds/styles';

import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';

export const Search = ({ drinks, search }) => {
  const { t } = useTranslation();

  return (
    <main>
      <Header search={search} />
      <Styled.Container>
        <Heading size="small" as="h4">
          {`${t('searchTitle')}: "${search}"`}
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
