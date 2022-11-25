import React, { useReducer } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";

import { Block, Upload as Uploader, range } from "@sfdl/sf-mui-components";
import { RouteProps, RouteValue } from "../../Router";

import { fileReducer, FileActionType, initialData } from "reducers/FileReducer";
import moment from "moment";

interface LoadDataProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const currentYear = moment().year()

const years = Array.from(range(currentYear-6, currentYear+1)) as Array<number>

const LoadData = (props: LoadDataProps) => {
  const { api } = props;
  const [fileState, fileDispatch] = useReducer(fileReducer, { ...initialData });

  const getTotalFilesLength = (): number => {
    return Object.values(fileState).reduce((prevVal, currVal) => {
      return (prevVal as number) + Object.values(currVal as Object).length;
    }, 0) as number;
  };

  const handleNextClick = async () => {
    if (api && fileState) {
      const files: { year: string; file: unknown; }[] = [];
      Object.keys(fileState).forEach((year) => {
        Object.values(fileState[year]).forEach((file:any) => {
          files.push({year, file: file.file})
        })
      })
      try {
        await api.callAPI({method: "reset", value: {}})
        await api.callAPI({method: "add_files", value: {files}})
        props.handleRouteChange(RouteValue.SET_MODEL);
      } catch (ex) {
        console.error("API add_files request failed", ex);
        alert("Something went wrong!")
      }
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

            {years.map((year) => (
            <Grid item xs={4} key={year}>
              <Uploader
                label={`Drop your ${year}/${year+1-2000} SSDA903 files here or click to select`}
                onUploadReady={(files) => {
                  fileDispatch({
                    type: FileActionType.ADD_FILES,
                    payload: files || {},
                    year: year.toString(),
                  });
                }}
                fileList={fileState[year.toString()]}
              />
            </Grid>
            ))}

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
