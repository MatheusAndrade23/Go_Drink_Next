import * as Styled from './styles';

export const AuthLoading = () => {
  return (
    <Styled.Container>
      <Styled.Loader>
        <Styled.Ball />
        <Styled.Ball />
        <Styled.Ball />
        <Styled.Loading>Loading...</Styled.Loading>
      </Styled.Loader>
    </Styled.Container>
  );
};
