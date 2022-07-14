import styled, { css } from 'styled-components';

export const Error = styled.main`
  ${({ theme }) => css`
    width: 100%;
    min-height: 80vh;
    background-color: ${theme.colors.fourthColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
  `}
`;
