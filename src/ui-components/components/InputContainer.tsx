import React, { FC, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import styled, { css } from "styled-components";

const StyledInputContainerDiv = styled.div<{ hasError: boolean }>`
  position: relative;
  margin-bottom: 30px;

  ${({ hasError, theme }) =>
    hasError &&
    css`
      input,
      fieldset,
      textarea {
        border-color: ${theme.colors.danger};
      }
    `}
`;

const StyledErrorSpan = styled.p`
  color: red;
  height: 15px;
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 10px;

  position: absolute;
  bottom: -25px;
`;

interface InputContainerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error: FieldError | undefined;
}

export const InputContainer: FC<InputContainerProps> = ({
  name,
  error,
  className,
  children,
}) => {
  const hasError = error !== undefined;

  return (
    <StyledInputContainerDiv hasError={hasError} className={className}>
      {children}
      {hasError && (
        <label htmlFor={name}>
          <StyledErrorSpan role="alert" id={`${name}-error`}>
            {error.type === "required"
              ? "This field is required."
              : error.message}
          </StyledErrorSpan>
        </label>
      )}
    </StyledInputContainerDiv>
  );
};
