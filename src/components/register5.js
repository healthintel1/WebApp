import React from "react"
import "./register.css"
import {
	BrowserView,
	MobileView,
	isMobile,
} from "react-device-detect";

class Register5 extends React.Component {

	render() {
		let {onS} = this.props;

		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "100vw" : "700px"}}>
				<p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>Terms & Conditions</p>
				<p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-90" : "w-80"}`}>Healthintel intends to use the temperature, heart rate and oxygen saturation data collected from users to train its models and improve the algorithm’s analytical capability. Healthintel will  remove all personally identifying data from the information you have provided prior to storing this data for training of the algorithm. </p>
				<p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-90" : "w-80"}`}>If you agree to Healthintel storing the vitals data you enter for research purposes and training of the Healthintel algorithm, then please procede ahead. </p>
				<p onClick={onS} className="pointer tc mt4 mb0 pv3 f3 shadow-1" style={{"margin-left": "auto","margin-right":"auto", "border-radius":"50px"}}>I Agree</p>
			</div>
		)
	}
}

export default Register5;
