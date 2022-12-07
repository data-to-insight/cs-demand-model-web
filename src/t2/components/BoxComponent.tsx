import React from "react";
import {Box} from "@mui/material";
import { Block } from "@sfdl/sf-mui-components";

import ViewFactory, {ViewProps} from "../viewFactory";

interface BoxComponentProps extends ViewProps {
  components: [any];
}

const BoxComponent = (props: BoxComponentProps) => {
  console.log("BoxComponent props=", props);
  return (
    <Box flexGrow={1}>
      <Block spacing="blockLarge">
      { props.components && props.components.map((componentProps) => {
        return <ViewFactory key={componentProps.id} viewData={componentProps} />
      })}
      </Block>
    </Box>
  )
}

export default BoxComponent;
