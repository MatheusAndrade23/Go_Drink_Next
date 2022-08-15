/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { Kind } from './components/Kind';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';

export const Lists = ({ kinds, kind, images, type, name }) => {
  return (
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
      <ReturnButton />
    </Styled.KindsContainer>
  );
};
