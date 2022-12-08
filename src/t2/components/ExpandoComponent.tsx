import React from "react";
import { Block, Expando, DateObj } from "@sfdl/sf-mui-components";

import {RenderList, ViewProps} from "../viewFactory";

export interface ExpandoComponentProps extends ViewProps {
  components: [any];
  title: string;
}

const ExpandoComponent = (props: ExpandoComponentProps) => {

  return (
    <Expando title={props.title} id={props.id}>
      <RenderList>{props.components}</RenderList>
    </Expando>
  )

}

export default ExpandoComponent;
