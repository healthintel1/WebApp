import React from "react"
import "./transition.css"
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import CustomSVG from "./customSVG";

class GettingStarted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: ""
        }
    }

    componentDidMount() {
        setTimeout(()=>{this.setState({visible: true})}, 25)
    }

    letsGo = () => {
        if (this.props.vitals === 1 && this.props.symptoms === 1 && this.props.personal === 1) {
            this.props.onRouteChange("wait")
        } else {
            this.props.onRouteChange("personal")
        }
    }

    render() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

      let {onRouteChange} = this.props;
      return (
        <div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ml4 mb3 mt3 dark-gray dib`} style={{"margin-right":"10rem"}}> <p className={`f5 gray mb3 dib ${(isMobile)?"ml4":""}`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p></p>
                </div>
                <div className={"row_col"} style={{display: "flex", justifyContent: 'center'}}>
                    <p className="ml4 mt4 mb0 w-80 f3 tc" style={{"font-weight":"500", color: "rgb(127,90,179)", "line-height":"1.6"}}>Please enter your vitals and other details to view the prediction.</p>
                    <CustomSVG/>
                </div>
                <div className="tc w-100 mt3 mb0">
                    <p onClick={this.letsGo} className="f4 tc grow no-underline pointer br-pill ph4 pv3 mb2 dib white bg-light-purple" style={{margin:"auto"}}>Let's Go!</p>
                </div>
            </div>
        </div>
      )
    }
}

export default GettingStarted;
