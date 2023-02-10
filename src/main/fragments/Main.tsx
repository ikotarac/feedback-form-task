import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { FeedbackForm, FeedbackResults } from "~/feedback";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
  }

  body {
    height: 100svh;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }

  h1, h2, h3, h4 {
    font-family: 'Raleway', sans-serif;
  }

  .screen-reader-only {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
  }
`;

const theme = {
  colors: {
    danger: "#B62121",
    border: "#768097",
    primary: "#0c1142",
  },

  breakpoints: {
    mobile: "760px",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      danger: string;
      border: string;
      primary: string;
    };

    breakpoints: {
      mobile: string;
    };
  }
}

// t his   is the entry point in the applic  ation
// naming is analogous to main function in C / main method in Java
export const Main: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route element={<FeedbackForm />} path="/" />
          <Route element={<FeedbackResults />} path="/results" />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
