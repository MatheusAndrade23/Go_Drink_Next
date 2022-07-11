import styled, { css } from 'styled-components';

export const Drink = styled.div`
  ${({ theme }) => css`
    margin: 10px 0;
    cursor: pointer;
    height: 340px;
    width: 310px;
    border: 2px solid ${theme.colors.secondaryColor};
    border-radius: 10px;
    transition: 0.5s;
    display: flex;
    flex-direction: column;

    & h6 {
      height: 35px;
      margin-left: 22px;
      width: 260px;
      overflow: hidden;
      margin-top: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & img {
      align-self: center;
      margin-top: 20px;
      width: 260px;
      border: 2px solid ${theme.colors.primaryColor};
    }

    &:hover {
      box-shadow: 1px 0px 12px 0px ${theme.colors.shadow};
    }

    @media (max-width: 340px) {
      height: 290px;
      width: 260px;

      & h6 {
      width: 210px;
      }

      & img {
        width: 210px;
      }
    }

    @media ${theme.media.xxsmallScreen} {
      height: 260px;
      width: 230px;

      & h6 {
        width: 180px;
      }


      & img {
        width: 180px;
      }
    }
  `}
`;
