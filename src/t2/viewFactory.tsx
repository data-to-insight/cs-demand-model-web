import React from "react";
import BoxComponent from "./components/BoxComponent";
import ParagraphComponent from "./components/ParagraphComponent";

export interface ViewProps {
  id: string;
  type: string;
}

export interface ViewFactoryProps {
  viewData: ViewProps;
}

const components: Record<string, any> = {
  box: BoxComponent,
  paragraph: ParagraphComponent,
}

const ViewFactory = (props: ViewFactoryProps) => {
  const {viewData} = props;

  if (components[viewData.type]) {
    const C = components[viewData.type];
    return <C key={viewData.id} {...viewData} />
  } else {
    return <div>Missing component: {viewData.type}</div>
  }
}

export default ViewFactory