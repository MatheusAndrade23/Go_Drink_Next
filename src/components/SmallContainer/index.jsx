import * as Styled from './styles';

export const SmallContainer = ({ children, disposition = 'column' }) => {
  return (
    <Styled.Container disposition={disposition}>{children}</Styled.Container>
  );
};
