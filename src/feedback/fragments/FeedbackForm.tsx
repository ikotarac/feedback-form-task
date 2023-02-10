import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { GradientBackground, Input, TextArea } from "@modules/ui-components";

import { StarRatingInput } from "../components";
import { Feedback } from "../models";
import { FeedbackApi } from "../services";

const StyledGradientBackground = styled(GradientBackground)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFeedbackForm = styled.form`
  display: grid;
  grid-template-areas:
    "banner"
    "side"
    "content"
    "footer";

  grid-template-rows: 30px auto 200px 40px;
  gap: 20px;
  width: calc(100vw - 20px);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-areas:
      "banner banner"
      "side content"
      "footer footer";

    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: 30px auto 40px;

    width: auto;
  }

  border: 1px solid slate;
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  color: black;
`;

const StyledHeaderH1 = styled.h1`
  grid-area: banner;
  font-size: 20px;
`;

const StyledPersonalDataDiv = styled.div`
  grid-area: side;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledCommentTextArea = styled(TextArea)`
  grid-area: content;

  textarea {
    width: 100%;
    height: 100%;
  }
`;

const StyledSubmitButton = styled.button`
  grid-area: footer;

  justify-self: end;

  background-color: ${({ theme: { colors } }) => colors.primary};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
  font-size: 16px;

  width: 100px;
  height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

// todo: check if sanitization is required
export const FeedbackForm: FC = () => {
  const methods = useForm<Feedback>();
  const navigate = useNavigate();

  const { handleSubmit } = methods;
  const sendFeedback = (feedback: Feedback): void => {
    FeedbackApi.sendFeedback(feedback);
    navigate("/results");
  };

  return (
    <StyledGradientBackground>
      <FormProvider {...methods}>
        <StyledFeedbackForm onSubmit={handleSubmit(sendFeedback)}>
          <StyledHeaderH1>Feedback Form</StyledHeaderH1>
          <StyledPersonalDataDiv>
            <Input name="name" rules={{ required: true }} />
            <Input
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              }}
            />
            <StarRatingInput name="rating" rules={{ required: true }} />
          </StyledPersonalDataDiv>

          <StyledCommentTextArea
            name="comment"
            rules={{
              required: true,
              maxLength: {
                value: 1000,
                message:
                  "Please limit your comment to 1000 characters in length.",
              },
            }}
          />
          <StyledSubmitButton type="submit">Send</StyledSubmitButton>
        </StyledFeedbackForm>
      </FormProvider>
    </StyledGradientBackground>
  );
};
