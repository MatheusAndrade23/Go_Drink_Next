import styled, { css } from 'styled-components';

export const DrinksContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 20px 0 30px 0;
  `}
`;
