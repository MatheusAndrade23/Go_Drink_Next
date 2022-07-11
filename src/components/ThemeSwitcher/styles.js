import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    position: fixed;
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.fourthColor};
    bottom: 10px;
    right: 20px;
    z-index: 6;
    opacity: 0.5;
    cursor: pointer;
    font-weight: bold;
    height: 30px;
    width: 200px;
    border: none;
    transition: 0.5s;
  `}
`;
