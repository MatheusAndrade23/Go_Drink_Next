import styled, { css } from 'styled-components';

export const Logo = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.thirdColor};
    font-weight: bold;
    text-align: center;
    font-size: ${theme.fonts.sizes.large};

    & p{
      font-family: ${theme.fonts.family.secondary};
    }

    @media ${theme.media.lteMedium} {
      & p{
        display: none;
      }
    }
    @media ${theme.media.xsmallScreen} {
      & p{
        display: block;
      }
    }
  `}
`;

export const SmallText = styled.span`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.secondary};
    display: none;
    @media ${theme.media.lteMedium} {
      min-width: 100px;
      display: block
    }
    @media ${theme.media.xsmallScreen} {
      display: none;
    }
  `}
`;

export const LogoImg = styled.img`
  ${() => css`
    height: 100px;
  `}
`;
