import P from 'prop-types';
import * as Styled from './styles';

import { Heading } from '../Heading';
import { useTranslation } from 'react-i18next';

export const DrinkComponent = ({ drink }) => {
  const { idDrink, strDrink, strDrinkThumb } = drink;
  const { t } = useTranslation();
  return (
    <Styled.Drink
      onClick={() => (window.location.href = `/drink/${idDrink}`)}
      title={`${strDrink} ${t('details')}`}
    >
      <img src={strDrinkThumb} alt={strDrink} loading="lazy" />
      <Heading as="h6" size="small">
        {strDrink}
      </Heading>
    </Styled.Drink>
  );
};

DrinkComponent.propTypes = {
  drink: P.object.isRequired,
};
