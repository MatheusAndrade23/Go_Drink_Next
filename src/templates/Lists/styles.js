import styled, { css } from 'styled-components';

export const KindsContainer = styled.section`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.fourthColor};
    min-height: 100vh;
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

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 20px 0 30px 0;
  `}
`;
