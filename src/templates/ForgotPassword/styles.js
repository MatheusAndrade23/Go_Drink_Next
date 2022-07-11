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
