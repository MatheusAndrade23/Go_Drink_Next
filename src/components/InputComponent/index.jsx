import * as Styled from './styles';

export const InputComponent = ({
  handleChange,
  type = 'text',
  name,
  text = '',
  placeholder,
  reference,
}) => {
  return (
    <>
      {text && <Styled.Label htmlFor={name}>{text}</Styled.Label>}
      <Styled.Input
        onChange={(e) => handleChange(e)}
        name={name}
        type={type}
        placeholder={placeholder}
        title={placeholder}
        ref={reference}
      />
    </>
  );
};
