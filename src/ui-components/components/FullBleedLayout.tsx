import styled from "styled-components";

export const FullBleedContainer = styled.div`
  width: 100%;
`;

export const FullBleedLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }

  ${FullBleedContainer} {
    grid-column: 1/4;
  }
`;
