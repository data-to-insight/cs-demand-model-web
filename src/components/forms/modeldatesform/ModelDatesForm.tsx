import React, { memo } from "react";
import { Typography, TextField } from "@mui/material";

import Block from "components/block/Block";

import DateSelect, { DateObj } from "components/inputs/dateselect";

export type ModelDates = {
  historyStart: DateObj;
  historyEnd: DateObj;
  referenceStart: DateObj;
  referenceEnd: DateObj;
  forecastEnd: DateObj;
};

interface ModelDatesFormProps {
  dates: ModelDates;
  onChange: (dates: ModelDates) => void;
}

const ModelDatesForm = memo((props: ModelDatesFormProps): JSX.Element => {
  const { dates } = props;

  return (
    <>
      <Block>
        <Typography>
          <strong>
            What period of historical would you like to be shown on the graphs?
          </strong>
        </Typography>
      </Block>
      <Block>
        <Typography variant="subtitle2">History Start Date</Typography>
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.historyStart = val;
            props.onChange(newDates);
          }}
          {...dates.historyStart}
        />
      </Block>
      <Block spacing="blockLarge">
        <Typography variant="subtitle2">History End Date</Typography>
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.historyEnd = val;
            props.onChange(newDates);
          }}
          {...dates.historyEnd}
        />
      </Block>

      <Block>
        <Typography>
          <strong>
            Which period of the historical data should the model learn from?
          </strong>
        </Typography>
      </Block>
      <Block>
        <Typography variant="subtitle2">Reference Start Date</Typography>
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.referenceStart = val;
            props.onChange(newDates);
          }}
          {...dates.referenceStart}
        />
      </Block>
      <Block spacing="blockLarge">
        <Typography variant="subtitle2">Reference End Date</Typography>
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.referenceEnd = val;
            props.onChange(newDates);
          }}
          {...dates.referenceStart}
        />
      </Block>

      <Block>
        <Typography>
          <strong>When should the forecast end?</strong>
        </Typography>
      </Block>
      <Block spacing="blockLarge">
        <Typography variant="subtitle2">Forecast End Date</Typography>
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.forecastEnd = val;
            props.onChange(newDates);
          }}
          {...dates.forecastEnd}
        />
      </Block>
      <Block spacing="blockLarge">
        <Typography variant="subtitle2">Step Size (in months)</Typography>
        <TextField inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} />
      </Block>
    </>
  );
});
export default ModelDatesForm;
