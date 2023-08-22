import React from "react";

import { compose } from "@reduxjs/toolkit";

import { withRouter } from "./withRouter";
import { withSnackbar } from "./withSnackbar";

export const withHocs: (app: () => JSX.Element) => React.ComponentType =
  compose(withRouter, withSnackbar);
