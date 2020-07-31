import React from "react"
import "./register.css"
import copy from 'copy-to-clipboard';
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import {navigate} from "gatsby"
import { TextField } from '@material-ui/core'
import FloatingLabelInput from 'react-floating-label-input';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
var validator = require("email-validator");


class SignInCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			pass: "",
			error: "",
			isSignedIn: false,
			remember: false,
			message:"",
			invite: "Invite Others"
		}
	}

	onPassEnter = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}
	onEmailEnter = (e) => {
		this.setState({[e.target.id]: e.target.value.toLowerCase()})
	}

	onInviteOthers = () => {
		copy('Predict your risk from COVID19 using HelpDefeatCOVID.org. Visit Now @ https://helpdefeatcorona-mutlr2sns.vercel.app')
		this.setState({invite: "Link Copied"})
	}

	SignIn = () => {
		this.setState({message: "Loading..."})
		let email = this.state.email;
		let pass = this.state.pass;
	    Auth.signIn({username: email, password: pass})
	    	.then((response)=>{
	    		navigate("/dashboard")

	    	})
	    	.catch((err)=> {
	    		this.setState({message:""})
	    		if (err.message === "User is not confirmed.") {
	    			this.setState({error: "Please verify your email."})
	    		} else {
	    			this.setState({error: err.message})
	    		}
	    	})
	}

	CheckBox = () => {
		let current = this.state.remember
		this.setState({remember: !current})
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			if (window.localStorage.getItem("email")!=="null" && window.localStorage.getItem("pass")!=="null") {
				this.setState({email:window.localStorage.getItem("email")})
				this.setState({pass:window.localStorage.getItem("pass")})
			}
		}
	}

	render() {
		if (typeof window !== 'undefined' && this.state.remember) {
			window.localStorage.setItem("email", this.state.email)
			window.localStorage.setItem("pass", this.state.pass)
		}

		const OnSignInSubmit = () => {
			if (this.state.email === "email" || this.state.email==="" || this.state.pass==="" || this.state.pass === "pass") {
				this.setState({error: "Please fill in all the details!"})
			} else if (validator.validate(this.state.email) !== true) {
				this.setState({error: "Email format incorrect."})
			} else {
				this.SignIn()
			}
		}
		return(
			<div className={!isMobile?"w-100 shadow-3 pa2 pt0 pb4 tc bg-white ba b--light-gray Avenir ml4":""} style={{width: (isMobile) ? "100vw" : "650px"}}>
				<p className={`${(isMobile) ? "f2" : "f1"} mt5`} style={{color: "rgb(127,90,179)"}}>HelpDefeatCOVID</p>
				<p className={`${(isMobile) ? "f5" : "f4"} w-60 tc gray mt4 mb5`} style={{"margin-left":"auto", "margin-right":"auto", "font-weight":"500"}}>Please Sign In or Create an Account</p>
				<div className="tl" style={{ fontSize: (isMobile) ? 18 : 24, padding:"20px 20px", "border-radius":"15px", width:"75%", "margin-top":"20px", "margin":"auto"}}>
		            <FloatingLabelInput
		              id="email"
		              label="Email ID"
		              placeholder=""
		              value={this.state.email}
		              onChange={this.onEmailEnter}
		            />
		        </div>
		        <div className="tl" style={{ fontSize: (isMobile) ? 18 : 24, padding:"20px 20px", "border-radius":"15px", width:"75%", "margin-top":"20px", "margin":"auto"}}>
		            <FloatingLabelInput
		              id="pass"
		              label="Password"
		              placeholder=""
		              value={this.state.pass}
		              type="password"
		              onChange={this.onPassEnter}
		            />
		        </div>
				<p className="f5 b red">{this.state.error}</p>
				<p className="f5 dark-blue">{this.state.message}</p>
				<br/>
				<div className="w-100 mb5 f5 Avenir">
					<input type="checkbox" onClick={()=>this.CheckBox()} name="remember" className="pointer dib"/>
					<p className={`dib ml2 ${(isMobile) ? "mr5" : "mr6"} ${(isMobile) ? "f6" : "f5"}`}>Remember me </p>
					<p onClick={()=> navigate("/forgot-password")} className={`black underline-hover pointer dib ${(isMobile) ? "ml0" : "ml4"} ${(isMobile) ? "f6" : "f5"}`}>Forgot password?</p>
				</div>

				<p onClick={()=>OnSignInSubmit()} class={`f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ba border-box ph4 br3 ${(isMobile) ? "mr3" : "mr5"}`} style={{"margin-left":"auto"}}>
				    <span class="pr1"> Sign In </span>
				</p>
				<p onClick={()=> navigate("/register")} class={`f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ph4 ba br3 border-box ${(isMobile) ? "ml3" : "ml5"}`}>
				    <span class="pr1"> Sign Up </span>
				</p>
				<br/>
				<p onClick={()=> this.onInviteOthers()} class="f4 tc no-underline bg-animate bg-purple light-gray inline-flex pointer mb3 items-center mt4 bg-white black pa3 ph4 br3" style={{"margin-left":"auto"}}>
				    <span> {this.state.invite} </span>
				</p>
			</div>
		);
	}
}

export default SignInCard;
