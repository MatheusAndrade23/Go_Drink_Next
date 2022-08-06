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
