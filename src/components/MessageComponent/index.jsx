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
