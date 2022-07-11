import P from 'prop-types';
import * as Styled from './styles';

export const LinkComponent = ({
  children,
  link,
  uppercase = false,
  size = 'small',
  model = 'standard',
}) => {
  return (
    <Styled.Link href={link} uppercase={uppercase} size={size} model={model}>
      {children}
    </Styled.Link>
  );
};

LinkComponent.propTypes = {
  children: P.node.isRequired,
  link: P.string.isRequired,
  uppercase: P.bool,
  size: P.oneOf(['xsmall', 'small', 'medium']),
  model: P.oneOf(['standard', 'alternative']),
};
