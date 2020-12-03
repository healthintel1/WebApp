import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ReferenceArea,
} from 'recharts';
import {isMobile} from "react-device-detect"

class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/q68cz43w/';

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.data)
    return (
      <BarChart
        width={this.props.width}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: isMobile?5:30, left: isMobile?5:20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Bar dataKey="riskfactor" fill="#a897ff" />
        <ReferenceLine y={4} label="Red" stroke="red" isFront={true} strokeDasharray="3 3" />
        <ReferenceLine y={3} label="Orange" stroke="orange" isFront={true} strokeDasharray="3 3" />
        <ReferenceLine y={1.2} label="Green" stroke="green" isFront={true} strokeDasharray="3 3" />
      </BarChart>
    );
  }
}

export default Chart
