import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { FeedbackForm, FeedbackResults } from "@modules/feedback";
import { ThemeProvider } from "@modules/ui-components";

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

// this is the entry point in the application
// naming is analogous to main function in C and main method in Java
export const Main: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <Routes>
          <Route element={<FeedbackForm />} path="/" />
          <Route element={<FeedbackResults />} path="/results" />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
