/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import { Block } from "@sfdl/sf-mui-components";
import { laData } from "utils/authorityData";

declare global {
  interface Window {
    _gaq: any;
  }
}

interface StartPageProps {
  onClick: () => void;
}

const Start = (props: StartPageProps) => {
  const handleButtonClick = () => {
    try {
      //@ts-ignore
      gtag("event", "cin-la-select", {
        localAuthority,
        localAuthorityName: laData.filter((la) => {
          return la.la_id === localAuthority;
        })[0].la_name,
        event_callback: () => {
          props.onClick();
        },
        debug_mode: true,
      });
    } catch (err) {
      console.log(err);
      props.onClick();
    }
  };

  const [localAuthority, setLocalAuthority] = useState<string>("");
  const renderDropdown = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="la-select-label">Choose local authority</InputLabel>
        <Select
          value={localAuthority}
          labelId="la-select-label"
          label="Choose local authority"
          onChange={(event: SelectChangeEvent) => {
            setLocalAuthority(event.target.value as string);
          }}
        >
          {laData.map((laItem) => {
            return (
              <MenuItem value={laItem.la_id} key={laItem.la_id}>
                {laItem.la_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <Box flexGrow={1}>
      <Block>
        <Typography variant="body1">
          Data to Insight is a national project led by local authorities with
          support from the ADCS, DLUHC, DfE and Ofsted to help local authorities
          make better use of data.
        </Typography>
      </Block>

      <Block>
        <Typography variant="body1">
          This tool automatically forecasts demand for children’s services
          placements so that commissioners can conduct sufficiency analyses,
          secure appropriate budgets for services and demonstrate the business
          case for a new or changed service.
        </Typography>
      </Block>

      <Block spacing={"blockLarge"}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderDropdown()}
          </Grid>
        </Grid>
      </Block>

      <Block spacing={"blockLarge"}>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{ boxShadow: 0 }}
          disabled={localAuthority === ""}
        >
          Start
        </Button>
      </Block>
    </Box>
  );
};

export default Start;