import styled, { css, keyframes } from 'styled-components';

const bounce = () => keyframes`
  0% {
    transform: scaleX(1.25);
  }
  100% {
    transform: translateY(-50px) scaleX(1);
  }
`;

export const Container = styled.div`
  ${() => css`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(34, 40, 49, 0.8);
    z-index: 300;
  `}
`;

export const Loader = styled.div`
  ${() => css`
    width: 120px;
    height: 75px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
  `}
`;

export const Ball = styled.div`
  ${({ theme }) => css`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    animation: ${bounce()} .5s alternate infinite;
    background-color: ${theme.colors.thirdColor};

    &:nth-child(2){
      animation-delay: .16s;
    }

    &:nth-child(3){
      animation-delay: .32s;
    }
  `}
`;

export const Loading = styled.span`
  ${({ theme }) => css`
    font-size: 22px;
    margin: auto;
    color: ${theme.colors.thirdColor};
    font-weight: bold;
  `}
`;
