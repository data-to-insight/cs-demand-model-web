import queryString from "query-string";
import { IAPI, APITransport, APICallback, LoadStatus, createApi } from "@sfdl/prpc";
import store from './app/store';
import {setApiState} from "./features/api/apiSlice";
import {setCurrentView} from "./features/view/viewSlice";

const appName = "cs_demand_model.rpc:app";
const defaultNativePackages = ['numpy', 'pandas'];
const defaultPackages = [process.env.PUBLIC_URL + '/dist/cs_demand_model-0.2.0-py3-none-any.whl', 'plotly']

const dispatch = store.dispatch;

type T2Response = {
  view: any,
  state: any,
}


const initApi = async (callback: APICallback): Promise<IAPI> => {
  const parsed = queryString.parse(window.location.search);
  const apiConfig: any = {
    options: { appName }
  };
  if (parsed.url) {
    apiConfig.transport = APITransport.WEB;
    apiConfig.options.url = parsed.url;
  } else {
    apiConfig.transport = APITransport.PYODIDE;
    apiConfig.options.nativePackages = defaultNativePackages;
    apiConfig.options.packages = parsed.packages ? parsed.packages : defaultPackages;
  }
  return await createApi(apiConfig, callback);
};

const apiStatusCallback = (payload: any) => {
  if (payload !== LoadStatus.READY) {
    // We don't fire ready since we need to make sure we are ready too
    store.dispatch(setApiState(payload));
  }
};


class API {
  api?: IAPI = undefined;

  constructor() {
    initApi(apiStatusCallback).then((api) => {
      this.api = api;
      dispatch(setApiState(LoadStatus.READY));
    })
  }

  init = () => {
    if (!this.api) {
      throw new Error("API is not in READY state");
    }
    this.api.call("action", {action: "init"}).then((response: T2Response) => {
      console.log("Response", response);
      dispatch(setCurrentView(response.view))
    })
  }

  call(action: string, data: {}) {
    if (!this.api) {
      throw new Error("API is not in READY state");
    }
    this.api.call("action", {action, data}).then((response: T2Response) => {
      console.log("Response", response);
      dispatch(setCurrentView(response.view))
    })
  }


}

export default new API();
