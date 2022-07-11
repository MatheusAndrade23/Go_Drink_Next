import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.fourthColor};
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Login = styled.div`
  ${({ theme }) => css`
    width: max-content;
    padding: 30px;
    display: flex;
    flex-direction: column;
    border: 2px solid ${theme.colors.primaryColor};
    border-radius: 10px;

    p {
      max-width: 300px;
      align-self: center;
      text-align: center;
      margin: 0 0 15px 0;
    }

    h4 {
      align-self: center;
      margin-bottom: ${theme.spacings.medium};
    }

    input {
      margin-bottom: ${theme.spacings.small};

      @media ${theme.media.xsmallScreen} {
        width: 100%;
      }
    }

    button {
      margin-top: ${theme.spacings.small};
    }

    div {
      align-self: center;
      width: 100%;
    }

    @media ${theme.media.xsmallScreen} {
      width: 80%;
    }
  `}
`;

export const PasswordContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    position: relative;

    & > button {
      position: absolute;
      right: 10px;
      top: 31px;
      padding: 0;
      margin: 0 !important;
      background-color: transparent;
      color: ${theme.colors.thirdColor};
      font-size: 17px;
      cursor: pointer;
      border: none;
    }
  `}
`;
