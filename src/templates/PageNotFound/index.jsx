import * as Styled from './styles';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { TextComponent } from '../../components/TextComponent';
import { ReturnButton } from '../../components/ReturnButton';

export const PageNotFound = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Heading as="h2">Error 404</Heading>
        <TextComponent size="medium">This page does not exist!</TextComponent>
      </Styled.Container>
      <ReturnButton />
    </>
  );
};
