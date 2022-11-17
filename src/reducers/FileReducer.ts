export type FileAction = {
  type: FileActionType;
  payload: any;
};

export enum FileActionType {
  SET_FILES = "SET_FILES",
  SET_2022 = "SET_2022",
  SET_2021 = "SET_2021",
  SET_2020 = "SET_2020",
  SET_2019 = "SET_2019",
  SET_2018 = "SET_2018",
  CLEAR_FILES = "CLEAR_FILES",
}

export const initialData = {
  files2022: {},
  files2021: {},
  files2020: {},
  files2019: {},
  files2018: {},
};

export const fileReducer = (fileState: any, fileAction: FileAction) => {
  let newState;

  switch (fileAction.type) {
    case FileActionType.CLEAR_FILES:
      return {};

    case FileActionType.SET_2022:
      newState = { ...fileState };
      console.log(fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.files2022 = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_2021:
      newState = { ...fileState };
      console.log(fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.files2021 = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_2020:
      newState = { ...fileState };
      console.log(fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.files2020 = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_2019:
      newState = { ...fileState };
      console.log(fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.files2019 = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_2018:
      newState = { ...fileState };
      console.log(fileAction.payload);
      if (Object.keys(fileAction.payload).length < 1) {
        newState = {};
      } else {
        newState.files2018 = fileAction.payload;
      }

      return newState;

    case FileActionType.SET_FILES:
      newState = { ...fileAction.payload };

      return newState;
  }
};
