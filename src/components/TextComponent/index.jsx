import P from 'prop-types';
import * as Styled from './styles';

export const TextComponent = ({
  children,
  uppercase = false,
  size = 'small',
}) => {
  return (
    <Styled.Text uppercase={uppercase} size={size}>
      {children}
    </Styled.Text>
  );
};

TextComponent.propTypes = {
  children: P.node.isRequired,
  uppercase: P.bool,
  size: P.oneOf(['xsmall', 'small', 'medium']),
};
