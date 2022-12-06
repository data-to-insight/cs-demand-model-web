import {
  Costs,
  Proportions,
  ModelDates,
  AdjustmentRow,
} from "components/forms";
import React from "react";
import {DataAction} from "../t2/layouts/root";

export enum T2ActionType {
  SET_FIELD = "SET_FIELD",
}

export type T2Action = {
  type: T2ActionType;
  value: {
    key?: string;
    value: any;
  };
};

export interface PageProps {
  layout: string;
  actions?: [any];
}

export interface FieldValues extends Record<string, any> {}

export type T2ApplicationState = {
  apiStatus: string;
  page?: PageProps;
  state?: FieldValues,
  initialState?: FieldValues,

}

export const dataReducer = (state: any, action: T2Action) => {
  let newState;

  switch (action.type) {
    case T2ActionType.SET_FIELD:
      newState = { ...state };
      if (action.value?.key) {
        newState[action.value.key] = action.value.value;
      }
      return newState;
  }
};
