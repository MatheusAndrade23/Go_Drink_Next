/* eslint-disable @next/next/no-img-element */
import * as Styled from './styles';

import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';

import { GetThumbImg } from '../../utils/get-thumb-img';
import config from '../../config';

export const Lists = ({ kinds, kind, images, type, name }) => {
  const { t } = useTranslation();

  const getTemplateTitle = (index, word) => {
    const wordFormatted = `${word.charAt(0).toUpperCase()}${word
      .slice(1)
      .replace(/_/, ' ')}`;
    switch (index) {
      case 'i':
        return `Drinks that are made with ${wordFormatted}:`;

      case 'c':
        return `Drinks of the ${wordFormatted} category:`;

      case 'g':
        return `Drinks of the ${wordFormatted} ${
          word.includes('lass') ? ':' : index === 'g' && `glass:`
        }`;
    }
  };

  return (
    <main>
      <Header />
      <Styled.KindsContainer>
        <Heading size="small" as="h4">
          {`All ${name}:`}
        </Heading>
        <Styled.Container>
          {kinds.map((kinds, index) => (
            <Styled.Kind
              title={getTemplateTitle(kind, kinds[type])}
              key={kinds[type]}
              onClick={() =>
                (window.location.href = `/kind/${kind}/${kinds[type]
                  .replace(/ /, '_')
                  .replace('/', '_')}`)
              }
            >
              {images.length > 0 && <img src={images[index]} />}
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
          ))}
        </Styled.Container>
      </Styled.KindsContainer>
      <ReturnButton />
    </main>
  );
};
