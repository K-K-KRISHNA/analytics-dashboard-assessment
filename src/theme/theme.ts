import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6500",
    },
    secondary: {
      main: "#E16A54",
    },
  },
  typography: {
    h1: {
      fontWeight: "bold",
      fontSize: "22px",
      textAlign: "center",
      color: "#FC8F54",
    },
    body2: {
      color: "#FC8F54",
      fontSize: "12px",
      textAlign: "center",
    },
  },
});
