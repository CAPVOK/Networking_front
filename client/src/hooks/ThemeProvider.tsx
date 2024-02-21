import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, saveTheme } from "../core/store/slices/app.slice";

export const AppThemeProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const mode = useSelector(selectTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(saveTheme(savedTheme as "light" | "dark"));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#00AEEF",
          },
          secondary: {
            main: "#777B75",
          },
          info: {
            main: "#6DA3BE",
          },
          error: {
            main: "#f53123",
          },
          success: {
            main: "#3bb17f",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
