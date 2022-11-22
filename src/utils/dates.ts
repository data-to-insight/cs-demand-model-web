import { DateObj } from "@sfdl/sf-mui-components";

export const isNotEmptyDate = (dateObj: DateObj) => {
  const output =
    dateObj.day !== "" && dateObj.month !== "" && dateObj.year !== "";

  console.log(output);

  return output;
};
