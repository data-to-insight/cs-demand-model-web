import React, { useState, useEffect, useReducer, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";

import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { APIControl, APITransport, APIConfig, LoadStatus } from "@sfdl/prpc";

import { dataReducer, initialData } from "reducers/DataReducer";

const theme = createTheme(SFTheme);
let api: null | APIControl = null;

interface AppProps extends GatedProps {}

export const APIConfigContext = createContext<APIConfig | null>(null);

const apiConfig: APIConfig = {
  transport: APITransport.WEB,
  options: {
    url: "http://127.0.0.1:8000/",
    appName: "cs_demand_model.rpc:app",
  }
};

function App(props: AppProps) {
  const [ready, setReady] = useState(false);
  const [dataState, dataDispatch] = useReducer(dataReducer, { ...initialData });

  useEffect(() => {
    const init = async () => {
      api = new APIControl();
      await api.loadTransport(apiConfig, handleAPIResponse);
    };

    if (!api) {
      init();
    }
  }, []);

  const handleAPIResponse = (data: string) => {
    console.log(data);
    if (data === LoadStatus.READY) {
      setReady(true);
    }
  };

  /**
   * Rendering
   */

  return (
    <APIConfigContext.Provider value={apiConfig}>
      <ThemeProvider theme={theme}>
        <Container>
          {ready && api ? (
            <Router dispatch={dataDispatch} data={dataState} api={api} />
          ) : (
            <Loader type="cover" />
          )}
        </Container>
      </ThemeProvider>
    </APIConfigContext.Provider>
  );
}

export default App;
