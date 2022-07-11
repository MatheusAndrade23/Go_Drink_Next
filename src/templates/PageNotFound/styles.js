import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${() => css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 80px;
  `}
`;
