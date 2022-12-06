import React from "react";
import {T2ComponentProps, T2Component} from "../components";
import {PageProps} from "./root";
import {Box} from "@mui/material";
import {Buttons} from "../components/Buttons";

export interface MainLayoutProps extends PageProps{
  components: Array<T2ComponentProps>;
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <Box flexGrow={1}>
      { props.components && props.components.map((componentProps) => {
        const mergedProps = {...props, ...componentProps}
        return <T2Component key={mergedProps.id} {...mergedProps} />
      })}
      { props.actions && <Buttons onSubmit={props.onSubmit} buttons={props.actions} />}
    </Box>
  )
}

export default MainLayout;
