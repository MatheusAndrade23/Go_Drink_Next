import styled, { css } from 'styled-components';
import { Drink as DrinkDraft } from '../DrinkComponent/styles';

export const Drink = styled(DrinkDraft)`
  ${({ theme }) => css`
    position: relative;
  `}
`;
