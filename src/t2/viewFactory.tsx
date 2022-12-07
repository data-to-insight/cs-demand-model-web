import React from "react";
import BoxPage from "./components/BoxPage";
import ButtonBarComponent from "./components/ButtonBarComponent";
import ButtonComponent from "./components/ButtonComponent";
import SideBarPage from "./components/SideBarPage";
import ParagraphComponent from "./components/ParagraphComponent";
import ChartComponent from "./components/ChartComponent";

export interface ViewProps {
  id: string;
  type: string;
}

export interface ViewFactoryProps {
  viewData: ViewProps;
}

const components: Record<string, any> = {
  boxpage: BoxPage,
  sidebarpage: SideBarPage,
  paragraph: ParagraphComponent,
  buttonbar: ButtonBarComponent,
  button: ButtonComponent,
  chart: ChartComponent,
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