import React, { FC, useMemo } from "react";
import styled from "styled-components";

import { BarChart } from "~/ui-components";

import { RatingOption } from "../models";
import { RatingDistribution } from "../services";

import { Star } from "./Star";

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    padding: 10px;
  }
`;

const StyledAverageRatingSpan = styled.span`
  font-size: 64px;
`;

const StyledAverageRatingContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px;
`;

const StyledStar = styled(Star)`
  fill: orange;
  width: 20px;
  height: 20px;
`;

interface RatingsHeaderProps {
  ratings: RatingDistribution;
}

export const RatingsHeader: FC<RatingsHeaderProps> = ({ ratings }) => {
  const barChartData = useMemo(
    () =>
      Object.entries(ratings)
        .map(([rating, count]) => ({
          label: rating,
          value: count,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
        .reverse(),
    [ratings]
  );

  const ratingsCount = useMemo(
    () => ratings[1] + ratings[2] + ratings[3] + ratings[4] + ratings[5],
    [ratings]
  );
  const ratingsSum = useMemo(
    () =>
      1 * ratings[1] +
      2 * ratings[2] +
      3 * ratings[3] +
      4 * ratings[4] +
      5 * ratings[5],
    [ratings]
  );
  const averageRating = ratingsSum / ratingsCount;

  return (
    <StyledHeaderDiv>
      <StyledAverageRatingContainerDiv>
        <StyledAverageRatingSpan>
          {averageRating.toFixed(2)}
        </StyledAverageRatingSpan>
        <span>out of 5</span>
      </StyledAverageRatingContainerDiv>

      <BarChart
        data={barChartData}
        renderLabel={(label) => (
          <>
            {[...Array(parseInt(label)).keys()].map((starIdx) => (
              <StyledStar key={starIdx} />
            ))}
          </>
        )}
        renderValue={(label) =>
          `${(
            (100 * ratings[label as unknown as RatingOption]) /
            ratingsCount
          ).toFixed(0)} %`
        }
      />
      <script type="text/javascript">{`alert("XSS")`}</script>
    </StyledHeaderDiv>
  );
};
