import React from "react";
import "./transition.css"
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class PersonalForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			travel: "",
			risk_person: "",
			known_found: "",
			happy: "",
			// picture:'UPLOAD IMAGE',
			video:'',
			error_message:"",
			on_color: "rgb(127, 90, 179)",
			visible: "",
			bg:"white",
			message:"",
			vitals: "",
			symptoms:"",
			personal:"",
			// imagename:"",
			// imageurl:"",
		}
	}

	onOptionClick = (e) => {
		this.setState({[e.target.name]: e.target.id})
		console.log(this.state)

	}

	componentDidMount() {
		this.setState({message:""})
		this.setState({vitals: this.props.vitals})
		this.setState({symptoms: this.props.symptoms})
		this.setState({personal: this.props.personal})
		setTimeout(()=>{this.setState({visible: true})}, 25)
		let x = this.props.data
		console.log(x)
		console.log("loading data")
		this.setState({travel: x.traveltoday.toString()})
		this.setState({risk_person: x.exposed.toString()})
		this.setState({known_found: x.foundanyone.toString()})
		this.setState({happy: x.feeling.toString()})
		// this.setState({picture: (x.pic === "")?"UPLOAD IMAGE":x.pic})
		// this.setState({imagename: x.pic})
		// let imagenamed = `${this.props.clientid}/${this.props.Dated}-${this.props.Month}`
		// Storage.get(imagenamed)
	    //   			.then(result => {
	    //   				console.log(result)
	    //   				this.setState({imageurl:result})
	    //   			})
	    //   			.catch(err => console.log(err))

	}

	updateSentData = () => {
		let senddata = {
			traveltoday: (this.state.travel==="true"),
			exposed: (this.state.risk_person==="true"),
			foundanyone: (this.state.known_found==="true"),
			feeling: (this.state.happy==="true"),
			// pic: this.state.imagename,
			clientid: this.props.clientid,
			date: `${this.props.Dated}/${this.props.Month}`
		}
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
		        body: JSON.stringify(senddata)
		    };
		fetch('https://cors-anywhere.herokuapp.com/https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/updatevitals3?', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})},100)
				setTimeout(()=>{this.props.onPersonalUpdate(this.state)},500)
				setTimeout(()=>{this.props.refreshCalendar()},500)
	        })
	        .catch(err=>{
	        	this.setState({message:""})
	        	this.setState({error_message: "An error occured. Please try again."})
	        })
	}

	sendData = () => {
		let senddata = {
			traveltoday: (this.state.travel==="true"),
			exposed: (this.state.risk_person==="true"),
			foundanyone: (this.state.known_found==="true"),
			feeling: (this.state.happy==="true"),
			// pic: this.state.picture,
			clientid: this.props.clientid,
			date: `${this.props.Dated}/${this.props.Month}`
		}
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
		        body: JSON.stringify(senddata)
		    };
		fetch('https://cors-anywhere.herokuapp.com/https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/postvitals?', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})},100)
	        	setTimeout(()=>{this.props.refreshCalendar()},500)
				setTimeout(()=>{this.props.onPersonalUpdate(this.state)},500)
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
		let {onPersonalUpdate, Dated, Month}=this.props
		// const onChange = (e) => {
		//   this.setState({error_message: ""})
	    //   let file = e.target.files[0];
	    //   this.setState({picture: "UPLOADING..."})
	    //   let imagenamed = `${this.props.clientid}/${this.props.Dated}-${this.props.Month}`
	    //   Storage.put(imagenamed, file, {
	    //       contentType: 'image/png',
	    //   })
	    //   	.then (result => {
	    //   		this.setState({picture: file.name})
	    //   		this.setState({imagename: imagenamed})
	    //   		Storage.get(imagenamed)
	    //   			.then(result => {
	    //   				console.log(result)
	    //   				this.setState({imageurl:result})
	    //   			})
	    //   			.catch(err => console.log(err))
	    //   	})
	    //   	.catch(err => {
	    //   		this.setState({picture: "UPLOAD IMAGE"})
	    //   		this.setState({error_message: "Wrong format. Please try again"})
	    //   	});
	    // }

	    const onClick = () => {
	    	if (this.state.travel==="" || this.state.risk_person==="" || this.state.known_found === "" || this.state.happy === "") {
	    		this.setState({error_message:"Please enter all details."})
	    	// } else if (this.state.picture === "UPLOADING...") {
	    	// 	this.setState({error_message:"Please wait while the image is being uploaded."})
	    	} else {
	    		this.setState({error_message: ""})
				this.setState({bg: "rgb(136, 242, 216)"})
				this.setState({message:"Please wait..."})
				if (this.state.vitals === 0 && this.state.symptoms === 0 && this.state.personal === 0) {
					this.sendData()
				} else {
					this.updateSentData()
				}
	    	}
	    }

		return(
			<div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
				<div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
			        <div className="w-100 bb mb4 bw1 b--light-gray">
	            	  <p className={`f5 ${(isMobile)?"ml4":"ml5"} mb3 mt3 light-red dib`}>PERSONAL</p>
	            	  <p className={`f5 gray mb3 dib ${(isMobile)?"ml6":"ml7"}`}>{monthNames[Month-1]} {Dated}</p>
	        	    </div>
	        	    <BrowserView>
		        	    <div className="ma1">
					        <p className="mt3 ml5 b mb1 gray gender">DID YOU TRAVEL TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="travel" className="f6 ml5 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.travel === "true" ? this.state.on_color : "white", color: this.state.travel === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="travel" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.travel === "false" ? this.state.on_color : "white", color: this.state.travel === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1">
					        <p className="mt3 ml5 b mb1 gray gender">WERE YOU EXPOSED TO A HIGH-RISK PERSON TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="risk_person" className="f6 ml5 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.risk_person === "true" ? this.state.on_color : "white", color: this.state.risk_person === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="risk_person" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.risk_person === "false" ? this.state.on_color : "white", color: this.state.risk_person === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1">
					        <p className="mt3 ml5 b mb1 gray gender">WAS ANYONE YOU KNOW FOUND TO BE COVID POSITIVE?</p>
					      	<a onClick={this.onOptionClick} id="true" name="known_found" className="f6 ml5 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.known_found === "true" ? this.state.on_color : "white", color: this.state.known_found === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="known_found" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.known_found === "false" ? this.state.on_color : "white", color: this.state.known_found === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1">
					        <p className="mt3 ml5 b mb1 gray gender">HOW ARE FEELING TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="happy" className="ml5 mb3 mt1 dark-gray pointer ph3 pv2 dib" style={{"font-size": (this.state.happy === "true") ? "44px" : "40px", opacity: (this.state.happy === "true") ? "1" : "0.5"}}>😃</a>
					        <a onClick={this.onOptionClick} id="false" name="happy" className="ml2 mb3 mt1 dark-gray pointer ph3 pv2 dib" style={{"font-size": (this.state.happy === "false") ? "44px" : "40px", opacity: (this.state.happy === "false") ? "1" : "0.5"}}>🙁</a>
				    	</div>
				    	{/*<div className="ma1">*/}
					    {/*    <p className="mt3 ml5 b mb1 gray gender">IMPORT PICTURE</p>*/}
					    {/*  	<p onClick={()=>document.getElementById('hiddenInputButton').click()} className="pointer ml5 mt3 pt4 ph3 f6 b gray bg-washed-blue w-30" style={{height:"150px", "padding-top":"60px", "background":"rgb(243,245,248)"}}>{this.state.picture}</p>*/}
					    {/*  	<input id="hiddenInputButton" onChange={onChange} label="" placeholder="" type="file" style={{display:"none"}}/>*/}
				    	{/*</div>*/}
				    	{/*<img className="ml5 mt0 ba bw1 b--light-gray pa2" style={{"maxWidth":"50%"}} src={this.state.imageurl}/>*/}
				    	<p className="f5 mt4 b red tc">{this.state.error_message}</p>
				    	<p className="f5 mt4 dark-blue tc">{this.state.message}</p>
				    	<div className="mt4 mb3">
				          <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"10%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
				        </div>
				    </BrowserView>
				    <MobileView>
				    	<div className="ma1">
					        <p className="mt3 ml4 f5 b mb1 gray gender">DID YOU TRAVEL TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="travel" className="f6 ml4 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.travel === "true" ? this.state.on_color : "white", color: this.state.travel === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="travel" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.travel === "false" ? this.state.on_color : "white", color: this.state.travel === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1 w-70">
					        <p className="mt3 ml4 f5 b mb1 gray gender">WERE YOU EXPOSED TO A HIGH-RISK PERSON TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="risk_person" className="f6 ml4 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.risk_person === "true" ? this.state.on_color : "white", color: this.state.risk_person === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="risk_person" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.risk_person === "false" ? this.state.on_color : "white", color: this.state.risk_person === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1 w-70">
					        <p className="mt3 ml4 f5 b mb1 gray gender">WAS ANYONE YOU KNOW FOUND TO BE COVID POSITIVE?</p>
					      	<a onClick={this.onOptionClick} id="true" name="known_found" className="f6 ml4 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.known_found === "true" ? this.state.on_color : "white", color: this.state.known_found === "true" ? "white" : "black"}}>YES</a>
					        <a onClick={this.onOptionClick} id="false" name="known_found" className="f6 ml2 shadow-2 mb3 mt3 dark-gray pointer ph3 pv2 dib" style={{background: this.state.known_found === "false" ? this.state.on_color : "white", color: this.state.known_found === "false" ? "white" : "black"}}>NO</a>
				    	</div>
				    	<div className="ma1 w-70">
					        <p className="mt3 ml4 b f5 mb1 gray gender">HOW ARE FEELING TODAY?</p>
					      	<a onClick={this.onOptionClick} id="true" name="happy" className="ml4 mb3 mt1 dark-gray pointer ph3 pv2 dib" style={{"font-size": this.state.happy === "true" ? "44px" : "40px", opacity: (this.state.happy === "true") ? "1" : "0.5"}}>😃</a>
					        <a onClick={this.onOptionClick} id="false" name="happy" className="ml2 mb3 mt1 dark-gray pointer ph3 pv2 dib" style={{"font-size": this.state.happy === "false" ? "44px" : "40px", opacity: (this.state.happy === "false") ? "1" : "0.5"}}>🙁</a>
				    	</div>
				    	{/*<div className="ma1 w-70">*/}
					    {/*    <p className="mt3 ml4 f5 b mb1 gray gender">IMPORT PICTURE</p>*/}
					    {/*  	<p onClick={()=>document.getElementById('hiddenInputButton').click()} className="pointer ml4 mt3 pt4 ph3 f6 b gray bg-washed-blue w-60" style={{height:"150px", "padding-top":"60px", "background":"rgb(243,245,248)"}}>{this.state.picture}</p>*/}
					    {/*  	<input id="hiddenInputButton" onChange={onChange} label="" placeholder="" type="file" style={{display:"none"}}/>*/}
				    	{/*</div>*/}
				    	<p className="f6 mt4 dark-blue tc">{this.state.error_message}</p>
				    	<p className="f6 mt4 dark-blue tc">{this.state.message}</p>
				    	<div className="mt4 mb3">
				          <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"15%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
				        </div>
				    </MobileView>
			    </div>
		    </div>

		)
	}
}

export default PersonalForm;
