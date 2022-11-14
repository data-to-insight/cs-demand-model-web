import React from "react";
import { Box, Button } from "@mui/material";
import Block from "components/block/Block";
import { Send as SendIcon } from "@mui/icons-material";

import ModelDatesForm, { ModelDates } from "components/forms/modeldatesform";
import { Justifier, SpaceBetween } from "pages/Pages.styles";
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
        <ModelDatesForm dates={data.dates} onChange={handleChange} />

        <Block spacing="blockLarge">
          <Justifier>
            <SpaceBetween>
              <Button
                variant="contained"
                onClick={() => {
                  props.handleRouteChange(RouteValue.DASHBOARD);
                }}
                endIcon={<SendIcon />}
              >
                Calculate now
              </Button>
            </SpaceBetween>
            <SpaceBetween>
              <Button variant="outlined" color="secondary">
                Use Sample Values
              </Button>
            </SpaceBetween>
          </Justifier>
        </Block>
      </Box>
    </>
  );
};

export default SetModel;
