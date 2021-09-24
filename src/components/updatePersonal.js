import React from "react"
import FloatingLabelInput from 'react-floating-label-input';
import "./register.css"
import {navigate} from "gatsby"
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
		this.setState({gender: e.target.id==='male'?1:0});
		console.log(e.target.id)
	}

	onOptionClick2 = (p, e) => {
		this.setState({[p]: e.target.id});
		console.log(p, e.target.id)
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
			<div className={`tl b--light-gray pb4 pt3 mb3 bg-white ba Avenir minw`} style={{margin:"auto", "marginBottom":"40px","fontFamily":"Avenir"}}>
				<div className={`ph4`}>
					<p className={`mt4 gray mb3 f3`}>PERSONAL INFO</p>
					<p className={`f6 gray mb3`}>Please enter your details.</p>
					<div style={{"padding-top": '1.5em'}}>
			          <div className="tl" style={{ fontSize: "1.1rem", padding:"20px 0px"}}>
			            <FloatingLabelInput
			              id="firstname"
			              label="First Name"
			              value={this.state.firstname}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
						<div className="tl" style={{ fontSize: "1.1rem", padding:"20px 0px"}}>
			            <FloatingLabelInput
			              id="lastname"
			              label="Last Name"
			              value={this.state.lastname}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
						<div className="tl" style={{ fontSize: "1.1rem", padding:"20px 0px"}}>
			          	<p className="tl gray mb2">Date of Birth<sup className="f6 mt3 pt4">*</sup></p>
			          	<DatePicker
					        selected={this.state.date}
					        onChange={this.setStartDate}
					    />
			          </div>
						<div className="tl mt2" style={{ fontSize: "1.1rem", padding:"20px 0px"}}>
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
			          	<p className="mt3 mb1 gray gender">Gender</p>
			          	<p onClick={this.onOptionClick} id="male" className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === 1 ? this.state.on_color : this.state.off_color, color: this.state.gender === 1 ? "white" : "gray"}}>Male</p>
			          	<p onClick={this.onOptionClick} id="female" className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === 0 ? this.state.on_color : this.state.off_color, color: this.state.gender === 0 ? "white" : "gray"}}>Female</p>
			          </div>
					  <div>
						<p className="mt3 mb1 gray gender">Race</p>
						<p onClick={(e) => this.onOptionClick2("city", e)} id={"WHITE OR CAUCASIAN"} className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.city === "WHITE OR CAUCASIAN" ? this.state.on_color : this.state.off_color, color: this.state.city === "WHITE OR CAUCASIAN" ? "white" : "gray"}}>WHITE OR CAUCASIAN</p>
						<p onClick={(e) => this.onOptionClick2("city", e)} id="BLACK OR AFRICAN AMERICAN" className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.city === "BLACK OR AFRICAN AMERICAN" ? this.state.on_color : this.state.off_color, color: this.state.city === "BLACK OR AFRICAN AMERICAN" ? "white" : "gray"}}>BLACK OR AFRICAN AMERICAN</p>
						<p onClick={(e) => this.onOptionClick2("city", e)} id="ASIAN" className="f5 pointer mr2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.city === "ASIAN" ? this.state.on_color : this.state.off_color, color: this.state.city === "ASIAN" ? "white" : "gray"}}>ASIAN</p>
						  <p onClick={(e) => this.onOptionClick2("city", e)} id="OTHER" className="f5 pointer mr2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.city === "OTHER" ? this.state.on_color : this.state.off_color, color: this.state.city === "OTHER" ? "white" : "gray"}}>OTHER</p>
					  </div>
					  <div>
						<p className="mt3 mb1 gray gender">Ethnicity</p>
						<p onClick={(e) => this.onOptionClick2("country", e)} id="NON-HISPANIC" className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.country === "NON-HISPANIC" ? this.state.on_color : this.state.off_color, color: this.state.country === "NON-HISPANIC" ? "white" : "gray"}}>NON-HISPANIC</p>
						<p onClick={(e) => this.onOptionClick2("country", e)} id="HISPANIC" className="f5 pointer mt2 mr2 br2 ph4 pv3 mb0 dib" style={{background: this.state.country === "HISPANIC" ? this.state.on_color : this.state.off_color, color: this.state.country === "HISPANIC" ? "white" : "gray"}}>HISPANIC</p>
					  </div>
			          <p className="f5 mt4 b red tc">{this.state.error}</p>
			          <p className="f5 mt4 dark-blue tc">{this.state.message}</p>
			      </div>
		          <p onClick={onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2 wtick`} style={{"margin":"auto", "marginTop":"20px"}}>✓</p>
		        </div>
			</div>
		)
	}
}

export default UpdatePersonal;
