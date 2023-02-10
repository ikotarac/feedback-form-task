import React, { FC, TextareaHTMLAttributes } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import styled from "styled-components";

import { InputContainer } from "./InputContainer";

const StyledTextArea = styled.textarea`
  background: transparent;

  resize: none;

  border-radius: 5px;
  padding: 10px;

  &::placeholder {
    text-transform: capitalize;
  }

  font-size: 16px;
  border: solid 1px ${({ theme }) => theme.colors.border};
`;

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  rules?: RegisterOptions;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  rules,
  className,
  ...otherProps
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <InputContainer className={className} name={name} error={error}>
      <StyledTextArea
        {...otherProps}
        aria-label={name}
        aria-invalid={error !== undefined}
        aria-errormessage={`${name}-error`}
        placeholder={name}
        id={name}
        onChange={onChange}
      />
    </InputContainer>
  );
};
