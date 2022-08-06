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
