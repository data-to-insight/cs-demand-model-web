import React, { useState, useEffect, useReducer } from "react";
import queryString from 'query-string';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";

import Router from "./Router";
import { GatedProps } from "@sfdl/sf-cookie-gate";
import { APIControl, APITransport, LoadStatus } from "@sfdl/prpc";

import { dataReducer, initialData } from "reducers/DataReducer";

const theme = createTheme(SFTheme);
let api: null | APIControl = null;

interface AppProps extends GatedProps {}

function App(props: AppProps) {
  const [ready, setReady] = useState(false);
  const [dataState, dataDispatch] = useReducer(dataReducer, { ...initialData });

  useEffect(() => {
    const init = async () => {
      const parsed = queryString.parse(window.location.search);
      const apiConfig: any = {
        options: {
          appName: "cs_demand_model.rpc:app",
        }
      };
      if (parsed.url) {
        apiConfig.transport = APITransport.WEB;
        apiConfig.options.url = parsed.url;
      } else {
        apiConfig.transport = APITransport.PYODIDE;
        apiConfig.options.nativePackages = ['numpy', 'pandas'];
        apiConfig.options.packages = parsed.packages ? parsed.packages : [process.env.PUBLIC_URL + '/dist/cs_demand_model-0.2.0-py3-none-any.whl', 'plotly'];
      }
      api = new APIControl();
      console.log("API Config", apiConfig);
      await api.loadTransport(apiConfig, handleAPIResponse);
    };

    if (!api) {
      init();
    }
  }, []);

  const handleAPIResponse = (data: any) => {
    if (data?.error) {
      console.error("Failed to initialise API", data.error);
      alert("Failed to load pyodide");
    } else if (data === LoadStatus.READY) {
      setReady(true);
    } else {
      console.log('Unknown API response', data);
    }
  };

  /**
   * Rendering
   */

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {ready && api ? (
          <Router dispatch={dataDispatch} data={dataState} api={api} />
        ) : (
          <Loader type="cover" />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
