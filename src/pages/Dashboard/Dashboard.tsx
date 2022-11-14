import React, { useCallback, useMemo } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Replay as ReplayIcon } from "@mui/icons-material";

import { DashboardGridItem } from "./Dashboard.styles";
import { PaddedBox } from "pages/Pages.styles";
import Block from "components/block";
import Expando from "components/expando";
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

interface DashboardProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const Dashboard = (props: DashboardProps) => {
  const { dispatch } = props;

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
                  <ModelDatesForm dates={dates} onChange={handleDateChange} />
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
            asdads
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
