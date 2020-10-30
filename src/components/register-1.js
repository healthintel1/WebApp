import React from "react"
import FloatingLabelInput from 'react-floating-label-input';
import "./register.css"
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var today = new Date()
class Register1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			age: "",
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
		this.setState({[e.target.id]: e.target.value});
		console.log(e.target.value)
	};

	onOptionClick = (e) => {
		this.setState({gender: e.target.id==='male'?1:0})
		console.log(e.target.id)
	};
	onOptionClick2 = (p, e) => {
		this.setState({[p]: e.target.id});
		console.log(p, e.target.id)
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
		let {onAccountSubmit} = this.props;

		const onSubmit = () => {
			if (this.state.age===""  || this.state.zipcode==="" || this.state.gender < 0) {
				this.setState({error: "Please enter all the required details."})
			} else {
				this.setState({error: ""});
				this.setState({message:"Loading..."});
				onAccountSubmit(this.state)
			}
		};

		return(
			<div className={`shadow-3 tl b--light-gray pb4 pt3 mb3 bg-white ba Avenir`} style={{margin:"auto", "margin-bottom":"40px","font-family":"Avenir", width: (isMobile) ? "100vw" : "700px"}}>
				<div className={`${(isMobile) ? "ph4" : "ph5"}`}>
					<p className={`ml3 mt4 gray mb3 ${(isMobile) ? "f2" : "f1"}`}>Personal Details</p>
					{/*<p className={`f6 ml3 mt2 gray mb3 ${(isMobile) ? "w-80" : "w-60"}`}>Please enter your details. Make sure your password is atleast 8 characters long and contains uppercase, lowercase, numeric and special characters.</p>*/}
					<div style={{"padding-top": '1.5em'}}>
					  <div  style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:(isMobile) ? "80%": "50%", "margin-top":"20px"}}>
			          	<p className="tl gray mb2">Date of Birth<sup className="f6 mt3 pt4">*</sup></p>
			          	<DatePicker
					        selected={this.state.date}
					        onChange={this.setStartDate}
					    />
			          </div>
			          <div className="tl mb2" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:(isMobile) ? "80%":"50%", "margin-top":"20px"}}>
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
			          </div>
						<div>
							<p className="mt3 ml2 mb1 gray gender">Race</p>
							<p onClick={(e) => this.onOptionClick2("race", e)} id={"WHITE OR CAUCASIAN"} className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.race === "WHITE OR CAUCASIAN" ? this.state.on_color : this.state.off_color, color: this.state.race === "WHITE OR CAUCASIAN" ? "white" : "gray"}}>WHITE OR CAUCASIAN</p>
							<p onClick={(e) => this.onOptionClick2("race", e)} id="BLACK OR AFRICAN AMERICAN" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.race === "BLACK OR AFRICAN AMERICAN" ? this.state.on_color : this.state.off_color, color: this.state.race === "BLACK OR AFRICAN AMERICAN" ? "white" : "gray"}}>BLACK OR AFRICAN AMERICAN</p>
							<p onClick={(e) => this.onOptionClick2("race", e)} id="ASIAN" className="f5 pointer ml2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.race === "ASIAN" ? this.state.on_color : this.state.off_color, color: this.state.race === "ASIAN" ? "white" : "gray"}}>ASIAN</p>
							<p onClick={(e) => this.onOptionClick2("race", e)} id="OTHER" className="f5 pointer ml2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.race === "OTHER" ? this.state.on_color : this.state.off_color, color: this.state.race === "OTHER" ? "white" : "gray"}}>OTHER</p>
						</div>
						<div>
							<p className="mt3 ml2 mb1 gray gender">Ethnicity</p>
							<p onClick={(e) => this.onOptionClick2("ethnicity", e)} id="NON-HISPANIC" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.ethnicity === "NON-HISPANIC" ? this.state.on_color : this.state.off_color, color: this.state.ethnicity === "NON-HISPANIC" ? "white" : "gray"}}>NON-HISPANIC</p>
							<p onClick={(e) => this.onOptionClick2("ethnicity", e)} id="HISPANIC" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.ethnicity === "HISPANIC" ? this.state.on_color : this.state.off_color, color: this.state.ethnicity === "HISPANIC" ? "white" : "gray"}}>HISPANIC</p>
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
