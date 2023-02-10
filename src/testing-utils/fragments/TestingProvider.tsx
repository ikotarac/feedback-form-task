import React, { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@modules/ui-components";

export const TestingProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
);
