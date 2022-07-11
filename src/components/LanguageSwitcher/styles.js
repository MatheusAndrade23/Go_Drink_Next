import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: center !important;
    align-items: center;
    color: ${theme.colors.primaryColor};
    bottom: 35px;
    right: 20px;
    z-index: 6;
    padding: 4px 0;
    font-weight: bold;

    p {
      opacity: 0.5;
      margin-right: 10px;
    }
  `}
`;

export const FlagButton = styled.button`
  ${({ selected }) => css`
    cursor: pointer;
    background: transparent;
    border: none;
    margin-left: 5px;
    opacity: ${selected ? '1' : '0.5'};

    span{
      font-size: 20px;
    }
  `}
`;
