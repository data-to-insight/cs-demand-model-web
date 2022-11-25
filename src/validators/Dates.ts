import moment from "moment";
import { ModelDates } from "components/forms/modeldatesform";
import { DateObj } from "@sfdl/sf-mui-components";

type DateErrors = {
  historyStart: string[];
  historyEnd: string[];
  referenceStart: string[];
  referenceEnd: string[];
  forecastEnd: string[];
};

export const isNotEmptyDate = (dateObj: DateObj) => {
  const output =
    dateObj.day !== "" && dateObj.month !== "" && dateObj.year !== "";

  return output;
};

export const isDateObj = (toBeDetermined: any): toBeDetermined is DateObj => {
  if((toBeDetermined as DateObj).day) {
    return true
  }
  return false
}

export const checkAllDatesSet = (dates: ModelDates) => {
  return (
    Object.values(dates)
      .map((dateObj: any) => {
        if (isDateObj(dateObj)) {
          return Object.values(dateObj).reduce((prev, curr) => {
            return prev + curr;
          }, "");
        }
        return null;
      })
        .indexOf("") > -1
  );
};

const getDateValue = (dateObj: DateObj) => {
  return isNotEmptyDate(dateObj)
    ? moment(dateToString(dateObj), "DD,MMMM,YYYY").unix()
    : null;
};

const dateToString = (dateObj: DateObj) => {
  return `${dateObj.day}:${dateObj.month}:${dateObj.year}`;
};

const DateValidator = (dates: ModelDates) => {
  const errors: DateErrors = {
    historyStart: [],
    historyEnd: [],
    referenceStart: [],
    referenceEnd: [],
    forecastEnd: [],
  };

  // const historyStart =
  const historyStart = getDateValue(dates.historyStart);
  const historyEnd = getDateValue(dates.historyEnd);
  const referenceStart = getDateValue(dates.referenceStart);
  const referenceEnd = getDateValue(dates.referenceEnd);
  const forecastEnd = getDateValue(dates.forecastEnd);

  // history start before history end
  if (historyStart && historyEnd && historyStart >= historyEnd) {
    errors.historyStart.push("History Start should be before History End");
  }

  // history start before reference start
  if (historyStart && referenceStart && historyStart >= referenceStart) {
    errors.historyStart.push("History Start should be before Reference Start");
  }

  // history end should be between reference end and forecast end
  if (
    historyEnd &&
    referenceEnd &&
    forecastEnd &&
    (historyEnd <= referenceEnd || historyEnd >= forecastEnd)
  ) {
    errors.historyEnd.push(
      "History End should be between Reference End and Forecast End"
    );
  }

  // reference start should be between history start and reference end
  if (
    referenceStart &&
    historyStart &&
    referenceEnd &&
    (referenceStart <= historyStart || referenceStart >= referenceEnd)
  ) {
    errors.referenceStart.push(
      "Reference Start should be between History Start and Reference End"
    );
  }

  // reference end should be between reference start and history end
  if (
    referenceStart &&
    historyEnd &&
    referenceEnd &&
    (referenceEnd <= referenceStart || referenceEnd >= historyEnd)
  ) {
    errors.referenceEnd.push(
      "Reference End should be between Reference Start and History End"
    );
  }

  // forecast end should be after history end
  if (forecastEnd && historyEnd && forecastEnd <= historyEnd) {
    errors.forecastEnd.push("Forecast End should be after History End");
  }

  return errors;
};

export default DateValidator;
