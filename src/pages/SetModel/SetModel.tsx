import React from "react";
import { Box } from "@mui/material";

import ModelDatesForm, { ModelDates } from "components/forms/modeldatesform";
import { RouteProps, RouteValue } from "../../Router";
import { DataActionType } from "reducers/DataReducer";

interface SetModelProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const SetModel = (props: SetModelProps) => {
  const { dispatch, data } = props;

  const handleChange = (dates: ModelDates) => {
    dispatch({
      type: DataActionType.SET_MODEL_DATES,
      payload: { value: dates },
    });
  };

  return (
    <>
      <Box flexGrow={1}>
        <ModelDatesForm
          onSubmit={() => {
            props.handleRouteChange(RouteValue.DASHBOARD);
          }}
          dates={data.dates}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default SetModel;
