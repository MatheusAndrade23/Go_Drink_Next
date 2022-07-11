import * as Styled from './styles';

import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Heading } from '../../components/Heading';
import { TextComponent } from '../../components/TextComponent';
import { ReturnButton } from '../../components/ReturnButton';

export const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Styled.Container>
        <Heading as="h2">{t('pageNotFoundError')}</Heading>
        <TextComponent size="medium">{t('pageNotFound')}</TextComponent>
      </Styled.Container>
      <ReturnButton />
    </>
  );
};
