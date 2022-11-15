import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { laData } from "utils/authorityData";

import Block from "components/block";

interface StartProps {
  onClick: () => void;
}

const Start = (props: StartProps) => {
  const [localAuthority, setLocalAuthority] = useState<string>(laData[0].la_id);

  const renderDropdown = () => {
    return (
      <Select
        value={localAuthority}
        onChange={(event: SelectChangeEvent) => {
          setLocalAuthority(event.target.value as string);
        }}
      >
        {laData.map((laItem) => {
          return <MenuItem value={laItem.la_id}>{laItem.la_name}</MenuItem>;
        })}
      </Select>
    );
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
        </Block>
        <Block spacing="blockLarge">{renderDropdown()}</Block>
        <Block>
          <Button
            variant="contained"
            onClick={() => {
              props.onClick();
            }}
          >
            Start
          </Button>
        </Block>
      </Box>
    </>
  );
};

export default Start;
