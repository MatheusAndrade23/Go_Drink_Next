/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { Heading } from '../../../../components/Heading';
import { GetTemplateTitle } from '../../../../utils/get-template-titile';

export const Kind = ({ kinds, kind, images, type, index }) => {
  return (
    <Styled.Kind
      title={GetTemplateTitle(kind, kinds[type])}
      key={kinds[type]}
      onClick={() =>
        (window.location.href = `/kind/${kind}/${kinds[type]
          .replace(/ /, '_')
          .replace('/', '_')}`)
      }
    >
      {images.length > 0 && <img src={images[index]} alt={kinds[type]} />}
      {kind === 'i' && (
        <img
          src={`https://www.thecocktaildb.com/images/ingredients/${kinds[type]}.png`}
          alt={kinds[type]}
        />
      )}
      <Heading as="h6" size="small">
        {kinds[type]}
      </Heading>
    </Styled.Kind>
  );
};
