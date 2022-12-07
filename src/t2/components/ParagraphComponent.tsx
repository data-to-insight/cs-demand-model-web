import React from "react";
import { Typography } from "@mui/material";
import {ViewProps} from "../viewFactory";

export interface ParagraphComponentProps extends ViewProps {
  text: string;
}

const ParagraphComponent = (props: ParagraphComponentProps) => {
  return (
    <Typography>{props.text}</Typography>
  )
}

export default ParagraphComponent;
