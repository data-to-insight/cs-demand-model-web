import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";

import ModelDatesForm, { ModelDates } from "components/forms/modeldatesform";
import { RouteProps, RouteValue } from "../../Router";
import { DataActionType } from "reducers/DataReducer";
import {isoToDateObj} from "../../utils/dates";
import {ModelStats} from "../../components/forms/modeldatesform/ModelDatesForm";

interface SetModelProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const SetModel = (props: SetModelProps) => {
  const { api, dispatch, data } = props;
  const [stats, setStats] = useState(undefined as ModelStats | undefined);

  const handleChange = (dates: ModelDates) => {
    dispatch({
      type: DataActionType.SET_MODEL_DATES,
      payload: { value: dates },
    });
  };

  useEffect( () => {
    const init = async () => {
      try {
        const stats = await api.callAPI({method: "population_stats", value: {}});
        setStats({minDate: isoToDateObj(stats.minDate), maxDate: isoToDateObj(stats.maxDate)});
      } catch (ex) {
        alert('Failed to load population_stats')
      }
    };
    init();
  }, [api])

  return (
    <>
      <Box flexGrow={1}>
        <ModelDatesForm
          onSubmit={() => {
            props.handleRouteChange(RouteValue.DASHBOARD);
          }}
          dates={data.dates}
          stats={stats}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default SetModel;
