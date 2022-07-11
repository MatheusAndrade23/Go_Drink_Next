import styled, { css } from 'styled-components';

export const ReturnLink = styled.a`
  ${({ theme }) => css`
    position: fixed;
    color: ${theme.colors.thirdColor};
    top: 10px;
    left: 0px;
    height: 50px;
    width: 50px;
    font-size: ${theme.fonts.sizes.huge};

    &:hover {
      color: ${theme.colors.primaryColor};
    }

    @media ${theme.media.lteMedium} {
      font-size: ${theme.fonts.sizes.xlarge};
      top: 20px;
    }

    @media ${theme.media.xsmallScreen} {
      display: none;
    }
  `}
`;
