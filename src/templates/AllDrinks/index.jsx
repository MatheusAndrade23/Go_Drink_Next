import * as Styled from '../Kinds/styles';

import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinksContainer } from '../../components/DrinksContainer';

export const AllDrinks = ({ drinks }) => {
  return (
    <Styled.Container>
      <Heading size="small" as="h4">
        All Drinks:
      </Heading>
      <DrinksContainer drinks={drinks} />
      <ReturnButton />
    </Styled.Container>
  );
};
