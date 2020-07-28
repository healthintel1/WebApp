import React from "react"
import FloatingLabelInput from 'react-floating-label-input';
import "./register.css"
import {navigate} from "gatsby"
import {  
  isBrowser,
  isMobile
} from "react-device-detect";

class UpdatePersonal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			on_color: "rgb(127, 90, 179)",
			off_color: "rgb(243,245,248)",
			error: "",
		}
	}

	onTypeEnter = (e) => {
		this.setState({[e.target.id]: e.target.value})
		console.log(e.target.value)
	}

	onOptionClick = (e) => {
		this.setState({gender: e.target.id})
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
			          <div className="tl dib" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"35%", "margin-top":"20px"}}>
			            <FloatingLabelInput
			              id="age"
			              label="Age *"
			              type = "number"
			              min = "0"
			              value={this.state.age}
			              onChange={this.onTypeEnter}
			              style={{background:"rgb(243,245,248)"}}
			            />
			          </div>
			          <div className="tl dib mb2" style={{ fontSize: (isMobile) ? "16" : "20", background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"50%", "margin-top":"20px", "margin-left":"15px"}}>
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
			          	<p onClick={this.onOptionClick} id="male" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === "male" ? this.state.on_color : this.state.off_color, color: this.state.gender === "male" ? "white" : "gray"}}>Male</p>
			          	<p onClick={this.onOptionClick} id="female" className="f5 pointer mt2 ml2 br2 ph4 pv3 mb0 dib" style={{background: this.state.gender === "female" ? this.state.on_color : this.state.off_color, color: this.state.gender === "female" ? "white" : "gray"}}>Female</p>
			          	<p onClick={this.onOptionClick} id="other" className="f5 pointer ml2 mt2 br2 ph3 pv3 mb0 dib" style={{background: this.state.gender === "other" ? this.state.on_color : this.state.off_color, color: this.state.gender === "other" ? "white" : "gray"}}>Prefer not to Answer</p>
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