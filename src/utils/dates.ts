import { DateObj } from "@sfdl/sf-mui-components";
import moment from "moment";

export const isNotEmptyDate = (dateObj: DateObj) => {
  const output =
    dateObj.day !== "" && dateObj.month !== "" && dateObj.year !== "";

  return output;
};

export const isoToDateObj = (value: string): DateObj => {
  const [year, month, day] = value.split('-');
  const monthName = moment(month, 'MM').format('MMMM');
  return {year, month: monthName, day};
}