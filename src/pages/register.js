import React from "react"
import Register1 from "../components/register1.js"
import Register2 from "../components/register2.js"
import Register3 from "../components/register3.js"
import Register4 from "../components/register4.js"
import RegNav from "../components/reg_nav.js"
import '../fonts/TenaliRamakrishna-Regular.ttf'
import {navigate} from "gatsby";
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import Footer from "../components/footer";

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

			route:"account",
			firstname:"",
			lastname:"",
			email:"",
			clientid:"",
			pass: "",
			age: "",
			zipcode: "",
			gender: -1,
			allergies9:"",
			heartdisease: false,
      		highbloodpressure: false,
      		lungdisease: false,
      		diabetes: false,
      		neurologicaldisease: false,
      		kidneyliverfailure: false,
      		cancer: false,
      		smoker: false,
      		asthma: false,
      		severeobesity: false,
      		weakenedimmunity: false,
		}
	}

	onAccountSubmit = (data) => {
		this.setState({firstname: data.firstname})
		this.setState({lastname: data.lastname})
		this.setState({clientid: data.clientid})
		this.setState({email: data.email})
		this.setState({pass: data.pass})
		this.setState({age: data.age})
		this.setState({zipcode: data.zipcode})
		this.setState({gender: data.gender})
		this.setState({route: "allergies"})
	}

	onAllergiesSubmit = (data1, data2) => {
		let arr = data1.concat(data2);
		arr = arr.join(",");
		this.setState({allergies9: arr})
		console.log(this.state)
		this.setState({route:"history"})

	}
	onRouteChange = (route) => {
		this.setState({route: route})
	}

	onFinalSubmit = (data) => {
		if (data !== "nota") {
			this.setState({heartdisease: data.heart_disease})
			this.setState({highbloodpressure: data.blood_pressure})
			this.setState({diabetes: data.diabetes})
			this.setState({severeobesity: data.obesity})
			this.setState({lungdisease: data.lung_disease})
			this.setState({cancer: data.cancer})
			this.setState({asthma: data.asthma})
			this.setState({smoker: data.smoker})
			this.setState({weakenedimmunity: data.weak_immunity})
			this.setState({neurologicaldisease: data.neuro_disease})
			this.setState({kidneyliverfailure: data.kidney_liver})
			console.log(this.state)
			this.setState({route: "success"})
		}
	}

	render() {

		console.log(this.state)
		let output;
		if (this.state.route === "account") {
			output = <Register1 onAccountSubmit={this.onAccountSubmit}/>
		} else if (this.state.route==="allergies") {
			output = <Register2 onAllergiesSubmit={this.onAllergiesSubmit} onRouteChange={this.onRouteChange}/>
		} else if (this.state.route === "history") {
			output = <Register3 onFinalSubmit={this.onFinalSubmit} onRouteChange={this.onRouteChange}/>
		} else if (this.state.route === "success") {
			output = <Register4 data = {this.state}/>
		}

		return(
			<div>
				<div className="mt0 bb mb3 bw1 b--light-gray tc w-100">
					<h1 onClick={()=>navigate("/")} class="pointer mt0 fw1 tc mb3 f3" style={{"font-family":"Avenir", color: "rgb(127,90,179)"}}>HelpDefeatCorona.org</h1>
					<RegNav route={this.state.route}/>
				</div>
				{output}
				<Footer/>
			</div>
		)
	}
}

export default Register;
