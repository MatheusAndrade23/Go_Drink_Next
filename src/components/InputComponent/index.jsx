import P from 'prop-types';
import * as Styled from './styles';

export const InputComponent = ({
  handleChange,
  type = 'text',
  name,
  text = '',
  placeholder,
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
      />
    </>
  );
};

InputComponent.propTypes = {
  handleChange: P.func.isRequired,
  type: P.oneOf(['text', 'email', 'password']),
  name: P.string.isRequired,
  text: P.string,
  placeholder: P.string.isRequired,
};
