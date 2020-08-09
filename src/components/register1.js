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
		super(props)
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			pass: "",
			age: "",
			clientid:"",
			zipcode: "",
			gender: -1,
			error: "",
			on_color: "rgb(127, 90, 179)",
			off_color: "rgb(243,245,248)",
			message:"",
			success: false,
			date: today,
		}
	}

	onTypeEnter = (e) => {
		this.setState({[e.target.id]: e.target.value})
		console.log(e.target.value)
	}


	onOptionClick = (e) => {
		this.setState({gender: e.target.id==='male'?1:e.target.id==='female'?0:2})
		console.log(e.target.id)
	}

	setStartDate = (date) => {
		let y = date.getYear() + 1900
		let m = date.getMonth() + 1
		let d = date.getDate()
		if (m < 10) {
			m = `0${m}`
		}
		if (d < 10) {
			d = `0${d}`
		}
		let x = `${y}-${m}-${d}`
		console.log(x)
		this.setState({date: date})
		this.setState({age: x})
	}

	render() {
		let {onAccountSubmit} = this.props

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
		}
		const onSubmit = () => {
			if (this.state.age==="" || this.state.zipcode==="" || this.state.email==="" || this.state.pass==="") {
				this.setState({error: "Please enter all the required details."})
			} else if (validator.validate(this.state.email) !== true) {
				this.setState({error: "Email format incorrect"})
			} else if (schema.validate(this.state.pass) !== true) {
				this.setState({error: "Password not strong enough. Password must be atleast 8 characters long and include uppercase, lowercase, numeric and special characters."})
			} else {
				this.setState({error: ""})
				this.setState({message:"Loading..."})
				signUp()
			}
		}

		if (this.state.success) {
			onAccountSubmit(this.state)
		}
		return(
			<div className={`shadow-3 tl b--light-gray pb4 pt3 mb3 bg-white ba Avenir`} style={{margin:"auto", "margin-bottom":"40px","font-family":"Avenir", width: (isMobile) ? "100vw" : "700px"}}>
				<div className={`${(isMobile) ? "ph4" : "ph5"}`}>
					<p className={`ml3 mt4 gray mb3 ${(isMobile) ? "f2" : "f1"}`}>ACCOUNT</p>
					<p className={`f6 ml3 mt2 gray mb3 ${(isMobile) ? "w-80" : "w-60"}`}>Please enter your details. Make sure your password is atleast 8 characters long and contains uppercase, lowercase, numeric and special characters.</p>
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
			          <div  style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"50%", "margin-top":"20px"}}>
			          	<p className="tl gray mb2">Date of Birth<sup className="f6 mt3 pt4">*</sup></p>
			          	<DatePicker
					        selected={this.state.date}
					        onChange={this.setStartDate}
					    />
			          </div>
			          <div className="tl mb2" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"50%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="zipcode"
			              label="ZIP Code *"
			              type = "number"
			              min = "0"
			              placeholder={this.state.zipcode}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div>
			          	<p className="mt3 ml2 mb1 gray gender">Gender</p>
			          	<p onClick={this.onOptionClick} id="male" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === 1 ? this.state.on_color : this.state.off_color, color: this.state.gender === 1 ? "white" : "gray"}}>Male</p>
			          	<p onClick={this.onOptionClick} id="female" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === 0 ? this.state.on_color : this.state.off_color, color: this.state.gender === 0 ? "white" : "gray"}}>Female</p>
			          	<p onClick={this.onOptionClick} id="other" className="f5 pointer ml2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.gender === 2 ? this.state.on_color : this.state.off_color, color: this.state.gender === 2 ? "white" : "gray"}}>Prefer not to Answer</p>
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
