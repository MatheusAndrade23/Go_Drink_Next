import styled, { css } from 'styled-components';

const SetDisposition = {
  column: () => css`
    flex-direction: column;
  `,
  row: () => css`
    flex-direction: row;
  `,
};

export const Container = styled.div`
  ${({ disposition }) => css`
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    ${SetDisposition[disposition]()}
  `}
`;
