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

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()
.has().symbols()                                
.has().not().spaces()

class ForgotForm2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code: "",
			pass: "",
			new_pass: "",
			error: "",
		}
	}

	onTypeEnter = (e) => {
		this.setState({[e.target.id]: e.target.value})
		console.log(e.target.value)
	}

	

	render() {
		const {email, onRouteChange} = this.props
		const changePass = () => {
			Auth.forgotPasswordSubmit(email, this.state.code, this.state.pass)
			    .then(data => onRouteChange(3))
			    .catch(err => this.setState({error: err.message}));
		}
		const onSubmit = () => {
			if (this.state.pass !== this.state.new_pass) {
				this.setState({error: "Passwords do not match"})
			} else if (schema.validate(this.state.pass) !== true) {
				this.setState({error: "Password is weak. Please ensure password is atleast 8 characters long and has uppercase, lowercase, numeric and special symbols."})
			} else {
				changePass()
			}
		}
		return(
			<div className={`shadow-3 tc b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 pt4 bg-white ba`} style={{margin:"auto", "font-family":"Avenir", width: (isMobile) ? "90vw" : "600px"}}>
				<p className={` ${(isMobile) ? "f3" : "f2"} tl ml3 mt4 mb4`} style={{"color":"rgb(127, 90, 179)"}}>Reset Password</p>
				<div className="tl mb3" style={{ fontSize: (isMobile) ? 16 : 18, background:"rgb(243,245,248)", padding:"15px 15px", "border-radius":"15px", width:(isMobile) ? "95%" : "85%"}}>
					<FloatingLabelInput id="code" label="Enter Verification Code" onChange={this.onTypeEnter} style={{background:"rgb(243,245,248)"}}/>
				</div>
				<div className="tl mb3" style={{ fontSize: (isMobile) ? 16 : 18, background:"rgb(243,245,248)", padding:"15px 15px", "border-radius":"15px", width:(isMobile) ? "95%" : "85%"}}>
					<FloatingLabelInput id="pass" type="password" label="New Password" onChange={this.onTypeEnter} style={{background:"rgb(243,245,248)"}}/>
				</div>
				<div className="tl mb5" style={{ fontSize: (isMobile) ? 16 : 18, background:"rgb(243,245,248)", padding:"15px 15px", "border-radius":"15px", width:(isMobile) ? "95%" : "85%"}}>
					<FloatingLabelInput id="new_pass" type="password" label="Confirm New Password" onChange={this.onTypeEnter} style={{background:"rgb(243,245,248)"}}/>
				</div>
				<p onClick={onSubmit} class="f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ba border-box" style={{margin:"auto"}}>
				    <span class="pr1"> Continue </span>
				</p>
				<p className="f5 b red">{this.state.error}</p>
				<p className="f5 mb4 dark-blue tc">{this.state.message}</p>
			</div>
		);
	}
}

export default ForgotForm2;