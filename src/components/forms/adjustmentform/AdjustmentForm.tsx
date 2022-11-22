import React, { memo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ControlPoint as PlusIcon, NavigateNext } from "@mui/icons-material";
import { DualButton, Block } from "@sfdl/sf-mui-components";

import AdjustmentFormRow, { AdjustmentRow } from "./AdjustmentFormRow";

import { Cell, Row } from "./AdjustmentForm.styles";

import AdjustmentValidator from "validators/Adjustments";

interface AdjustmentFormProps {
  rows: AdjustmentRow[];
  onChange: (rows: AdjustmentRow[]) => void;
}

const AdjustmentForm = memo((props: AdjustmentFormProps) => {
  const { rows } = props;

  const validationErrors = AdjustmentValidator(rows);

  const getErrorsForRow = (rowNum: number) => {
    return validationErrors.filter((error) => {
      return error.row === rowNum;
    });
  };

  const addEmptyRow = () => {
    const newRows = rows.slice();
    newRows.push({ age: "", from: "", to: "", number: "" });
    props.onChange(newRows);
  };

  const removeRow = (idx: number) => {
    const newRows = rows.slice();
    newRows.splice(idx, 1);
    props.onChange(newRows);
  };

  const setRow = (idx: Number, rowVals: AdjustmentRow) => {
    const newRows = rows.map((row, i) => {
      if (i === idx) {
        return rowVals;
      }

      return row;
    });

    props.onChange(newRows);
  };

  const renderRows = () => {
    return rows.map((row, i) => {
      return (
        <AdjustmentFormRow
          onChange={setRow}
          row={row}
          onRemove={removeRow}
          idx={i}
          errors={getErrorsForRow(i)}
        />
      );
    });
  };

  return (
    <Box>
      <Block>
        <Typography>
          <strong>Adjustments</strong>
        </Typography>
        <Typography>
          Add hypothetical monthly transfers between two placement types to
          compare this "adjusted" scenario with the "base" scenario
        </Typography>
      </Block>

      <Block>
        <Row>
          <Cell width="narrow">
            <strong>Age</strong>
          </Cell>
          <Cell width="narrow">
            <strong>From</strong>
          </Cell>
          <Cell width="narrow">
            <strong>To</strong>
          </Cell>
          <Cell width="mid">
            <strong>Number (monthly)</strong>
          </Cell>
        </Row>
        <>{renderRows()}</>
      </Block>
      <Block>
        <DualButton>
          <Button
            variant="contained"
            onClick={() => {
              addEmptyRow();
            }}
          >
            Add Row <PlusIcon />
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              addEmptyRow();
            }}
          >
            Calculate <NavigateNext />
          </Button>
        </DualButton>
      </Block>
    </Box>
  );
});

export default AdjustmentForm;
