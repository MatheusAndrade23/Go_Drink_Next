import styled, { css } from 'styled-components';

export const Menu = styled.ul`
  ${({ theme }) => css`
    width: 100%;
    border-bottom: 2px solid ${theme.colors.primaryColor};
    background-color: ${theme.colors.secondaryColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    & div.rec-carousel-wrapper{
      padding: ${theme.spacings.small};
      align-items: center;
      justify-content: center;

      @media ${theme.media.xsmallScreen} {
        padding: 10px;
      }
    }

    & button.rec-arrow {
      background-color: ${theme.colors.primaryColor} !important;
      color: ${theme.colors.fourthColor} !important;
      display: none;

      &:disabled{
        visibility: hidden;
      }

      &:hover{
        background-color: ${theme.colors.thirdColor} !important;
      }

      @media ${theme.media.mediumScreen} {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    & button.rec-dot {
      &.rec-dot_active {
        background-color: ${theme.colors.thirdColor} !important;
        box-shadow: 0 0 1px 3px ${theme.colors.thirdColor} !important;
      }

      &:focus{
        background-color: ${theme.colors.thirdColor} !important;
        box-shadow: 0 0 1px 3px ${theme.colors.thirdColor} !important;
      }

      &:hover{
        box-shadow: 0 0 1px 3px ${theme.colors.thirdColor} !important;
      }
    }
  `}
`;
