import React from "react";

import {ViewProps} from "../viewFactory";
import { Typography, TextField } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectStateProperty, updateStateProperty} from "../../features/model/modelSlice";

export interface TextFieldComponentProps extends ViewProps {
  input_props: any;
  title: string;
}

const TextFieldComponent = (props: TextFieldComponentProps) => {
  const dispatch = useDispatch();
  const value = useSelector(selectStateProperty(props.id));
  const onChange = (event: any) => {
    const value = event.target.value;
    dispatch(updateStateProperty({property: props.id, value: value}))
  }
  return (
    <>
      <Typography variant="subtitle2">{props.title}</Typography>
      <TextField value={value || ""} inputProps={props.input_props} onChange={onChange}/>
    </>
  )

}

export default TextFieldComponent;
