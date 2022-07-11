import styled, { css } from 'styled-components';

export const MessageContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    background-color: ${theme.colors.fourthColor};
    padding: 40px;
    width: max-content;
    max-width: 350px;
    text-align: center;
    z-index: 300;
    border: 2px solid ${theme.colors.primaryColor};
    border-radius: 10px;
    top: 70px;
    right: 70px;

    & p {
      color: ${theme.colors.thirdColor};
      font-weight: bold;
      font-family: ${theme.fonts.family.secondary};
    }

    @media ${theme.media.smallScreen} {
      right: 20px;
      left: 20px;
      width: auto;
    }
  `}
`;
