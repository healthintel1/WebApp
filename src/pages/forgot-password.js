import React from "react"
import '../fonts/TenaliRamakrishna-Regular.ttf'
import {navigate} from "gatsby";
import ForgotForm1 from "../components/forgot1.js"
import ForgotForm2 from "../components/forgot2.js"
import ForgotMessage from "../components/forgot3.js"

class Forgot extends React.Component {
	constructor() {
		super()
		this.state = {
			email: "",
			route: 1,
		}
	}

	onEmailUpdate = (data) => {
		this.setState({email: data})
	}

	onRouteChange = (route) => {
		this.setState({route: route})
	}

	render() {
		let output;
		if (this.state.route === 1) {
			output = <ForgotForm1 onEmailUpdate={this.onEmailUpdate} onRouteChange={this.onRouteChange}/>
		} else if (this.state.route===2) {
			output = <ForgotForm2 email={this.state.email} onRouteChange={this.onRouteChange}/>
		} else if (this.state.route === 3) {
			output = <ForgotMessage />
		}

		return(
			<div>
				<h1 onClick={()=>navigate("/")} class="pointer mt0 mb0 fw1 tc mt3 mb4 f3 w-100 pb3 bb b--light-gray bw1" style={{"font-family":"Avenir", color: "rgb(127,90,179)"}}>HelpDefeatCorona.org</h1>
				{output}
			</div>
		)
	}
}

export default Forgot;