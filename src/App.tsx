import { ThemeProvider } from "@mui/material";
import React from "react";
import Home from "./components/home/Home.tsx";
import { theme } from "./theme/theme.ts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
