import React from "react"
import '../fonts/TenaliRamakrishna-Regular.ttf'
import {navigate} from "gatsby";
import ForgotForm1 from "../components/forgot1.js"
import ForgotForm2 from "../components/forgot2.js"
import ForgotMessage from "../components/forgot3.js"
import Footer from "../components/footer";

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
				<h1 onClick={()=>navigate("/")} className="pointer mt0 mb0 fw1 tc mt3 mb4 f3 w-100 pb3 bb b--light-gray bw1" style={{"font-family":"Avenir", color: "rgb(127,90,179)"}}>Acme Inc.</h1>
				{output}
				<Footer/>
			</div>
		)
	}
}

export default Forgot;
