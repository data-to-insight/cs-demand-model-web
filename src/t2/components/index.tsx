import React from "react";
import {Alert, TextField, Typography} from "@mui/material";
import {Block, DateSelect,} from "@sfdl/sf-mui-components";
import {DataActionType, PageProps} from "../layouts/root";
import {dateObjToIso, isoToDateObj} from "../../utils/dates";

export interface T2ComponentProps extends PageProps {
  type: string;
  id: string;
  errors?: string[];
}

export interface DateInputProps extends T2ComponentProps {
  label: string;
}

const renderErrors = (errorArray: string[] | undefined) => {
  if (!errorArray) {
    return [];
  }
  return (
    <Block>
      {errorArray.map((errorItem) => {
        return <Alert severity="error">{errorItem}</Alert>;
      })}
    </Block>
  );
};

const SubtitleComponent = (props: T2ComponentProps) => {
  return (
    <Block>
      <Typography>
        <strong>When should the forecast end?</strong>
      </Typography>
    </Block>
  )
};

const DateInput = (props: DateInputProps) => {
  const value = isoToDateObj(props.state[props.id]);
  return (
    <Block spacing="blockLarge">
      <Typography variant="subtitle2">{props.label}</Typography>
      { renderErrors(props.errors) }
      <DateSelect onChange={(ev) => {
        props.dispatch({type: DataActionType.SET_FIELD, field: props.id, value: dateObjToIso(ev)})
      }} day={value.day} month={value.month} year={value.year} />
    </Block>
  )
};

const IntegerInput = (props: T2ComponentProps) => {
  return (
    <Block spacing="blockLarge">
      <Typography variant="subtitle2">Step Size (in days)</Typography>
      { renderErrors(props.errors) }
      <TextField inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                 onChange={(ev) => {props.dispatch({
                   type: DataActionType.SET_FIELD,
                   field: props.id,
                   value: ev.target.value,
                 })}}
                 value={props.state[props.id]}
      />
    </Block>
  )
}

const components: Record<string, any>= {
  subtitle: SubtitleComponent,
  dateInput: DateInput,
  integerInput: IntegerInput,
}

const T2Component = (props: T2ComponentProps) => {
  if (components[props.type]) {
    const C = components[props.type];
    return <C key={props.id} {...props} />
  } else {
    return <div>Missing component: {props.type}</div>
  }

}

export {T2Component}