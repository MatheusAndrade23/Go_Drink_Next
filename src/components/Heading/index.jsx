import P from 'prop-types';
import * as Styled from './styles';

export const Heading = ({
  children,
  uppercase = false,
  as = 'h1',
  size = 'big',
}) => {
  return (
    <Styled.Heading as={as} uppercase={uppercase} size={size}>
      {children}
    </Styled.Heading>
  );
};

Heading.propTypes = {
  children: P.node.isRequired,
  uppercase: P.bool,
  as: P.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  size: P.oneOf(['small', 'medium', 'big', 'huge']),
};
