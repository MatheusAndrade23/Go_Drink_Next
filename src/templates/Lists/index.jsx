/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { Kind } from './components/Kind';
import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';

export const Lists = ({ kinds, kind, images, type, name }) => {
  return (
    <>
      <Header />
      <Styled.KindsContainer>
        <Heading size="small" as="h4">
          {`All ${name}:`}
        </Heading>
        <Styled.Container>
          {kinds.map((kinds, index) => (
            <Kind
              key={kinds[type]}
              kinds={kinds}
              type={type}
              images={images}
              kind={kind}
              index={index}
            />
          ))}
        </Styled.Container>
      </Styled.KindsContainer>
      <ReturnButton />
    </>
  );
};
