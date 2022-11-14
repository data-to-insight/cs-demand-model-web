import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import moment from "moment";
import {
  DateFieldContainer,
  DateFieldNarrow,
  DateFieldWide,
  DateFieldMid,
} from "./DateSelect.styles";

export type DateObj = {
  day: string;
  month: string;
  year: string;
};

interface DateSelectProps {
  day: string;
  month: string;
  year: string;
  onChange: (date: DateObj) => void;
}

const DateSelect = (props: DateSelectProps) => {
  const { day, month, year } = props;

  const validateDays = (month: string, year: string): boolean => {
    const nonLeapYear = "2022";
    const length = moment(
      `${year !== "" ? year : nonLeapYear}:${month}`,
      "YYYY-MMMM"
    ).daysInMonth();

    return !(length < Number(day));
  };

  const renderDays = () => {
    const length =
      month && year
        ? moment(`${year}:${month}`, "YYYY-MMMM").daysInMonth()
        : 31;

    const output = new Array(length).fill("");

    return output.map((val, i) => {
      return (
        <MenuItem key={i + 1} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    });
  };

  const renderMonths = () => {
    return moment.months().map((val, i) => {
      return (
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      );
    });
  };

  const renderYears = () => {
    return ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"].map(
      (val, i) => {
        return (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        );
      }
    );
  };

  return (
    <DateFieldContainer>
      <DateFieldNarrow>
        <TextField
          fullWidth
          id="date-select-day"
          select
          label="Date"
          value={day}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({
              day: event.target.value,
              month,
              year,
            });
          }}
        >
          {renderDays()}
        </TextField>
      </DateFieldNarrow>

      <DateFieldWide>
        <TextField
          fullWidth
          id="date-select-month"
          select
          label="Month"
          value={month}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({
              day: validateDays(event.target.value, year) ? day : "",
              month: event.target.value,
              year,
            });
          }}
        >
          {renderMonths()}
        </TextField>
      </DateFieldWide>

      <DateFieldMid>
        <TextField
          fullWidth
          id="date-select-year"
          select
          label="Year"
          value={year}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (month !== "") {
              props.onChange({
                day: validateDays(month, event.target.value) ? day : "",
                month,
                year: event.target.value,
              });
            } else {
              props.onChange({
                day,
                month,
                year: event.target.value,
              });
            }
          }}
        >
          {renderYears()}
        </TextField>
      </DateFieldMid>
    </DateFieldContainer>
  );
};

export default DateSelect;
