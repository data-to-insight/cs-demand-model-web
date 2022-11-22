import React, { memo } from "react";
import { Typography, TextField, Alert, Button } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

import {
  Block,
  DualButton,
  DateSelect,
  DateObj,
} from "@sfdl/sf-mui-components";

import DateValidator, { checkAllDatesSet } from "validators/Dates";

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
  onSubmit: () => void;
}

const ModelDatesForm = memo((props: ModelDatesFormProps): JSX.Element => {
  const { dates } = props;

  const validationErrors = DateValidator(dates);

  const renderErrors = (errorArray: string[]) => {
    return (
      <Block>
        {errorArray.map((errorItem) => {
          return <Alert severity="error">{errorItem}</Alert>;
        })}
      </Block>
    );
  };

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
        {validationErrors &&
          validationErrors.historyStart.length > 0 &&
          renderErrors(validationErrors.historyStart)}
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
        {validationErrors &&
          validationErrors.historyEnd.length > 0 &&
          renderErrors(validationErrors.historyEnd)}
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
        {validationErrors &&
          validationErrors.referenceStart.length > 0 &&
          renderErrors(validationErrors.referenceStart)}
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
        {validationErrors &&
          validationErrors.referenceEnd.length > 0 &&
          renderErrors(validationErrors.referenceEnd)}
        <DateSelect
          onChange={(val) => {
            const newDates = { ...dates };
            newDates.referenceEnd = val;
            props.onChange(newDates);
          }}
          {...dates.referenceEnd}
        />
      </Block>

      <Block>
        <Typography>
          <strong>When should the forecast end?</strong>
        </Typography>
      </Block>
      <Block spacing="blockLarge">
        <Typography variant="subtitle2">Forecast End Date</Typography>
        {validationErrors &&
          validationErrors.forecastEnd.length > 0 &&
          renderErrors(validationErrors.forecastEnd)}
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
      <Block spacing="blockLarge">
        <DualButton>
          <Button
            variant="contained"
            disabled={checkAllDatesSet(dates)}
            onClick={() => {
              props.onSubmit();
            }}
            endIcon={<SendIcon />}
          >
            Calculate now
          </Button>

          <Button variant="outlined" color="secondary">
            Use Sample Values
          </Button>
        </DualButton>
      </Block>
    </>
  );
});
export default ModelDatesForm;
