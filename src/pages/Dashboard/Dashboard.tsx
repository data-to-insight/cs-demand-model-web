import React, {useCallback, useMemo, useState} from "react";
import { Box, Button, Grid } from "@mui/material";
import { Replay as ReplayIcon } from "@mui/icons-material";

import { DashboardGridItem } from "./Dashboard.styles";
import { PaddedBox } from "pages/Pages.styles";
import { Block, Expando, DateObj } from "@sfdl/sf-mui-components";
import ModelDatesForm from "components/forms/modeldatesform";
import AdjustmentForm from "components/forms/adjustmentform";
import PlacementCostForm from "components/forms/placementcostform";
import ProportionCostCategoriesForm from "components/forms/proportioncostcategoriesform";
import { RouteProps, RouteValue } from "../../Router";
import { DataActionType } from "reducers/DataReducer";
import {
  AdjustmentRow,
  ModelDates,
  Costs,
  Proportions,
} from "components/forms";
import Plot from 'react-plotly.js';
import {APIControl} from "@sfdl/prpc/dist/types";
import { Loader } from "@sfdl/sf-mui-components";

interface DashboardProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
  api: APIControl;
}

const to_date = (value: DateObj) => {
  if (!value) {
    return undefined;
  }
  return `${value.year}-${value.month}-${value.day}`
}

const Dashboard = (props: DashboardProps) => {
  const { api, dispatch } = props;
  const [plot, setPlot] = useState(undefined as any);
  const [dataRequested, setDataRequested] = useState(false);

  const dates = useMemo(() => {
    return props.data.dates;
  }, [props.data.dates]);

  const adjustmentRows = useMemo(() => {
    return props.data.adjustmentRows;
  }, [props.data.adjustmentRows]);

  const costs = useMemo(() => {
    return props.data.costs;
  }, [props.data.costs]);

  const proportions = useMemo(() => {
    return props.data.proportions;
  }, [props.data.proportions]);

  const handleDateChange = useCallback(
    (dates: ModelDates) => {
      dispatch({
        type: DataActionType.SET_MODEL_DATES,
        payload: {
          value: dates,
        },
      });
    },
    [dispatch]
  );

  const handleAdjustmentChange = useCallback(
    (rows: AdjustmentRow[]) => {
      dispatch({
        type: DataActionType.SET_ADJUSTMENTS,
        payload: {
          value: rows,
        },
      });
    },
    [dispatch]
  );

  const handleCostsChange = useCallback(
    (costs: Costs) => {
      dispatch({
        type: DataActionType.SET_COSTS,
        payload: {
          value: costs,
        },
      });
    },
    [dispatch]
  );

  const handleProportionsChange = useCallback(
    (proportions: Proportions) => {
      dispatch({
        type: DataActionType.SET_PROPORTIONS,
        payload: {
          value: proportions,
        },
      });
    },
    [dispatch]
  );

  const handleReset = () => {
    dispatch({
      type: DataActionType.CLEAR_DATA,
      payload: { value: "" },
    });

    props.handleRouteChange(RouteValue.LOAD_DATA);
  };

  const fetchChart = async () => {
    const result = await api.callAPI({method: "predict", value: {
        history_start: to_date(dates.historyStart),
        history_end: to_date(dates.historyEnd),
        reference_start: to_date(dates.referenceStart),
        reference_end: to_date(dates.referenceEnd),
        forecast_end: to_date(dates.forecastEnd),
        step_days: dates.stepSize,
      }})
    setPlot(result);
  }

  if (!dataRequested) {
    fetchChart();
    setDataRequested(true);
  }

  return (
    <>
      <Box flexGrow={1}>
        <Grid container>
          <Grid xs={5} item style={DashboardGridItem}>
            <Block spacing="blockLarge">
              <Button
                onClick={handleReset}
                variant="contained"
                endIcon={<ReplayIcon />}
              >
                Start Again
              </Button>
            </Block>
            <Block>
              <PaddedBox>
                <Expando title="Set Forecast Dates" id="forecast-dates">
                  <ModelDatesForm
                    onSubmit={fetchChart}
                    dates={dates}
                    onChange={handleDateChange}
                  />
                </Expando>
              </PaddedBox>
            </Block>

            <Block>
              <PaddedBox>
                <Expando
                  title="Add Hypothetical Transfers"
                  id="hypothetical-transfers"
                  defaultExpanded={false}
                >
                  <AdjustmentForm
                    rows={adjustmentRows}
                    onChange={handleAdjustmentChange}
                  />
                </Expando>
              </PaddedBox>
            </Block>

            <Block>
              <PaddedBox>
                <Expando
                  title="Enter Placement Costs"
                  id="placement-costs"
                  defaultExpanded={false}
                >
                  <PlacementCostForm
                    costs={costs}
                    onChange={handleCostsChange}
                  />
                </Expando>
              </PaddedBox>
            </Block>
            <Block>
              <PaddedBox>
                <Expando
                  title="Edit Proportions for Cost Categories"
                  id="cost-categories"
                  defaultExpanded={true}
                >
                  <ProportionCostCategoriesForm
                    onChange={handleProportionsChange}
                    proportions={proportions}
                  />
                </Expando>
              </PaddedBox>
            </Block>
          </Grid>
          <Grid item xs={7} style={DashboardGridItem}>
            { plot && <Plot data={plot.data} layout={plot.layout}/>}
            { !plot && <Loader type="cover" /> }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
