import React, { useState, useEffect, useReducer } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Loader from "components/loader";

import { Container } from "./components/layout";
import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";

import { theme as SFTheme } from "./theme/theme";

import { dataReducer, initialData } from "reducers/DataReducer";

const theme = createTheme(SFTheme);

interface AppProps extends GatedProps {}

function App(props: AppProps) {
  const [ready, setReady] = useState(true);
  const [dataState, dataDispatch] = useReducer(dataReducer, { ...initialData });

  /**
   * Rendering
   */

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {ready ? (
          <Router dispatch={dataDispatch} data={dataState} />
        ) : (
          <Loader type="cover" />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
