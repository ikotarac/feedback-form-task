import React, { FC, ReactNode, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const StyledBarChartContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;

const loadAnimation = keyframes`
0% {
  transform: scaleX(0);
}

100% {
  transform: scaleX(1);
}
`;

const StyledBarSpan = styled.span<{ fraction: number }>`
  width: ${({ fraction }) => fraction * 70}%;
  animation: ${loadAnimation} 1s ease-out;
  transform-origin: center left;
  transition: transform;
  background-color: white;
  height: 10px;
  position: relative;
  top: -1px;
  grid-column: 2;
  margin-right: ${({ fraction }) => (fraction < 0.01 ? "0px" : "10px")};
`;

const StyledBarContainerDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabelSpan = styled.span`
  justify-self: end;
  grid-column: 1;
`;

const StyledValueLabelSpan = styled.span``;

export interface BarChartDataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  renderLabel: (label: string) => ReactNode;
  renderValue: (label: string) => ReactNode;
}

const findMaxValue = (data: BarChartDataPoint[]): number =>
  data.reduce((max, { value }) => Math.max(value, max), 0);

// todo: improve accessibility
export const BarChart: FC<BarChartProps> = ({
  data,
  renderLabel,
  renderValue,
}) => {
  const maxValue = useMemo(() => findMaxValue(data), [data]);

  return (
    <StyledBarChartContainerDiv>
      {data.map(({ label, value }) => (
        <>
          <StyledLabelSpan>{renderLabel(label)}</StyledLabelSpan>
          <StyledBarContainerDiv>
            <StyledBarSpan key={label} fraction={value / maxValue} />
            <StyledValueLabelSpan>{renderValue(label)}</StyledValueLabelSpan>
          </StyledBarContainerDiv>
        </>
      ))}
    </StyledBarChartContainerDiv>
  );
};
