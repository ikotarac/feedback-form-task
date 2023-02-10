import styled, { keyframes } from "styled-components";

const gradientMoveAnimation = keyframes`
0% {
    background-position: 0% 50%;
}
50% {
    background-position: 100% 50%;
}
100% {
    background-position: 0% 50%;
}`;

export const GradientBackground = styled.div`
  background-color: #0c1142;

  @media (min-height: ${({ theme }) => theme.breakpoints.mobile}) {
    background: radial-gradient(
        79.97% 124.8% at 80.57% 44.85%,
        rgba(43, 212, 219, 0.243) 0%,
        rgba(43, 212, 219, 0) 100%
      ),
      rgb(12, 17, 66);
    background-size: 400% 400%;
    animation: ${gradientMoveAnimation} 15s ease infinite;
  }
`;
