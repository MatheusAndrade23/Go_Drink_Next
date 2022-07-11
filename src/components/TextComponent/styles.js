import styled, { css } from 'styled-components';

const TextSize = {
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

const TextCase = (uppercase) => css`
  text-transform: ${uppercase ? 'uppercase' : 'none'};
`;

export const Text = styled.p`
  ${({ theme, uppercase, size }) => css`
    color: ${theme.colors.primaryColor};
    font-size: ${theme.fonts.sizes.medium};
    margin: ${theme.spacings.small} 0;
    max-width: 500px;
    ${TextCase(uppercase)};
    ${TextSize[size](theme)};
  `}
`;
