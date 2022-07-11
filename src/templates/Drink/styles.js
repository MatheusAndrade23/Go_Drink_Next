import styled, { css } from 'styled-components';

export const List = styled.ul`
  ${({ theme }) => css`
    margin: ${theme.spacings.small} ${theme.spacings.small}
      ${theme.spacings.small} 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & li {
      color: ${theme.colors.primaryColor};
      margin-bottom: 5px;
    }
  `}
`;

export const Instructions = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.small};
    color: ${theme.colors.primaryColor};
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    width: 50%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 20px;
    min-width: 450px;

    & span {
      font-weight: bold;
      padding: 4px;
      border-radius: 10px;
      margin-top: ${theme.spacings.small};
      margin-right: ${theme.spacings.small};
      color: ${theme.colors.fourthColor};
      background-color: ${theme.colors.primaryColor};
    }

    & h1{
      max-width: 86%;

      @media ${theme.media.smallScreen} {
        font-size: 35px;
      }

      @media ${theme.media.xxsmallScreen} {
        font-size: ${theme.fonts.sizes.large};
      }
    }

    & h6 {
      margin-bottom: 10px;
    }

    & > div{
      width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    @media (max-width: 1080px) {
      width: 100%;
      min-width: 100px;
    }


  `}
`;

export const Favorite = styled.button`
  ${() => css`
      position: absolute;
      background-color: transparent;
      border: none;
      color: #EEAD2D;
      font-size: 35px;
      right: 10px;
      cursor: pointer;
      transition: 0.5s;

      &:hover{
        transform: scale(1.1);
        color: yellow;
      }
  `}
`;

export const DrinkImg = styled.img`
  ${({ theme }) => css`
    border: 2px solid ${theme.colors.primaryColor};
    width: 400px;
    margin: 20px;
    justify-self: center;

    @media ${theme.media.lteMedium} {
      max-height: 600px;
      max-width: 600px;
      width: 85%;
    }

    @media ${theme.media.smallScreen} {
      align-self: center;
      justify-self: center;
    }
  `}
`;

export const Drink = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    background-color: ${theme.colors.fourthColor};
    padding: ${theme.spacings.large} ${theme.spacings.huge};
    display: flex;
    flex-flow: row wrap-reverse;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;

    @media ${theme.media.smallScreen} {
      padding: ${theme.spacings.xsmall};
    }
  `}
`;
