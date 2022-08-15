import * as Styled from './styles';

import { Heading } from '../Heading';
import { TextComponent } from '../TextComponent';
import { Header } from '../Header';

export const ErrorComponent = ({ code, message }) => {
  return (
    <>
      <Header />
      <Styled.Error>
        {code ? (
          <>
            <Heading as="h4" size="medium">
              {`Error ${code}`}
            </Heading>
            <TextComponent>{message}</TextComponent>
          </>
        ) : (
          <Heading as="h4" size="medium">
            {message}
          </Heading>
        )}
      </Styled.Error>
    </>
  );
};
