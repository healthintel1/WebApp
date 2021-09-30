import React from "react"
import "./register.css"
import copy from 'copy-to-clipboard';
import {navigate} from "gatsby"
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
		copy('Predict your risk from Chronic and Infectious Diseases using Acme Inc. powered by HealthIntel. Visit Now @ https://www.acne.com');
		this.setState({invite: "Link Copied"})
	};

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
			<div className={"tc bg-white Avenir mobV"}>
				{/*<p className={`ff mt5`} style={{color: "rgb(127,90,179)"}}>Acme Inc.</p>*/}
				<img className={`ff mt5`} height={70} src={require("../images/logo.png")}></img>
				<p className={`f5 w-80 tc gray mt4 mb4`} style={{"marginLeft":"auto", "marginRight":"auto", "fontWeight":"500"}}>Sign-in if you are an authorized Acme Inc. powered by HealthIntel Pilot User</p>
				<div className="tl ww75" style={{ "borderRadius":"15px"}}>
		            <FloatingLabelInput
		              id="email"
		              label="Email ID"
		              placeholder=""
		              value={this.state.email}
		              onChange={this.onEmailEnter}
		            />
		        </div>
		        <div className="tl ww75" style={{ "borderRadius":"15px"}}>
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
				<div className="mb4 flex f5 Avenir ww75" style={{justifyContent:"space-between", marginTop:0, marginBottom:0}}>
					<div>
						<input type="checkbox" onClick={()=>this.CheckBox()} name="remember" className="pointer dib"/>
						<p className={`dib ml2 f5}`}>Remember me </p>
					</div>
					<p onClick={()=> navigate("/forgot-password")} className={`black underline-hover pointer dib f5`}>Forgot password?</p>
				</div>

				<p onClick={()=>OnSignInSubmit()} className={`f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ba border-box ph4 br3 mr3`} style={{"margin":"auto"}}>
				    <span style={{marginRight: 0}}> Sign In </span>
				</p>
				<br/>
				<br/>
				<p style={{marginTop:10}}>
					<span>For use of authorized Acme Inc. powered by HealthIntel Pilot participants only</span>
				</p>
			</div>
		);
	}
}

export default SignInCard;
