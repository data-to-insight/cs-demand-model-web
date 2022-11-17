import React, { useState, useEffect, useReducer, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Loader from "components/loader";

import { Container } from "./components/layout";
import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { APIControl, APITransport, APIConfig, LoadStatus } from "@sfdl/prpc";

import { theme as SFTheme } from "./theme/theme";

import { dataReducer, initialData } from "reducers/DataReducer";

const theme = createTheme(SFTheme);
let api: null | APIControl = null;

interface AppProps extends GatedProps {}

type DataResponse = {
  data: LoadStatus | unknown;
};

export const APIConfigContext = createContext<APIConfig | null>(null);

const apiTransport: APITransport = APITransport.PYODIDE;
const apiConfig: APIConfig = {
  wheelPath: "/bin/dist/main-0.0.0-py3-none-any.whl",
  endPoint: "endpoint",
};

function App(props: AppProps) {
  const [ready, setReady] = useState(false);
  const [dataState, dataDispatch] = useReducer(dataReducer, { ...initialData });

  useEffect(() => {
    const init = async () => {
      api = new APIControl();
      await api.loadTransport(apiTransport, handleAPIResponse);
    };

    if (!api) {
      init();
    }
  }, []);

  const handleAPIResponse = (data: DataResponse) => {
    console.log(data);

    if (data.data === LoadStatus.READY) {
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
