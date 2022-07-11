import P from 'prop-types';
import { useEffect } from 'react';
import * as Styled from './styles';

export const MessageComponent = ({ message, hide }) => {
  useEffect(() => {
    setTimeout(() => {
      hide(null);
    }, 3000);
  }, [hide]);
  return (
    <Styled.MessageContainer>
      <p>{message}</p>
    </Styled.MessageContainer>
  );
};

MessageComponent.propTypes = {
  message: P.string.isRequired,
  hide: P.func.isRequired,
};
