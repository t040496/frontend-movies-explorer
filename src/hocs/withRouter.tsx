import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Suspense as SuspenseBox } from "../containers/Suspense";

export const withRouter = (Component: React.ComponentType) => () => (
  <BrowserRouter>
    <Suspense fallback={<SuspenseBox />}>
      <Component />
    </Suspense>
  </BrowserRouter>
);
