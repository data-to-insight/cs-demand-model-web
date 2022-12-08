import React from "react";
import { Button } from "@mui/material";
import {ViewProps} from "../viewFactory";
import {useApi} from "../../hooks/api";
import {useSelector} from "react-redux";
import {selectModel} from "../../features/model/modelSlice";

export interface ButtonProps extends ViewProps {
  text: string,
  variant?: "text" | "contained" | "outlined" | undefined,
  action: string,
  disabled? : boolean,
}

const ButtonComponent = (props: ButtonProps) => {
  const { text, variant, action, disabled} = props;
  const model = useSelector(selectModel);
  const api = useApi();

  const onClick = () => {
    api.call(action, model);
  }

  return (
    <Button variant={variant || "contained"} onClick={onClick} disabled={disabled}>
      { text }
    </Button>
  )

}

export default ButtonComponent;
