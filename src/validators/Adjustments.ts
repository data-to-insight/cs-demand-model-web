import { AdjustmentRow } from "components/forms";

export type AdjustmentError = {
  row: number;
  label: string;
};

// TODO: this is very ugly... refactor...
export const getRepeatedRows = (rows: AdjustmentRow[]): AdjustmentError[] => {
  const output: AdjustmentError[] = [];
  type MatchRow = {
    value: string;
    originalRow: number;
  };

  let matchRows: MatchRow[] = [];
  rows.forEach((row, i) => {
    const joined = `${[row.age, row.from, row.to].join("")}`;

    if (joined !== "") {
      matchRows.push({
        value: joined,
        originalRow: i,
      });
    }
  });

  matchRows = matchRows.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });

  matchRows.forEach((row, i) => {
    if (matchRows[i - 1]) {
      if (row.value === matchRows[i - 1].value) {
        output.push({
          row: row.originalRow,
          label:
            "Only enter one adjustment between any pair of placement categories.",
        });
      }
    }
  });

  return output;
};

const getInvalidRows = (rows: AdjustmentRow[]): AdjustmentError[] => {
  const output: AdjustmentError[] = [];

  rows.forEach((row, i) => {
    if (
      (row.from === "Other" || row.from === "Foster") &&
      row.to === row.from
    ) {
      output.push({
        label: `Invalid from/to category pair ("${row.from}" and "${row.to}")`,
        row: i,
      });
    }

    if (row.from === "New care entrant" && row.to === "Care leaver") {
      output.push({
        label: `Invalid from/to category pair ("New care entrant" and "Care leaver")`,
        row: i,
      });
    }
  });

  return output;
};

const AdjustmentValidator = (
  adjustments: AdjustmentRow[]
): AdjustmentError[] => {
  let output: AdjustmentError[] = [];

  const repeatRows = getRepeatedRows(adjustments);

  const invalidRows = getInvalidRows(adjustments);

  return output.concat(repeatRows).concat(invalidRows);
};

export default AdjustmentValidator;
