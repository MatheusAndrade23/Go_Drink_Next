import * as Styled from '../Kinds/styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinksContainer } from '../../components/DrinksContainer';

export const Search = ({ drinks, search }) => {
  return (
    <>
      <Header search={search} />
      <Styled.Container>
        <Heading size="small" as="h4">
          {`Search: "${search}"`}
        </Heading>
        <DrinksContainer drinks={drinks} />
      </Styled.Container>
      <ReturnButton />
    </>
  );
};
