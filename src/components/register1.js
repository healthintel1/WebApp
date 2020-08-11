import React from "react"
import { TextField } from '@material-ui/core'
import FloatingLabelInput from 'react-floating-label-input';
import "./register.css"
import Tabs from 'react-bootstrap/Tabs'
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
var validator = require("email-validator");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()
.has().symbols()
.has().not().spaces()                           // Should not have spaces

var today = new Date()
class Register1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			pass: "",
			confpass: "",
			clientid:"",
			error: "",
			on_color: "rgb(127, 90, 179)",
			off_color: "rgb(243,245,248)",
			message:"",
			success: false,
			date: today,
		}
	}

	onTypeEnter = (e) => {
		this.setState({[e.target.id]: e.target.value});
		console.log(e.target.value)
	};

	render() {
		let {onAccountSubmit} = this.props;

		const signUp = () => {
			Auth.signUp({username: this.state.email, password: this.state.pass})
				.then((res)=>{
					console.log(res)
					this.setState({clientid: res.userSub})
					this.setState({success: true})
			})
				.catch((err) => {
					this.setState({message:""})
					this.setState({error: err.message})
				})
		};

		const onSubmit = () => {
			if (this.state.email==="" || this.state.pass!==this.state.confpass || this.state.pass === "") {
				this.setState({error: "Please enter all the required details."})
			} else if (this.state.firstname.length < 2) {
				this.setState({error: "First name must me atleast 2 character long"})
			} else if (validator.validate(this.state.email) !== true) {
				this.setState({error: "Email format incorrect"})
			} else if (schema.validate(this.state.pass) !== true) {
				this.setState({error: "Password not strong enough. Password must be atleast 8 characters long and include uppercase, lowercase, numeric and special characters."})
			} else {
				this.setState({error: ""});
				this.setState({message:"Loading..."});
				signUp()
			}
		};

		if (this.state.success) {
			onAccountSubmit(this.state)
		}
		return(
			<div className={`shadow-3 tl b--light-gray pb4 pt3 mb3 bg-white ba Avenir`} style={{margin:"auto", "margin-bottom":"40px","font-family":"Avenir", width: (isMobile) ? "100vw" : "700px"}}>
				<div className={`${(isMobile) ? "ph4" : "ph5"}`}>
					<p className={`ml3 mt4 gray mb3 ${(isMobile) ? "f2" : "f1"}`}>ACCOUNT</p>
					{/*<p className={`f6 ml3 mt2 gray mb3 ${(isMobile) ? "w-80" : "w-60"}`}>Please enter your details. Make sure your password is atleast 8 characters long and contains uppercase, lowercase, numeric and special characters.</p>*/}
					<div style={{"padding-top": '1.5em'}}>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%"}}>
			            <FloatingLabelInput
			              id="firstname"
			              label="First Name"
			              placeholder={this.state.firstname}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="lastname"
			              label="Last Name"
			              placeholder={this.state.lastname}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="email"
			              label="Email Address *"
			              type = "email"
			              placeholder={this.state.email}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="pass"
			              label="Password *"
			              type = "password"
			              placeholder="Password length atleast 8 chars"
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
					  <p className={`f6 ml3 mt2 mb3 ${(isMobile) ? "w-80" : "w-60"}`}>Minimum 8 characters with uppercase, lowercase, numeric, and special characters</p>
					  <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%", "margin-top":"20px"}}>
						<FloatingLabelInput
							id="confpass"
							label="Confirm Password *"
							type = "password"
							// placeholder="Password length atleast 8 chars"
							onChange={this.onTypeEnter}
							style={{background:"rgb(243,245,248)"}}
						/>
					  </div>
			          <p className="f5 mt4 b red tc">{this.state.error}</p>
			          <p className="f5 mt4 dark-blue tc">{this.state.message}</p>
			      </div>
		          <p onClick={onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2 ${(isMobile) ? "w-20" : "w-10"}`} style={{"margin":"auto", "margin-top":"20px"}}><span class="arrow arrow-right"></span></p>
		        </div>
			</div>
		)
	}
}

export default Register1;
