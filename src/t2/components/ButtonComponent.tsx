import React from "react";
import { Button } from "@mui/material";
import {ViewProps} from "../viewFactory";
import {useApi} from "../../hooks/api";

export interface ButtonProps extends ViewProps {
  text: string,
  variant?: "text" | "contained" | "outlined" | undefined,
  action: string,
}

const ButtonComponent = (props: ButtonProps) => {
  const { text, variant, action } = props;
  const api = useApi();

  const onClick = () => {
    api.call(action, {});
  }

  return (
    <Button variant={variant || "contained"} onClick={onClick}>
      { text }
    </Button>
  )

}

export default ButtonComponent;
