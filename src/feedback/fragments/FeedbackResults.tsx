import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  FullBleedContainer,
  FullBleedLayout,
  GradientBackground,
} from "~/ui-components";

import { RatingsHeader } from "../components";
import { FeedbackApi } from "../services";

const StyledGradientBackground = styled(GradientBackground)`
  color: white;
  padding: 20px;
`;

const StyledNavigationDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledEmailP = styled.p`
  font-weight: bold;
  margin: 5px 0px;
`;

const StyledContentDiv = styled.div`
  background: white;
  color: black;
  padding: 20px;
`;

const StyledCommentDiv = styled.div`
  margin: 20px 0px;
  text-align: justify;
  line-height: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  padding: 10px;
  vertical-align: center;
`;

export const FeedbackResults: FC = () => {
  const { ratings, feedbacks } = useMemo(FeedbackApi.getFeedbacks, []);

  return (
    <FullBleedLayout>
      <FullBleedContainer>
        <StyledGradientBackground>
          <StyledNavigationDiv>
            <h1>Feedback Results</h1>
            <StyledLink to="..">Go Back</StyledLink>
          </StyledNavigationDiv>

          <RatingsHeader ratings={ratings} />
        </StyledGradientBackground>
      </FullBleedContainer>

      <StyledContentDiv>
        <h2>Latest Comments</h2>
        {feedbacks.map(({ email, comment }, index) => (
          <StyledCommentDiv key={index} role="comment" data-author={email}>
            <StyledEmailP>{email}</StyledEmailP>
            <p>{comment}</p>
          </StyledCommentDiv>
        ))}
      </StyledContentDiv>
    </FullBleedLayout>
  );
};
