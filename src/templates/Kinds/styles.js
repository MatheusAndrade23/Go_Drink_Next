import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.fourthColor};
    min-height: 84vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;

    & h4 {
      align-self: flex-start;
      margin-left: 30px;
    }

    & button {
      width: 160px;
    }
  `}
`;
