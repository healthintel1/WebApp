import React from "react"
import "./transition.css"
import Chart from "./chart.js"
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"

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
        this.setState({width: this.container.offsetWidth - 80})
    }

    render() {
      console.log(this.props.data)
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
      return (
        <div className={`w-100 pb3`} ref={el => (this.container = el)}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="bb bw1 b--light-gray flex pl4 pr4" style={{justifyContent:"space-between"}}>
                    <p className={`f5 pt3 dark-gray dib`}>RISK TREND ANALYSIS</p>
                    <p className={`f5 gray pt3 dib`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p>
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
