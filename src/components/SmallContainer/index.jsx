import P from 'prop-types';
import * as Styled from './styles';

export const SmallContainer = ({ children, disposition = 'column' }) => {
  return (
    <Styled.Container disposition={disposition}>{children}</Styled.Container>
  );
};

SmallContainer.propTypes = {
  children: P.node.isRequired,
  disposition: P.oneOf(['column', 'row']),
};
