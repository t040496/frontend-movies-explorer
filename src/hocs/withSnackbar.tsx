import React from "react";
import { SnackbarProvider } from "notistack";

export const withSnackbar = (Component: React.ComponentType) => () => (
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <Component />
  </SnackbarProvider>
);
