import styled, { css } from 'styled-components';

export const HomeContainer = styled.section`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.fourthColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;
    color: ${theme.colors.primaryColor};

    p {
      margin-left: 5px;
    }

    svg{
      font-size: 23px;
    }
  `}
`;

export const Init = styled.div`
  ${({ theme }) => css`
    min-height: 72vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: ${theme.spacings.medium};
    align-items: center;
    border-bottom: 2px solid ${theme.colors.secondaryColor};

    p {
      font-size: ${theme.fonts.sizes.small};
      font-style: ${theme.fonts.family.secondary};
      text-align: center;
    }

    img {
      min-width: 170px;
      width: 18%;
      border: 2px solid ${theme.colors.primaryColor};

      @media ${theme.media.lteMedium} {
        display: none;
      }
    }

    @media ${theme.media.smallScreen} {
      padding: 0 20px;
    }
  `}
`;

export const SecTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primaryColor};
    width: max-content;
    font-size: ${theme.fonts.sizes.medium};
    font-family: ${theme.fonts.family.secondary};
    margin-top: ${theme.spacings.medium};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primaryColor};
    width: max-content;
    font-size: ${theme.fonts.sizes.xlarge};
    font-family: ${theme.fonts.family.secondary};
    margin-top: ${theme.spacings.small};
    width: 100%;
    text-align: center;
  `}
`;

export const RandomDrinks = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: ${theme.spacings.medium} 0;
  `}
`;
