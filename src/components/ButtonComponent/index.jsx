import * as Styled from './styles';

export const ButtonComponent = ({
  children,
  handleSubmit,
  bold = true,
  uppercase = false,
  size = 'small',
  model = 'standard',
  name = '',
  disabled,
}) => {
  return (
    <Styled.Button
      onClick={handleSubmit}
      uppercase={uppercase}
      bold={bold}
      size={size}
      model={model}
      title={
        disabled
          ? 'Please type something to search'
          : model === 'icon'
          ? name
          : children
      }
      disabled={disabled}
    >
      {children}
    </Styled.Button>
  );
};
