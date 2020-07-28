import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ReferenceArea,
} from 'recharts';

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
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Bar dataKey="riskfactor" fill="#a897ff" />
        <ReferenceLine y={0.75} label="High Risk" stroke="red" isFront={true} strokeDasharray="3 3" />
        <ReferenceLine y={0.25} label="Medium Risk" stroke="yellow" isFront={true} strokeDasharray="3 3" />
      </BarChart>
    );
  }
}

export default Chart