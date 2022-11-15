import authorities from "quality-lac-data-ref-authorities/qlacref_authorities/records.json";

export type LaData = {
  la_id: string;
  la_name: string;
};
export type LaMap = {
  [key: string]: LaData;
};

const laReducer = (map: LaMap, value: LaData): LaMap => {
  map[value.la_id] = value;
  return map;
};

export const laMap = authorities
  .map((x) => {
    return {
      la_id: x.UTLA21CD,
      la_name: x.UTLA21NM,
    };
  })
  .reduce(laReducer, {});

export const laData = Object.values(laMap).sort((a, b) =>
  a.la_name > b.la_name ? 1 : -1
);
