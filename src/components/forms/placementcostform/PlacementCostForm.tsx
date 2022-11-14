import React, { memo } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import { NavigateNext } from "@mui/icons-material";
import { DualButton } from "components/layout/Layout.styles";
import Block from "components/block";

export type Costs = {
  foster_IFA: string;
  foster_friend_relation: string;
  foster_in_house: string;
  inflation: string | null;
  other_other: string;
  other_placed_with_family: string;
  other_secure_home: string;
  resi_external: string;
  resi_in_house: string;
  supported_supported: string;
};

interface PlacementCostFormProps {
  costs: Costs;
  onChange: (costs: Costs) => void;
}

const PlacementCostForm = memo((props: PlacementCostFormProps) => {
  const { costs } = props;

  const handleChange = (key: string, value: string) => {
    const newCosts: Costs = { ...costs };

    newCosts[key as keyof Costs] = value;
    props.onChange(newCosts);
  };

  return (
    <Box>
      <Block>
        <Typography>
          To display a cost forecast, enter the average weekly costs for each
          placement type, then click "Calculate Now" below.
        </Typography>
      </Block>
      <Block>
        <Typography>Fostering (Friend/Relative)</Typography>
        <TextField
          fullWidth
          value={costs.foster_friend_relation}
          onChange={(event) => {
            handleChange("foster_friend_relation", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Fostering (In-house)</Typography>
        <TextField
          fullWidth
          value={costs.foster_in_house}
          onChange={(event) => {
            handleChange("foster_in_house", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Fostering (IFA)</Typography>
        <TextField
          fullWidth
          value={costs.foster_IFA}
          onChange={(event) => {
            handleChange("foster_IFA", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Residential (In-house)</Typography>
        <TextField
          fullWidth
          value={costs.resi_in_house}
          onChange={(event) => {
            handleChange("resi_in_house", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Residential (External) </Typography>
        <TextField
          fullWidth
          value={costs.resi_external}
          onChange={(event) => {
            handleChange("resi_external", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Supported accomodation</Typography>
        <TextField
          fullWidth
          value={costs.supported_supported}
          onChange={(event) => {
            handleChange("supported_supported", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Secure home</Typography>
        <TextField
          fullWidth
          value={costs.other_secure_home}
          onChange={(event) => {
            handleChange("other_secure_home", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Placed with family</Typography>
        <TextField
          fullWidth
          value={costs.other_placed_with_family}
          onChange={(event) => {
            handleChange("other_placed_with_family", event.target.value);
          }}
        />
      </Block>
      <Block>
        <Typography>Other</Typography>
        <TextField
          fullWidth
          value={costs.other_other}
          onChange={(event) => {
            handleChange("other_other", event.target.value);
          }}
        />
      </Block>
      <Block>
        <DualButton>
          <Button variant="outlined" color="secondary">
            Use Sample Values
          </Button>

          <Button variant="contained">
            Calculate <NavigateNext />
          </Button>
        </DualButton>
      </Block>
    </Box>
  );
});

export default PlacementCostForm;
