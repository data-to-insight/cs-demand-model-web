import React from "react";
import {
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

import { Cell, Row } from "./AdjustmentForm.styles";
import { AdjustmentError } from "validators/Adjustments";
import { Block } from "@sfdl/sf-mui-components";

export type AdjustmentRow = {
  age: string;
  from: string;
  to: string;
  number: string;
};

interface AdjustmentFormRowProps {
  row: AdjustmentRow;
  idx: number;
  onRemove: (idx: number) => void;
  onChange: (idx: number, rowVals: AdjustmentRow) => void;
  errors?: AdjustmentError[];
}

const AdjustmentFormRow = (props: AdjustmentFormRowProps) => {
  const { age, from, to, number } = props.row;

  const renderRow = () => {
    const renderAgeSelect = () => {
      return (
        <FormControl fullWidth size="small">
          <InputLabel id={`age-select-${props.idx}`}>Select</InputLabel>
          <Select
            labelId={`age-select-${props.idx}`}
            value={age}
            label="Click to select..."
            onChange={(event: SelectChangeEvent) => {
              props.onChange(props.idx, {
                age: event.target.value,
                from,
                to,
                number,
              });
            }}
          >
            <MenuItem value="-1 to 1">-1 to 1</MenuItem>
            <MenuItem value="1 to 5">1 to 5</MenuItem>
            <MenuItem value="5 to 10">5 to 10</MenuItem>
            <MenuItem value="10 to 16">10 to 16</MenuItem>
            <MenuItem value="16 to 18">16 to 18</MenuItem>
          </Select>
        </FormControl>
      );
    };

    if (age === "") {
      return (
        <>
          <Cell width="wide">{renderAgeSelect()}</Cell>
          <Cell width="wide" alignRight={true}>
            <Button
              onClick={() => {
                props.onRemove(props.idx);
              }}
            >
              <RemoveCircle />
            </Button>
          </Cell>
        </>
      );
    }

    return (
      <>
        <Cell width="narrow">{renderAgeSelect()}</Cell>
        <Cell width="narrow">
          <FormControl fullWidth size="small">
            <InputLabel id={`from-select-${props.idx}`}>Select</InputLabel>
            <Select
              labelId={`from-select-${props.idx}`}
              value={from}
              label="Click to select..."
              onChange={(event) => {
                props.onChange(props.idx, {
                  age,
                  from: event.target.value,
                  to,
                  number,
                });
              }}
            >
              <MenuItem value="New care entrant">New care entrant</MenuItem>
              <MenuItem value="Foster">Foster</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Cell>
        <Cell width="narrow">
          <FormControl fullWidth size="small">
            <InputLabel id={`to-select-${props.idx}`}>Select</InputLabel>
            <Select
              labelId={`to-select-${props.idx}`}
              value={to}
              label="Click to select..."
              onChange={(event) => {
                props.onChange(props.idx, {
                  age,
                  from,
                  to: event.target.value,
                  number,
                });
              }}
            >
              <MenuItem value="Care leaver">Care leaver</MenuItem>
              <MenuItem value="Foster">Foster</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Cell>
        <Cell width="narrow">
          <TextField
            variant="standard"
            value={number}
            onChange={(event) => {
              props.onChange(props.idx, {
                age,
                from,
                to,
                number: event.target.value,
              });
            }}
          />
        </Cell>
        <Cell width="narrow" alignRight={true}>
          <Button
            variant="outlined"
            onClick={() => {
              props.onRemove(props.idx);
            }}
          >
            <RemoveCircle />
          </Button>
        </Cell>
      </>
    );
  };

  const renderErrors = () => {
    return (
      <>
        {props.errors?.map((error) => {
          return (
            <Block>
              <Alert severity="error">{error.label}</Alert>
            </Block>
          );
        })}
      </>
    );
  };

  return (
    <>
      {props.errors && props.errors.length > 0 && renderErrors()}
      <Row>{renderRow()}</Row>
    </>
  );
};

export default AdjustmentFormRow;
