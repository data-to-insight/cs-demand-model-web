import React, { Dispatch, useState } from "react";

import { DataShape, DataAction } from "reducers/DataReducer";
import { LoadData, Dashboard, SetModel } from "pages";
import { Body } from "components/layout";

export enum RouteValue {
  LOAD_DATA = "LOAD_DATA",
  DASHBOARD = "DASHBOARD",
  SET_MODEL = "SET_MODEL",
}

export interface RouteProps {
  data: DataShape;
  dispatch: Dispatch<DataAction>;
}

const Router = (props: RouteProps) => {
  const [route, setRoute] = useState(RouteValue.LOAD_DATA);

  const handleRouteChange = (newRoute: RouteValue): void => {
    setRoute(newRoute);
  };

  const pageProps = {
    handleRouteChange,
    ...props,
  };

  const renderRoute = () => {
    if (route === RouteValue.LOAD_DATA) {
      return <LoadData {...pageProps} />;
    }

    if (route === RouteValue.SET_MODEL) {
      return <SetModel {...pageProps} />;
    }

    if (route === RouteValue.DASHBOARD) {
      return <Dashboard {...pageProps} />;
    }
  };

  return <Body>{renderRoute()}</Body>;
};

export default Router;
