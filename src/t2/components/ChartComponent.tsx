import React from "react";
import {ViewProps} from "../viewFactory";
import Plot from 'react-plotly.js';
import * as Plotly from "plotly.js";

export interface ChartComponentProps extends ViewProps {
  chart: string;
}

const data = [
  {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},]
const layout={title: {text: 'A Fancy Plot'}}
const testData = {data, layout}

const ChartComponent = (props: ChartComponentProps) => {
  const chart = JSON.parse(props.chart)
  const {data, layout} = chart;
  console.log("CHART DATA", data, testData.data)
  console.log("CHART LAYOUT", layout, testData.layout)

  return (
    <Plot data={data as Plotly.Data[]} layout={layout as Plotly.Layout}/>
  )
}

export default ChartComponent;
