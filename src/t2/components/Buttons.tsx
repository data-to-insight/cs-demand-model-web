import React from "react";
import { Button } from "@mui/material";

import {
  Block,
  DualButton,
} from "@sfdl/sf-mui-components";

export const SingleButton = (props: any) => {
  const { onSubmit, button } = props;
  return (
    <Block spacing="blockLarge">
        <Button variant={button.variant || "contained"} onClick={() => {onSubmit(button.action)}}>
          {button.label}
        </Button>
    </Block>
  )
}

export const MultiButtons = (props: any) => {
  const { onSubmit, buttons } = props;
  return (
    <Block spacing="blockLarge">
      <DualButton>
        { buttons.map((button: any) => (
          <Button variant={button.variant || "contained"} onClick={() => {onSubmit(button.action)}}>
            {button.label}
          </Button>
        ))}
      </DualButton>
    </Block>
  )
};

export const Buttons = (props: any) => {
  const { buttons, onSubmit } = props;
  if (buttons.length === 0) {
    return <></>
  } else if (buttons.length === 1) {
    return <SingleButton onSubmit={onSubmit} button={buttons[0]} />
  } else if (buttons.length > 1) {
    return <MultiButtons onSubmit={onSubmit} buttons={buttons} />
  } else {
    return <SingleButton onSubmit={onSubmit} button={buttons} />
  }
}