import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import { NavigateNext } from "@mui/icons-material";
import { DualButton, Block } from "@sfdl/sf-mui-components";

export type Proportions = {
  foster_IFA: string;
  foster_friend_relation: string;
  foster_in_house: string;
  other_other: string;
  other_placed_with_family: string;
  other_secure_home: string;
  resi_external: string;
  resi_in_house: string;
  supported_supported: string;
};

interface ProportionCostCategoriesFormProps {
  onChange: (proportions: Proportions) => void;
  proportions: Proportions;
}

const ProportionCostCategoriesForm = (
  props: ProportionCostCategoriesFormProps
) => {
  const handleChange = (key: string, value: string) => {
    const newProportions: Proportions = { ...props.proportions };

    newProportions[key as keyof Proportions] = value;
    props.onChange(newProportions);
  };

  return (
    <Box>
      <Block spacing="blockLarge">
        <Typography>
          To display a cost forecast, enter the average weekly costs for each
          placement type, then click "Calculate Now" below.
        </Typography>
      </Block>
      <Block spacing="blockLarge">
        <Typography>
          <strong>Fostering</strong>
        </Typography>
        <Block>
          <Typography>Foster (Friend/Relative)</Typography>
          <TextField
            fullWidth
            value={props.proportions.foster_friend_relation}
            onChange={(event) => {
              handleChange("foster_friend_relation", event.target.value);
            }}
          />
        </Block>
        <Block>
          <Typography>Foster (In-house)</Typography>
          <TextField
            fullWidth
            value={props.proportions.foster_in_house}
            onChange={(event) => {
              handleChange("foster_in_house", event.target.value);
            }}
          />
        </Block>
        <Block>
          <Typography>Foster (IFA)</Typography>
          <TextField
            fullWidth
            value={props.proportions.foster_IFA}
            onChange={(event) => {
              handleChange("foster_IFA", event.target.value);
            }}
          />
        </Block>
      </Block>

      <Block spacing="blockLarge">
        <Typography>
          <strong>Residential</strong>
        </Typography>
        <Block>
          <Typography>Residential (In-house)</Typography>
          <TextField
            fullWidth
            value={props.proportions.resi_in_house}
            onChange={(event) => {
              handleChange("resi_in_house", event.target.value);
            }}
          />
        </Block>
        <Block>
          <Typography>Residential (External) </Typography>
          <TextField
            fullWidth
            value={props.proportions.resi_external}
            onChange={(event) => {
              handleChange("resi_external", event.target.value);
            }}
          />
        </Block>
      </Block>

      <Block spacing="blockLarge">
        <Typography>
          <strong>Supported</strong>
        </Typography>
        <Block>
          <Typography>Supported accomodation</Typography>
          <TextField
            fullWidth
            value={props.proportions.supported_supported}
            onChange={(event) => {
              handleChange("supported_supported", event.target.value);
            }}
          />
        </Block>
      </Block>

      <Block spacing="blockLarge">
        <Typography>
          <strong>Other</strong>
        </Typography>
        <Block>
          <Typography>Secure home</Typography>
          <TextField
            fullWidth
            value={props.proportions.other_secure_home}
            onChange={(event) => {
              handleChange("other_secure_home", event.target.value);
            }}
          />
        </Block>
        <Block>
          <Typography>Placed with family</Typography>
          <TextField
            fullWidth
            value={props.proportions.other_placed_with_family}
            onChange={(event) => {
              handleChange("other_placed_with_family", event.target.value);
            }}
          />
        </Block>
        <Block>
          <Typography>Other</Typography>
          <TextField
            fullWidth
            value={props.proportions.other_other}
            onChange={(event) => {
              handleChange("other_other", event.target.value);
            }}
          />
        </Block>
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
};

export default ProportionCostCategoriesForm;
