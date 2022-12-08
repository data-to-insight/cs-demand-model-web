import React, {useEffect} from "react";
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Body, Loader, Container, theme as SFTheme } from "@sfdl/sf-mui-components";
import store from './app/store';
import {selectApiState} from "./features/api/apiSlice";
import {selectCurrentView} from "./features/view/viewSlice";
import ViewFactory from "./t2/viewFactory";

import {LoadStatus} from "@sfdl/prpc";
import {useApi} from "./hooks/api";


const theme = createTheme(SFTheme);

const ReduxApp = () => {
  const api = useApi();
  const apiState = useSelector(selectApiState);
  const currentView = useSelector(selectCurrentView);

  const ready = apiState === LoadStatus.READY;

  useEffect(() => {
    if (ready) {
      api.init()
    }
  }, [api, ready])

  if (currentView) {
    return  <ViewFactory viewData={currentView} />
  } else {
    return <Loader type="cover" />
  }

}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <Body>
            <ReduxApp />
          </Body>
        </Container>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
