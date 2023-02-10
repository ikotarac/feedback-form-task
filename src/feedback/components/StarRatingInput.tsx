import React, { FC } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import styled from "styled-components";

import { InputContainer } from "~/ui-components";

import { ratingOptions } from "../models";

import { Star } from "./Star";

const StyledRatingFieldset = styled.fieldset`
  border: solid 1px ${({ theme }) => theme.colors.border};
  padding: 10px;
  display: flex;
  flex-direction: row;

  justify-content: center;
  font-size: 16px;

  border-radius: 5px;

  svg {
    fill: grey;
  }

  &:has(input:checked) svg,
  &:has(input:focus) svg,
  &:has(svg:hover) svg {
    fill: orange;
  }

  div:has(input:checked) ~ div svg,
  div:has(input:focus) ~ div svg,
  div:hover ~ div svg {
    fill: grey;
  }

  div:has(input:checked) svg,
  div:has(input:focus) svg,
  div:hover svg {
    fill: orange !important;
  }
`;

const StyledStarContainerDiv = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  &:has(input:focus) {
    outline: solid 2px black;
    border-radius: 20px;
  }
`;

interface StarRatingInputProps {
  name: string;
  rules: RegisterOptions;
  className?: string;
}

export const StarRatingInput: FC<StarRatingInputProps> = ({
  name,
  rules,
  className,
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <InputContainer className={className} name={name} error={error}>
      <StyledRatingFieldset>
        <legend>How would you rate our product?</legend>
        {ratingOptions.map((option) => {
          const optionId = `${option} option`;
          const optionString = `${option}`;

          return (
            <StyledStarContainerDiv key={option}>
              <label htmlFor={optionId}>
                <Star />
              </label>
              <input
                className="screen-reader-only"
                type="radio"
                value={optionString}
                name={name}
                aria-label={optionString}
                id={optionId}
                checked={value === optionString}
                onChange={onChange}
              />
            </StyledStarContainerDiv>
          );
        })}
      </StyledRatingFieldset>
    </InputContainer>
  );
};
