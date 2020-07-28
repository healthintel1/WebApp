import React from "react"
import {navigate} from "gatsby"
import {  
  isBrowser,
  isMobile
} from "react-device-detect";
import "./register.css"

class UpdatingDetails extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
			console.log("REACHED FETCH WALA PART")
			
	}

	render() {
		return(
			<div className="shadow-3 tc b--light-gray ph5 pb4 bg-white ba Avenir" style={{margin:"auto", "font-family":"Avenir", width: (isMobile) ? "85vw" : "700px"}}>
				<p className="f2 mt4 dark-green mb3 ">JUST A MOMENT</p>
				<p className="f4 w-70 mt2 gray" style={{"margin":"auto"}}>Please wait while we update your details.</p>
				<img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" style={{width:"70%", margin:"auto", "margin-top":"0px", padding:"0px"}}/>
			</div>
		);
	}
}

export default UpdatingDetails;