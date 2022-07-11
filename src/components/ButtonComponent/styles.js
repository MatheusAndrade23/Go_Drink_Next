import styled, { css } from 'styled-components';

const ButtonModel = {
  standard: (theme) => css`
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
    border-radius: ${theme.spacings.xsmall};
    border: 2px solid ${theme.colors.thirdColor};
    color: ${theme.colors.thirdColor};
    background-color: transparent;

    &:hover {
      box-shadow: 0px 0px 8px 0px ${theme.colors.thirdColor};
    }
  `,
  icon: (theme) => css`
    height: 40px;
    width: 40px;
    border: 2px solid ${theme.colors.thirdColor};
    color: ${theme.colors.thirdColor};
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;

    &:hover {
      box-shadow: 0px 0px 8px 0px ${theme.colors.thirdColor};
    }
  `,
};

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

const TextWeight = (bold) => css`
  font-weight: ${bold ? 'bold' : 'normal'};
`;

export const Button = styled.button`
  ${({ theme, uppercase, bold, size, model }) => css`
    cursor: pointer;
    transition: 0.5s;
    ${TextCase(uppercase)};
    ${TextWeight(bold)};
    ${TextSize[size](theme)}
    ${ButtonModel[model](theme)}
  `}
`;
