import * as Styled from './styles';
import { useTranslation } from 'react-i18next';

export const AuthLoading = () => {
  const { t } = useTranslation();
  return (
    <Styled.Container>
      <Styled.Loader>
        <Styled.Ball />
        <Styled.Ball />
        <Styled.Ball />
        <Styled.Loading>{t('loading')}</Styled.Loading>
      </Styled.Loader>
    </Styled.Container>
  );
};
