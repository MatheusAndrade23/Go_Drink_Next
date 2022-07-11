import styled, { css } from 'styled-components';

const LinkModel = {
  standard: (theme) => css`
    margin: ${theme.spacings.small} ${theme.spacings.xsmall};
    color: ${theme.colors.thirdColor};
    &:hover {
      text-decoration: underline;
    }
  `,
  alternative: (theme) => css`
    color: ${theme.colors.primaryColor};
    padding: ${theme.spacings.xsmall};
    border: 1px solid ${theme.colors.secondaryColor};
    &:hover {
      border: 1px solid ${theme.colors.primaryColor};
    }
  `,
};

const LinkSize = {
  xsmall: (theme) => css`
    font-size: ${theme.fonts.sizes.xsmall};
  `,
  small: (theme) => css`
    font-size: ${theme.fonts.sizes.small};
  `,
  medium: (theme) => css`
    font-size: ${theme.fonts.sizes.medium};
  `,
};

const LinkCase = (uppercase) => css`
  text-transform: ${uppercase ? 'uppercase' : 'none'};
`;

export const Link = styled.a`
  ${({ theme, uppercase, size, model }) => css`
    ${LinkCase(uppercase)};
    ${LinkSize[size](theme)};
    ${LinkModel[model](theme)};
    text-align: center;
  `}
`;
