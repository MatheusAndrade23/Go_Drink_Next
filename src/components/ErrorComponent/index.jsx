import P from 'prop-types';
import * as Styled from './styles';

import { Heading } from '../Heading';
import { TextComponent } from '../TextComponent';
import { Header } from '../Header';
import { useTranslation } from 'react-i18next';

export const ErrorComponent = ({ code, message }) => {
  const { t } = useTranslation();
  return (
    <main>
      <Header />
      <Styled.Error>
        {code ? (
          <>
            <Heading as="h4" size="medium">
              {`${t('errorCode')} ${code}`}
            </Heading>
            <TextComponent>{message}</TextComponent>
          </>
        ) : (
          <Heading as="h4" size="medium">
            {message}
          </Heading>
        )}
      </Styled.Error>
    </main>
  );
};

ErrorComponent.propTypes = {
  code: P.number,
  message: P.string.isRequired,
};
