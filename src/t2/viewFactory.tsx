import React from "react";
import BoxPage from "./components/BoxPage";
import ButtonBarComponent from "./components/ButtonBarComponent";
import ButtonComponent from "./components/ButtonComponent";
import SideBarPage from "./components/SideBarPage";
import ParagraphComponent from "./components/ParagraphComponent";
import ChartComponent from "./components/ChartComponent";
import ExpandoComponent from "./components/ExpandoComponent";
import FragmentComponent from "./components/FragmentComponent";
import DateSelectComponent from "./components/DateSelectComponent";
import TextFieldComponent from "./components/TextFieldComponent";
import FileUploadComponent from "./components/FileUploadComponent";

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
  expando: ExpandoComponent,
  fragment: FragmentComponent,
  dateselect: DateSelectComponent,
  textfield: TextFieldComponent,
  fileupload: FileUploadComponent,
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

export const RenderList = (props: any) => {
  const {children} = props;
  const Wrap = props.wrap ? props.wrap : React.Fragment;
  return (
    <>
    { children && children.map((componentProps: ViewProps) => {
      return (<Wrap key={componentProps.id}><ViewFactory viewData={componentProps} /></Wrap>)
    })}
    </>
    )
    }

export default ViewFactory