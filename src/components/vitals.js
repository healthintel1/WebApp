import React from "react";
import "./transition.css"
import {isBrowser, isTablet} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"
import { CORSDOMAIN } from './constant'

class VitalForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vitals: "",
			symptoms:"",
			personal:"",
			fever: "",
			temp: "",
			temptype: false,
			heart: "",
			heart_rate: "",
			oxygen: "",
			respiratoryrate: "39",
			bp: "90/120",
			error_message:"",
			bg: "white",
			visible: "",
			message:"",
		}
	}

	onTypeEnter = (e) => {
		let x = e.target.value;
		// x = x.toLowerCase()
		console.log(x, typeof x, e.target.id);
		this.setState({[e.target.id]: x})
	};

	componentDidMount() {
		this.setState({message:""})
		this.setState({vitals: this.props.vitals})
		this.setState({symptoms: this.props.symptoms})
		this.setState({personal: this.props.personal})
		console.log(this.props)
		setTimeout(()=>{this.setState({visible: true})}, 25)
		let x = this.props.data
		console.log("loading data")
		console.log(x)
		this.setState({temp: x.bodytemperature})
		this.setState({respiratoryrate: x.respiratoryrate})
		this.setState({temptype: x.temptype})
		// this.setState({bp: x.bloodpressure1})
		this.setState({heart_rate: x.heartrate})
		this.setState({heart: x.heartratefeeling})
		this.setState({oxygen: x.oxygensaturation})
	}

	sendData = () => {
		let senddata = {
			clientid: this.props.clientid,
			respiratoryrate: parseFloat(this.state.respiratoryrate),
			date: `${this.props.Dated}/${this.props.Month}`,
			heartratefeeling: this.state.heart,
            heartrate: parseFloat(this.state.heart_rate),
            // bloodpressure1: this.state.bp,
            oxygensaturation: parseFloat(this.state.oxygen),
            bodytemperature: parseFloat(this.state.temp),
			temptype: this.state.temptype,
		}
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*", "accept":"*" },
		        body: JSON.stringify(senddata)
		    };
		fetch(CORSDOMAIN+'/postvitals', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})},100)
				setTimeout(()=>{this.props.onVitalsUpdate(this.state)},500)
				setTimeout(()=>{this.props.refreshCalendar()},500)
	        })
	        .catch(err=>{
	        	this.setState({message:""})
	        	this.setState({error_message: "An error occured. Please try again."})
	        })
	}

	updateSentData = () => {
		let senddata = {
			clientid: this.props.clientid,
			date: `${this.props.Dated}/${this.props.Month}`,
			respiratoryrate: parseFloat(this.state.respiratoryrate),
			heartratefeeling: this.state.heart,
            heartrate: parseFloat(this.state.heart_rate),
            // bloodpressure1: this.state.bp,
            oxygensaturation: parseFloat(this.state.oxygen),
            bodytemperature: parseFloat(this.state.temp),
			temptype: this.state.temptype,
		}
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*", "accept":"*" },
		        body: JSON.stringify(senddata)
		    };
		fetch(CORSDOMAIN+'/updatevitals1', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})},100)
				setTimeout(()=>{this.props.onVitalsUpdate(this.state)},500)
				setTimeout(()=>{this.props.refreshCalendar()},500)
	        })
	        .catch(err=>{
	        	this.setState({message:""})
	        	this.setState({error_message: "An error occured. Please try again."})
	        })

	}


	render() {
		const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
		let {onVitalsUpdate, Dated, Month} = this.props;
		const onClick = (e) => {
			console.log(this.state);
			if (this.state.temp ==="" || this.state.heart_rate === "") {
				this.setState({error_message: "Please fill all the details correctly."})
			} else if (this.state.temptype && (this.state.temp < 31 || this.state.temp > 40)) {
				this.setState({error_message: "Tempratre value is out of range. Please enter valid value in CELSIUS."})
			} else if (!this.state.temptype && (this.state.temp < 90 || this.state.temp > 110)) {
				this.setState({error_message: "Tempratre value is out of range. Please enter valid value in FAHRENHEIT."})
			} else if ((this.state.heart_rate < 20 || this.state.heart_rate > 150)) {
				this.setState({error_message: "Please enter a valid value for Heart Rate"})
			} else if (this.state.oxygen !== "" && (this.state.oxygen < 60 || this.state.oxygen > 150)) {
				this.setState({error_message: "Oxygen saturation value is out of range. Please enter valid value."})
			} else if (this.state.oxygen !== "" && (this.state.oxygen < 60 || this.state.oxygen > 150)) {
				this.setState({error_message: "Oxygen saturation value is out of range. Please enter valid value."})
			} else {
				this.setState({error_message: ""});
				this.setState({message: "Please wait..."});
				this.setState({bg: "rgb(136, 242, 216)"});
				if (this.state.vitals === 0 && this.state.symptoms === 0 && this.state.personal === 0) {
					this.sendData()
				} else {
					this.updateSentData()
				}

			}
		};
		return(
			<div>
				{ <BrowserView>
					<div className={`w-100 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
						<div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
							<div className="w-100 bb mb4 bw1 b--light-gray">
			            	  <p className="f5 ml5 mt3 mb3 light-red dib">DAILY VITALS</p>
			            	  <p className="f5 gray mb3 dib ml7">{monthNames[Month-1]} {Dated}</p>
			        	    </div>
					    	<div className="mt2 mb2">
						        <p className="mt3 ml5 b pa0 mb0 gray gender">TEMPERATURE:</p>
						        <div style={{display: "flex"}}>
						        	<input id="temp" onChange={this.onTypeEnter} value={this.state.temp||""} type="number" min="0" className="mt3 ml5 mr2 bg-washed-green tc" style={{"height":"50px", "width":"15%","border":"none"}}/>
									<select onChange={(event) => {
										if (event.target.value === "degree"){
											this.setState({temptype: true})
										} else {
											this.setState({temptype: false})
										}
									}} id="temptype" defaultValue={this.state.temptype ? "degree" : "ferh"} name="temptype" className="mt3" style={{borderColor: "#eee", color: "#777", borderWidth: 0.5, padding: "0 10px"}}>
										<option style={{color: "#777"}} value="ferh"> ° F</option>
										<option style={{color: "#777"}} value="degree"> ° C</option>
									</select>
						        </div>
						    </div>
{/*// 						    <div className="mv2">*/}
{/*// 						        <p className="mt4 ml5 b pa0 mb0 gray gender">HOW DOES YOUR HEART RATE FEEL?</p>*/}
{/*// 						        <input id="heart" onChange={this.onTypeEnter} value={this.state.heart} type="text" placeholder="Give us a short description" className="mt3 ml5 mr2 bg-washed-green ph2" style={{"height":"50px", "width":"40%","border":"none"}}/>*/}
{/*// 						    </div>*/}
						    <div style={{"display":"flex"}}>
							    <div className="mv2">
							        <p className="mt4 ml5 b pa0 mb0 gray gender">HEART RATE</p>
							        <div style={{display: "flex"}}>
							        	<input id="heart_rate" onChange={this.onTypeEnter} value={this.state.heart_rate||""} type="number" min="0" className="mt3 ml5 mr2 bg-washed-green tc" style={{"height":"50px", "width":"30%","border":"none"}}/>
							            <p className="mt4 f6 b ml2 gray">BPM </p>
							        </div>
							    </div>
							    {/*<div className="mv2">*/}
							    {/*    <p className="mt4 ml5 b pa0 mb0 gray gender">BLOOD PRESSURE</p>*/}
							    {/*    <div style={{display: "flex"}}>*/}
							    {/*    	<input id="bp" onChange={this.onTypeEnter} value={this.state.bp} type="text" className="mt3 ml5 mr2 bg-washed-green tc" style={{"height":"50px", "width":"30%","border":"none"}}/>*/}
							    {/*        <p className="mt4 f6 b ml2 gray">UNITS </p>*/}
							    {/*    </div>*/}
							    {/*</div>*/}
						    </div>
						    <div className="mt2 mb2">
						        <p className="mt3 ml5 b pa0 mb0 gray gender">OXYGEN SATURATION</p>
						        <div style={{display: "flex"}}>
						        	<input id="oxygen" onChange={this.onTypeEnter} value={this.state.oxygen||""} type="number" min="0" className="mt3 ml5 mr2 bg-washed-green tc" style={{"height":"50px", "width":"15%","border":"none"}}/>
						            <p className="mt4 f6 b ml2 gray">%</p>
						        </div>
						    </div>
							<div className="mt2 mb2">
							    <p className="mt3 ml5 b pa0 mb0 gray gender">DEVICE USED</p>
							    <div style={{display: "flex"}}>
							    	<input id="heart" onChange={this.onTypeEnter} value={this.state.heart||""} className="mt3 ml5 mr2 bg-washed-green tc" style={{"height":"50px", "width":"40%","border":"none"}}/>
							    </div>
							</div>
						    <p className="f5 mt4 b red tc">{this.state.error_message}</p>
						    <p className="f5 mt4 dark-blue tc">{this.state.message}</p>
						    <div className="mt5 mb3">
					          <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"10%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
					        </div>
							<p className="f5 mt4 gray" style={{padding: "0 20px"}}>Acme Inc. powered by HealthIntel.ai software requires that the vitals data of temperature, heart rate, and oxygen saturation entered by the users for analysis are being read off of medical device(s) that are FDA Registered for their intended use.
							</p>
							<p className="f5 mt4 gray" style={{padding: "0 20px"}}>If you do not know whether the device you are using is a medical device registered by FDA for use to collect the requested data, or if you do not have access to these devices, please contact Acme Inc. powered by HealthIntel.ai for a list of medical devices that you can use.
							</p>
						</div>
					</div>
				</BrowserView>}
				{ <MobileView>
					<div className={`w-100 mb3 pb2 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
						<div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
							<div className="w-100 bb mb4 bw1 b--light-gray">
			            	  <p className="f5 ml3 mb3 mt3 light-red dib">DAILY VITALS</p>
			            	  <p className="f5 gray mb3 dib ml6">{monthNames[Month-1]} {Dated}</p>
			        	    </div>
					    	<div className="mt2 mb2 pa1">
						        <p className="mt3 ml3 b f5 w-70 pa0 mb0 gray gender">WHAT IS YOUR TEMPERATURE?</p>
						        <div style={{display: "flex"}}>
						        	<input id="temp" value={this.state.temp||""} onChange={this.onTypeEnter} type="number" min="0" className="mt3 ml3 mr2 bg-washed-green tc" style={{"height":"50px", "width":"25%","border":"none"}}/>
									<select onChange={(event) => {
										if (event.target.value === "degree"){
											this.setState({temptype: true})
										} else {
											this.setState({temptype: false})
										}
									}} id="temptype" name="temptype" className="mt3" style={{borderColor: "#777", color: "#777", borderWidth: 0.5}}>
										<option style={{color: "#777"}} value="degree"> ° C</option>
										<option style={{color: "#777"}} value="ferh"> ° F</option>
									</select>
						        </div>
						    </div>
							<div className="mv2 pa1">
						        <p className="mt4 ml3 f5 b pa0 mb0 gray gender">HEART RATE</p>
						        <div style={{display: "flex"}}>
						        	<input id="heart_rate" value={this.state.heart_rate||""} onChange={this.onTypeEnter} type="number" min="0" className="mt3 ml3 mr2 bg-washed-green tc" style={{"height":"50px", "width":"30%","border":"none"}}/>
						            <p className="mt4 f6 b ml2 gray">BPM </p>
						        </div>
						    </div>
						    <div className="mt2 mb2 pa1">
						        <p className="mt3 f5 ml3 b pa0 mb0 gray gender">OXYGEN SATURATION</p>
						        <div style={{display: "flex"}}>
						        	<input id="oxygen" value={this.state.oxygen||""} onChange={this.onTypeEnter} type="number" min="0" className="mt3 ml3 mr2 bg-washed-green tc" style={{"height":"50px", "width":"30%","border":"none"}}/>
						            <p className="mt4 f6 b ml2 gray">% </p>
						        </div>
						    </div>
							<div className="mv2 pa1">
							    <p className="mt4 f5 ml3 b pa0 mb0 gray gender">DEVICE USED</p>
							    <div style={{display: "flex"}}>
							    	<input id="heart" value={this.state.heart||""} onChange={this.onTypeEnter} className="mt3 ml3 mr2 bg-washed-green tc" style={{"height":"50px", "width":"40%","border":"none"}}/>
							    </div>
							</div>
						    <p className="f5 mt4 b red tc">{this.state.error_message}</p>
						    <p className="f5 mt1 dark-blue tc">{this.state.message}</p>
						    <div className="mt5 mb3">
					          <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"15%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
					        </div>
							<p className="f5 mt1 gray" style={{padding: "0 20px"}}>HealthIntel.ai software requires that the vitals data of temperature, heart rate, and oxygen saturation entered by the users for analysis are being read off of medical device(s) that are FDA Registered for their intended use.
							</p>
							<p className="f5 mt1 gray" style={{padding: "0 20px"}}>If you do not know whether the device you are using is a medical device registered by FDA for use to collect the requested data, or if you do not have access to these devices, please contact HealthIntel.ai for a list of medical devices that you can use.
							</p>
						</div>
					</div>
				</MobileView>}
			</div>
		)
	}
}

export default VitalForm;
