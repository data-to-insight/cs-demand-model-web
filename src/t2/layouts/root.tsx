import React, { useReducer } from "react";
import MainLayout, {MainLayoutProps} from "./Main";

export interface PageProps {
  layout: string;
  state: any;
  initialState: any;
  actions?: [any];
  dispatch: React.Dispatch<DataAction>;
  onSubmit: (action: string, value?: any) => Promise<void>;
}


export enum DataActionType {
  SET_FIELD = "SET_FIELD",
}

export type DataAction = {
  type: DataActionType;
  field: string;
  value: any;
};

const dataReducer = (dataState: any, dataAction: DataAction) => {
  const newState = { ...dataState };
  switch (dataAction.type) {
    case DataActionType.SET_FIELD:
      newState[dataAction.field] = dataAction.value;
      return newState;
  }
}

const RootLayout = (props: PageProps) => {
  const [state, dispatch] = useReducer(dataReducer, props.state);
  const onSubmit = async (action: string) => {
    return await props.onSubmit(action, state);
  }
  if (props.layout === 'main') {
    const mainLayoutProps = {...props, initialState: props.state, state, dispatch, onSubmit} as MainLayoutProps;
    return <MainLayout {...mainLayoutProps}/>
  } else {
    return <></>;
  }

}

export default RootLayout;
