import P from 'prop-types';
import * as Styled from './styles';

export const Logo = ({ smallText, text, srcImg = '' }) => {
  return (
    <Styled.Logo href="/">
      <p>{srcImg ? <Styled.LogoImg src={srcImg} alt={text} /> : text}</p>
      <Styled.SmallText>{smallText && smallText}</Styled.SmallText>
    </Styled.Logo>
  );
};

Logo.propTypes = {
  text: P.string.isRequired,
  smallText: P.string.isRequired,
  srcImg: P.string,
};
