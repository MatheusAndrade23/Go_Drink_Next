import * as Styled from './styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinkComponent } from '../../components/DrinkComponent';
import { DrinksContainer } from '../../components/DrinksContainer';

import { GetTemplateTitle } from '../../utils/get-template-titile';

export const Kinds = ({ drinks, index, kind }) => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Heading size="small" as="h4">
          {GetTemplateTitle(index, kind)}
        </Heading>
        <DrinksContainer drinks={drinks} />
      </Styled.Container>
      <ReturnButton />
    </>
  );
};
