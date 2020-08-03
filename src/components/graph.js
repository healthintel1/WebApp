import React from "react"
import "./transition.css"
import Chart from "./chart.js"
import {isMobile, BrowserView, MobileView} from "react-device-detect"

class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: "",
            width:"",
            data: "",
        }
    }

    componentDidMount() {
        setTimeout(()=>{this.setState({visible: true})}, 25)
        this.setState({width: this.container.offsetWidth - 100})
    }

    render() {
      console.log(this.props.data)
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
      return (
        <div className={`w-100 mb3`} ref={el => (this.container = el)}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ${(isMobile)?"ml4":"ml5"} mb3 mt3 dark-gray dib`} style={{"margin-right":"10rem"}}>TREND ANALYSIS<p className={`f5 gray mb3 dib ${(isMobile)?"ml6":"ml7"}`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p></p>
                </div>
                <div className="mt4 pl4">
                  <Chart data={this.props.data} width={this.state.width}/>
                </div>
            </div>
        </div>
      )
    }
}

export default Graph;