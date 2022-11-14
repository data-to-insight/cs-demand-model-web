import { getRepeatedRows } from "../Adjustments";

const data = [
  {
    age: "-1 to 1",
    from: "New care entrant",
    to: "Foster",
    number: "",
  },
  {
    age: "5 to 10",
    from: "New care entrant",
    to: "Foster",
    number: "",
  },
  {
    age: "-1 to 1",
    from: "New care entrant",
    to: "Foster",
    number: "",
  },
];

const output = [
  {
    row: 0,
    label:
      "Only enter one adjustment between any pair of placement categories.",
  },
  {
    row: 1,
    label:
      "Only enter one adjustment between any pair of placement categories.",
  },
];

test("does repeated rows work", () => {
  expect(getRepeatedRows(data)).toEqual(output);
});
