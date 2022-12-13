import React from "react";

import {ViewProps} from "../viewFactory";
import {Typography, TextField, Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectStateProperty, updateStateProperty} from "../../features/model/modelSlice";
import { Block } from "@sfdl/sf-mui-components";
import {selectErrorsForProperty} from "../../features/error/errorSlice";

export interface TextFieldComponentProps extends ViewProps {
  input_props: any;
  title: string;
}

const TextFieldComponent = (props: TextFieldComponentProps) => {
  const dispatch = useDispatch();
  const value = useSelector(selectStateProperty(props.id));
  const error = useSelector(selectErrorsForProperty(props.id));
  const onChange = (event: any) => {
    const value = event.target.value;
    dispatch(updateStateProperty({property: props.id, value: value}))
  }
  return (
    <>
      <Typography variant="subtitle2">{props.title}</Typography>
      { error && (
        <Block><Alert severity="error">{error}</Alert></Block>
      )}
      <TextField value={value || ""} inputProps={props.input_props} onChange={onChange}/>
    </>
  )

}

export default TextFieldComponent;
