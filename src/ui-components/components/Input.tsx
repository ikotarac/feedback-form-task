import React, { FC, InputHTMLAttributes } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import styled from "styled-components";

import { InputContainer } from "./InputContainer";

const StyledInput = styled.input`
  background: transparent;
  height: 40px;
  width: 100%;

  border-radius: 5px;
  padding: 0px 10px;

  &::placeholder {
    text-transform: capitalize;
  }

  font-size: 16px;
  border: solid 1px ${({ theme }) => theme.colors.border};
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  rules?: RegisterOptions;
}

export const Input: FC<InputProps> = ({
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
    <InputContainer name={name} error={error} className={className}>
      <StyledInput
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
