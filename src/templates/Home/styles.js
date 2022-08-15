import styled, { css } from 'styled-components';
import { DrinksContainer } from '../../components/DrinksContainer/styles';

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
    align-items: center;

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
    width: 100%;
    text-align: center;
    color: ${theme.colors.primaryColor};
    font-size: ${theme.fonts.sizes.medium};
    font-family: ${theme.fonts.family.secondary};
    padding-top: ${theme.spacings.large};
    border-top: 2px solid ${theme.colors.secondaryColor};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
  width: 100%;
    text-align: center;
    color: ${theme.colors.primaryColor};
    font-size: ${theme.fonts.sizes.xlarge};
    font-family: ${theme.fonts.family.secondary};
    margin-top: ${theme.spacings.small};
  `}
`;

export const RandomDrinks = styled(DrinksContainer)``;
