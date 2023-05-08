import * as React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d0e29",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffd14f",
    },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
