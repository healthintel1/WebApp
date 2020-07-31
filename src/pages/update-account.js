import React from "react"
import {navigate} from "gatsby";
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import UpdatePersonal from "../components/updatePersonal.js"
import UpdateAllergies from "../components/updateAllergies.js"
import UpdateHistory from "../components/updateHistory.js"
import Footer from "../components/footer";

class UpdateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		let output
		if (typeof window !== 'undefined' && this.props.location.state == null) {
			navigate("/settings")
		} else if (typeof window!=='undefined') {
			let route = this.props.location.state.route
			if (route==="personal") {
				output=<UpdatePersonal data = {this.props.location.state.data}/>
			} else if (route==="allergies") {
				output=<UpdateAllergies data = {this.props.location.state.data}/>
			} else if (route==="history") {
				output=<UpdateHistory data = {this.props.location.state.data}/>
			} else {
				navigate("/")
			}
		}
		return(
			<div>
				<div className="mt0 bb mb3 bw1 b--light-gray tc w-100">
					<h1 onClick={()=>navigate("/settings")} class="pointer mt0 fw1 tc mb3 f3" style={{"font-family":"Avenir", color: "rgb(127,90,179)"}}>HelpDefeatCorona.org</h1>
				</div>
				{output}
				<Footer/>
			</div>
		)
	}
}


export default UpdateAccount;
