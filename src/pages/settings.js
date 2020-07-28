import React from "react"
import "../components/register.css"
import Navbar from "../components/Navbar.js"
import {navigate} from "gatsby";
import "tachyons"
import { isBrowser, isMobile } from "react-device-detect";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);


class Settings extends React.Component {
	constructor() {
		super()
		this.state = {
			history:"",
			clientId:"",
			path:"",
		}
	}

	componentDidMount() {
		this.setState({path:this.props.location.pathname})
		Auth.currentAuthenticatedUser()
			.then(res => {
				console.log(res.username)
				this.setState({clientId: res.username})
				var url = `https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/gethistory?client_id=${res.username}`
				console.log(url)
				async function GetData() {
					let response = await fetch(url)
					response = response.json()
					return response
				}
				GetData()
					.then(res => {
						console.log(res)
						this.setState(res)
						let allergies = this.state.allergies9
						if (allergies.length === 0) {
							this.setState({allergies9: "None"})
						} else {
							allergies = allergies.split(",")
							console.log(allergies)
							let al = ""
							for (let i=0; i<allergies.length; i++) {
								if (allergies[i].charAt(0) === " ") {
									allergies[i] = allergies[i].slice(1)
								}
								let al1 = allergies[i].charAt(0).toUpperCase() + allergies[i].slice(1).toLowerCase()
								al = al + al1 + ", "
							}
							console.log(allergies)
							this.setState({allergies9: al.slice(0,-2)})
						}
						let history = "";
						if (this.state.cancer) {
							history = history + "Cancer, "
						}
						if (this.state.diabetes) {
							history = history + "Diabetes, "
						}
						if (this.state.heartdisease) {
							history = history + "Heart Disease, "
						}
						if (this.state.highbloodpressure) {
							history = history + "High Blood Pressure, "
						}
						if (this.state.kidneyliverfailure) {
							history = history + "Kidney/Liver Failure, "
						}
						if (this.state.lungdisease) {
							history = history + "Lung Disease, "
						}
						if (this.state.neurologicaldisease) {
							history = history + "Neurological Disease, "
						}
						if (this.state.asthma) {
							history = history + "Asthma, "
						}
						if (this.state.severeobesity) {
							history = history + "Obese, "
						}
						if (this.state.smoker !== 0) {
							history = history + "Smoker, "
						}
						if (this.state.weakenedimmunity) {
							history = history + "Weakened Immunity, "
						}
						if (history.length !== 0) {
							history = history.slice(0,-2)
						}
						this.setState({history: history})
						console.log(this.state)
						if (this.state.gender === "") {
							this.setState({gender: "Not specified"})
						}
					})
					.catch(err => console.log(err))
					})
			.catch(err => navigate("/"))

	}

	render() {
		return(
			<div>
				<Navbar path={this.state.path}/>
				<div style={{width: (isMobile) ? "100vw" : "700px", margin:"auto"}}>
					<div className="tl ba bw1 w-100 pb4 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
						<div className="w-100 mb3 bb bw1 b--light-gray">
		            	  <p className={`f5 ${(isMobile)?"ml4":"ml5"} mb3 mt3 light-red dib`} style={{"margin-right":"10rem"}}>YOUR PROFILE</p>
		        	    </div>
		        	    <div className={`pa4 ${(isMobile) ? "" : "pl5"}`}>
			        		<p className={`${(isMobile) ? "f4" : "f3"} mb4 dib`} style={{color:"rgb(127,79,180)"}}><b>Personal Details</b><span onClick={()=>navigate("/update-account", {state:{route: "personal", data: this.state}})} className="ml2 f6 gray underline-hover pointer dim">Edit</span></p>
			        		<p className={`${(isMobile) ? "f6" : "f5"} mt2 b mb0 gray`}>{this.state.firstname} {this.state.lastname}</p>
			        		<p className={`${(isMobile) ? "f6" : "f5"} mt3 mb0 gray`}><b>Email</b>: {this.state.email}</p>
			        		<div>
			        			<p className={`${(isMobile) ? "f6" : "f5"} gray dib mt3 mb0 pr3`}><b>Age</b>: {this.state.age} years old</p>
			        			<p className={`${(isMobile) ? "f6" : "f5"} dib mt0 mb0 gray ph3`}><b>Location</b>: {this.state.zipcode}</p>
			        		</div>
			        		<p className={`${(isMobile) ? "f6" : "f5"} mt3 mb0 gray`}><b>Gender</b>: <p className="dib ttc">{this.state.gender}</p></p>
			        	</div>
			        	<div className={`pa4 ${(isMobile) ? "" : "pl5"}`}>
			        		<p className={`${(isMobile) ? "f4" : "f3"} mb4`} style={{color:"rgb(127,79,180)"}}><b>Allergies</b><span onClick={()=>navigate("/update-account", {state:{route: "allergies", data: this.state}})} className="ml2 f6 gray underline-hover pointer dim">Edit</span></p>
			        		<p className={`${(isMobile) ? "f6" : "f5"} mt2 mb0 gray`}>{this.state.allergies9}</p>
			        	</div>
			        	<div className={`pa4 ${(isMobile) ? "" : "pl5"}`}>
			        		<p className={`${(isMobile) ? "f4" : "f3"} mb4`} style={{color:"rgb(127,79,180)"}}><b>Medical History</b><span onClick={()=>navigate("/update-account", {state:{route: "history", data: this.state}})} className="ml2 f6 gray underline-hover pointer dim">Edit</span></p>
			        		<p className={`${(isMobile) ? "f6" : "f5"} w-70 mt2 mb0 gray`}>{this.state.history}</p>
			        	</div>
		        	</div>

				</div>
			</div>
		);
	}
}

export default Settings
