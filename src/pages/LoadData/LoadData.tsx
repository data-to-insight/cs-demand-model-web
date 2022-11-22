import React, { useReducer, useContext, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { APIControl } from "@sfdl/prpc";

import { APIConfigContext } from "App";
import { Block, Upload as Uploader } from "@sfdl/sf-mui-components";
import { RouteProps, RouteValue } from "../../Router";

import { fileReducer, FileActionType, initialData } from "reducers/FileReducer";

interface LoadDataProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const LoadData = (props: LoadDataProps) => {
  const { api } = props;

  const apiConfig = useContext(APIConfigContext);
  console.log(apiConfig);
  const [loading, setLoading] = useState(false);
  const [fileState, fileDispatch] = useReducer(fileReducer, { ...initialData });

  const getTotalFilesLength = (): number => {
    return Object.values(fileState).reduce((prevVal, currVal) => {
      return (prevVal as number) + Object.values(currVal as Object).length;
    }, 0) as number;
  };

  const handleNextClick = () => {
    console.log(apiConfig, fileState);
    if (apiConfig && fileState) {
      setLoading(true);

      api.callAPI(
        {
          method: "UPLOAD",
          value: fileState,
        },
        (response) => {
          console.log("API Response", response);

          setLoading(false);
          props.handleRouteChange(RouteValue.SET_MODEL);
        },
        apiConfig
      );
    }
  };

  return (
    <>
      <Box>
        <Block spacing="blockLarge">
          <Typography>
            This tool automatically forecasts demand for children’s services
            placements so that commissioners can conduct sufficiency analyses,
            secure appropriate budgets for services and demonstrate the business
            case for a new or changed service.
          </Typography>
          <Typography>
            Load your local authority’s historic statutory return files on
            looked after children (SSDA903 files) to quickly see estimates of
            future demand for residential, fostering and supported accommodation
            placements.
          </Typography>
          <Typography>
            Adjust population and cost parameters to model changes you are
            considering, such as the creation of in-house provision, or a
            step-down service.
          </Typography>
          <Typography>
            Note: You do not need data sharing agreements to use this tool. Even
            though it opens in your web-browser, the tool runs offline, locally
            on your computer so that none of the data you enter leaves your
            device.
          </Typography>
          <Typography>
            Drop your SSDA903 return files in below to begin generating
            forecasts!
          </Typography>
        </Block>
      </Box>

      <Box>
        <Block spacing="blockLarge">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Uploader
                label="Drop your 2021/22 SSDA903 files here or click to select"
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.SET_2022,
                    payload: files || {},
                  });
                }}
                fileList={fileState.files2022}
              />
            </Grid>

            <Grid item xs={4}>
              <Uploader
                label="Drop your 2020/21 SSDA903 files here or click to select"
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.SET_2021,
                    payload: files || {},
                  });
                }}
                fileList={fileState.files2021}
              />
            </Grid>

            <Grid item xs={4}>
              <Uploader
                label="Drop your 2019/20 SSDA903 files here or click to select"
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.SET_2020,
                    payload: files || {},
                  });
                }}
                fileList={fileState.files2020}
              />
            </Grid>

            <Grid item xs={4}>
              <Uploader
                label="Drop your 2018/19 SSDA903 files here or click to select"
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.SET_2019,
                    payload: files || {},
                  });
                }}
                fileList={fileState.files2019}
              />
            </Grid>

            <Grid item xs={4}>
              <Uploader
                label="Drop your 2017/18 SSDA903 files here or click to select"
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.SET_2018,
                    payload: files || {},
                  });
                }}
                fileList={fileState.files2018}
              />
            </Grid>
          </Grid>
        </Block>
        <Block>
          <Button
            onClick={handleNextClick}
            variant="contained"
            disabled={getTotalFilesLength() < 1}
          >
            Next
          </Button>
        </Block>
      </Box>
    </>
  );
};

export default LoadData;
