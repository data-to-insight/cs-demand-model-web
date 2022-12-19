import React, {useEffect} from "react";
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import { Body, Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";
import store from './app/store';
import {selectApiState} from "./features/api/apiSlice";
import {selectCurrentView, selectLoading} from "./features/view/viewSlice";
import ViewFactory from "./t2/viewFactory";

import {LoadStatus} from "@sfdl/prpc";
import {useApi} from "./hooks/api";


const theme = createTheme(SFTheme);

const ReduxApp = () => {
  const api = useApi();
  const apiState = useSelector(selectApiState);
  const currentView = useSelector(selectCurrentView);
  const loading = useSelector(selectLoading);

  const ready = apiState === LoadStatus.READY;
  const error = apiState === LoadStatus.ERROR;

  useEffect(() => {
    if (ready) {
      api.init()
    }
  }, [api, ready])

  if (error) {
    return <Alert severity="error">Failed to load the API. Please refresh your page to try again.</Alert>
  } else if (currentView) {
    return  (
      <>
        <ViewFactory viewData={currentView} />
        {loading && <Loader type="cover" />}
      </>
    )
  } else {
    return <Loader type="cover" />
  }

}

const BodyWithState = () => {
  const apiState = useSelector(selectApiState);
  return (
    <Body title="CLA Placement Demand Modelling Tool" chip={`API: ${apiState}`}>
      <ReduxApp />
    </Body>

  )
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <BodyWithState />
        </Container>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
