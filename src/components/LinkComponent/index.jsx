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
