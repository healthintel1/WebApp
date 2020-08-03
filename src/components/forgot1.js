import React from "react"
import {navigate} from "gatsby";
import {  
  isBrowser,
  isMobile
} from "react-device-detect";
import FloatingLabelInput from 'react-floating-label-input';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
var validator = require("email-validator");

class ForgotForm1 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			error: "",
			message:"",
		}
	}

	onTypeEnter = (e) => {
		this.setState({email: e.target.value.toLowerCase()})
		console.log(e.target.value)
	}

	render() {
		const {onRouteChange, onEmailUpdate} = this.props
		const onSubmit =() => {			
			if (validator.validate(this.state.email) === true) {
				this.setState({error: ""})
				this.setState({message:"Loading..."})
				Auth.forgotPassword(this.state.email)
				    .then(data => {
				    	onEmailUpdate(this.state.email)
				    	onRouteChange(2)
				    })
				    .catch(err => this.setState({error: err.message}));
			} else {
				this.setState({error: "Email format incorrect"})
			}
		}
		return(
			<div className={`shadow-3 tc b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba`} style={{margin:"auto", "font-family":"Avenir", width: (isMobile) ? "90vw" : "600px"}}>
				<p className={`${(isMobile) ? "f3" : "f2"} ml3 tl mt4 mb3`} style={{"color":"rgb(127, 90, 179)"}}>Forgot Password?</p>
				<p className="f5 ml3 tl mt2 gray w-80 mb4">Please enter your details. </p>
				<div className="tl mb3" style={{ fontSize: (isMobile) ? 16 : 18, background:"rgb(243,245,248)", padding:"15px 15px", "border-radius":"15px", width: (isMobile) ? "95%" : "85%"}}>
					<FloatingLabelInput id="email" label="Your Email ID" onChange={this.onTypeEnter} style={{background:"rgb(243,245,248)"}}/>
				</div>
				<p className="f5 b mb4 red">{this.state.error}</p>
				<p className="f5 mb4 dark-blue tc">{this.state.message}</p>
				<p onClick={onSubmit} class="f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ba border-box" style={{margin:"auto"}}>
				    <span class="pr1"> Continue </span>
				</p>
			</div>
		);
	}
}

export default ForgotForm1;