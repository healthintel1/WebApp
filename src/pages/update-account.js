import React from "react"
import {navigate} from "gatsby";
import UpdatePersonal from "../components/updatePersonal.js"
import UpdateAllergies from "../components/updateAllergies.js"
import UpdateHistory from "../components/updateHistory.js"
import Footer from "../components/footer";
import {BackButtonSetting} from "../components/backbutton";
import Navbar from "../components/Navbar";

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
				<Navbar path={"/settings/"}/>
				<BackButtonSetting onRouteChange={() => navigate("/settings")}/>
				{output}
				<Footer/>
			</div>
		)
	}
}


export default UpdateAccount;
