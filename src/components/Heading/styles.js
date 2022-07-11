import styled, { css } from 'styled-components';

const HeadingSize = {
  small: (theme) => css`
    font-size: ${theme.fonts.sizes.medium};
  `,
  medium: (theme) => css`
    font-size: ${theme.fonts.sizes.large};
  `,
  big: (theme) => css`
    font-size: ${theme.fonts.sizes.xlarge};
  `,
  huge: (theme) => css`
    font-size: ${theme.fonts.sizes.xhuge};
    ${mediaFont(theme)};
  `,
};

const mediaFont = (theme) => css`
  @media ${theme.media.lteMedium} {
    font-size: ${theme.fonts.sizes.xlarge};
  }
`;

const HeadingCase = (uppercase) => css`
  text-transform: ${uppercase ? 'uppercase' : 'none'};
`;

export const Heading = styled.h1`
  ${({ theme, size, uppercase }) => css`
    color: ${theme.colors.thirdColor};
    ${HeadingSize[size](theme)};
    ${HeadingCase(uppercase)};
  `};
`;
