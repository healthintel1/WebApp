import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, Cell,
} from 'recharts';
import {isMobile} from "react-device-detect"

class Chart extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/q68cz43w/';

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data||[],
    }
  }

  componentDidMount() {
    this.setState({data: this.props.data})
  }

  getcolors(c){
    console.log(c, "HELLOELLELOELEOO")
    if (c === 4){
      return "#E60026"
    } else if (c === 2){
      return "#ffd344"
    } else if (c === 1){
      return "#e8fdf5"
    } else if (c === 3) {
      return "orange"
    }
    return "grey"
  }

  render() {
    const data = this.props.data || []
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
        <Bar dataKey="riskfactor" fill="#a897ff">
          {
            data.map((entry, index) => (
                <Cell fill={this.getcolors(entry.riskfactor)} />
            ))
          }
        </Bar>
        {/*<ReferenceLine y={4} label="Red" stroke="red" isFront={true} strokeDasharray="3 3" />*/}
        {/*<ReferenceLine y={3} label="Orange" stroke="orange" isFront={true} strokeDasharray="3 3" />*/}
        {/*<ReferenceLine y={1.2} label="Green" stroke="green" isFront={true} strokeDasharray="3 3" />*/}
      </BarChart>
    );
  }
}

export default Chart
