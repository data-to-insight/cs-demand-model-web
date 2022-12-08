import React from "react";

import {RenderList, ViewProps} from "../viewFactory";

export interface FragmentComponentProps extends ViewProps {
  components: [any];
}

const FragmentComponent = (props: FragmentComponentProps) => {

  return (
      <RenderList>{props.components}</RenderList>
  )

}

export default FragmentComponent;
