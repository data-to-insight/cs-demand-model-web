import {
  Costs,
  Proportions,
  ModelDates,
  AdjustmentRow,
} from "components/forms";

export type DataAction = {
  type: DataActionType;
  payload: {
    key?: string;
    value: any;
  };
};

export enum DataActionType {
  SET_MODEL_DATES = "SET_MODEL_DATES",
  SET_ADJUSTMENTS = "SET_ADJUSTMENTS",
  SET_COSTS = "SET_COSTS",
  SET_PROPORTIONS = "SET_PROPORTIONS",

  CLEAR_DATA = "CLEAR_DATA",
}

export type DataShape = {
  dates: ModelDates;
  costs: Costs;
  proportions: Proportions;
  adjustmentRows: AdjustmentRow[];
};

export const initialData: DataShape = {
  dates: {
    historyStart: { day: "", month: "", year: "" },
    historyEnd: { day: "", month: "", year: "" },
    referenceStart: { day: "", month: "", year: "" },
    referenceEnd: { day: "", month: "", year: "" },
    forecastEnd: { day: "", month: "", year: "" },
    stepSize: 10,
  },
  costs: {
    foster_IFA: "",
    foster_friend_relation: "",
    foster_in_house: "",
    inflation: "",
    other_other: "",
    other_placed_with_family: "",
    other_secure_home: "",
    resi_external: "",
    resi_in_house: "",
    supported_supported: "",
  },
  proportions: {
    foster_IFA: "",
    foster_friend_relation: "",
    foster_in_house: "",
    other_other: "",
    other_placed_with_family: "",
    other_secure_home: "",
    resi_external: "",
    resi_in_house: "",
    supported_supported: "",
  },
  adjustmentRows: [],
};

export const dataReducer = (dataState: any, dataAction: DataAction) => {
  let newState;

  switch (dataAction.type) {
    case DataActionType.CLEAR_DATA:
      return { ...initialData };

    case DataActionType.SET_MODEL_DATES:
      newState = { ...dataState };

      newState.dates = dataAction.payload.value;

      return newState;

    case DataActionType.SET_ADJUSTMENTS:
      newState = { ...dataState };

      newState.adjustmentRows = dataAction.payload.value;

      return newState;

    case DataActionType.SET_COSTS:
      newState = { ...dataState };

      newState.costs = dataAction.payload.value;

      return newState;

    case DataActionType.SET_PROPORTIONS:
      newState = { ...dataState };

      newState.proportions = dataAction.payload.value;

      return newState;
  }
};
