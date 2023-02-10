import React, { FC, ReactNode } from "react";
import {
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    colors: {
      danger: string;
      border: string;
      primary: string;
      accent: string;
    };

    breakpoints: {
      mobile: string;
    };
  }
}

const theme: DefaultTheme = {
  colors: {
    danger: "#B62121",
    border: "#768097",
    primary: "#0c1142",
    accent: "orange",
  },

  breakpoints: {
    mobile: "760px",
  },
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <StyledComponentsThemeProvider theme={theme}>
    {children}
  </StyledComponentsThemeProvider>
);
