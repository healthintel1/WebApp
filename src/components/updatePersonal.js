import React from "react"
import FloatingLabelInput from 'react-floating-label-input';
import "./register.css"
import {navigate} from "gatsby"
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var today = new Date()

class UpdatePersonal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			on_color: "rgb(127, 90, 179)",
			off_color: "rgb(243,245,248)",
			error: "",
			date: today,
		}
	}

	onTypeEnter = (e) => {
		this.setState({[e.target.id]: e.target.value})
		console.log(e.target.value)
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

	onOptionClick = (e) => {
		this.setState({gender: e.target.id==='male'?1:e.target.id==='female'?0:2});
		console.log(e.target.id)
	}

	componentDidMount() {
		this.setState(this.props.data)
		console.log(this.props.data)
	}

	render() {
		const onSubmit = () => {
			if (this.state.age==="" || this.state.zipcode==="") {
				this.setState({error: "Please enter all the required details."})
			} else {
				this.setState({error: ""})
				navigate("/updating", {state: {data: this.state}})
			}
		}

		return(
			<div className={`shadow-3 tl b--light-gray pb4 pt3 mb3 bg-white ba Avenir`} style={{margin:"auto", "margin-bottom":"40px","font-family":"Avenir", width: (isMobile) ? "85vw" : "700px", "margin-top":"50px"}}>
				<div className={`${(isMobile) ? "ph4" : "ph5"}`}>
					<p className={`ml3 mt4 gray mb3 ${(isMobile) ? "f2" : "f1"}`}>PERSONAL INFO</p>
					<p className={`f6 ml3 mt2 gray mb3 ${(isMobile) ? "w-80" : "w-60"}`}>Please enter your details.</p>
					<div style={{"padding-top": '1.5em'}}>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%"}}>
			            <FloatingLabelInput
			              id="firstname"
			              label="First Name"
			              value={this.state.firstname}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div className="tl" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"88%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="lastname"
			              label="Last Name"
			              value={this.state.lastname}
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
			              value={this.state.zipcode}
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
		          <p onClick={onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2`} style={{"margin":"auto", "margin-top":"20px", width: (isMobile) ? "15%" : "10%"}}>✓</p>
		        </div>
			</div>
		)
	}
}

export default UpdatePersonal;
