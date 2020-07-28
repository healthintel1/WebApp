import React from "react"
import { BrowserView, MobileView } from "react-device-detect";
import { navigate } from "gatsby"
import Navbar from "../components/Navbar.js"
import List from "../components/list.js"
import GettingStarted from "../components/gs.js"
import Waiting from "../components/waiting.js"
import Table from "../components/table.js"
import BackButton from "../components/backbutton.js"
import Prediction from "../components/prediction.js"
import PersonalForm from "../components/personal.js"
import VitalForm from "../components/vitals.js"
import SymptomsForm from "../components/symptoms.js"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

var today = new Date()
var today_date = today.getDate()
var today_month = today.getMonth() + 1
var finaldate = `${today_date}/${today_month}`
class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.child = React.createRef()
		this.state = {
			path:"",
			prevroute:"",
			day: today_date,
			month: today_month,
			date: finaldate,
			route: "gs",
			symptoms: 0,
			vitals: 0,
			personal: 0,
			daily_sym: {
				fever2:"",
				chillsorsweating: "",
				coughing: "",
				difficultybreathing: "",
				sorethroat: "",
				bodyaches: "",
				headache:"",
				vomiting: "",
				diarrhea: "",
				fatiguetiredness: "",
				none9:"",
			},
			vitals_data: {
				heartratefeeling: "",
				heartrate: "",
				bloodpressure1: "",
				oxygensaturation: "",
				bodytemperature: "",
				temptype: true,
				fever1: "",
			},
			personal_data: {
				traveltoday:"",
				exposed:"",
				foundanyone:"",
				feeling:"",
				// pic:"",
			},
			clientid: "",
			data:"",
			graphdata:"",
		}
	}

	onRouteChange = async (route) => {
		await this.setState({prevroute: this.state.route})
		this.setState({route: route})
		console.log(this.state)
	}

	changeGraphData = (data) => {
		this.setState({graphdata: data})
	}

	vitalDone = () => {
		this.setState({vitals: 1})
	}

	personalDone = () => {
		this.setState({personal: 1})
	}

	symptomsDone = () => {
		this.setState({symptoms: 1})
	}

	onDailyUpdate = (input) => {
		this.setState({daily_sym: {
			fever2: input.fever,
			chillsorsweating: input.chills,
			coughing: input.cough,
			difficultybreathing: input.breath,
			sorethroat: input.throat,
			bodyaches: input.bodyache,
			headache: input.headache,
			vomiting: input.vomit,
			diarrhea: input.diarrhea,
			fatiguetiredness: input.fatigue,
			none9: input.nota,
		}})
		console.log(this.state)
		this.setState({symptoms: 1})
		if (this.state.vitals==1 && this.state.personal==1) {
			this.setState({route:"wait"})
		} else {
			this.onRouteChange("vitals")
		}
	}

	onVitalsUpdate = (input) => {
		this.setState({vitals: 1})
		this.setState({vitals_data: {
			bodytemperature: input.temp,
			temptype: input.temptype,
			bloodpressure1: input.bp,
			heartratefeeling: input.heart,
			heartrate: input.heart_rate,
			oxygensaturation: input.oxygen,
			fever1: input.fever,
		}})
		console.log(this.state)
		this.onRouteChange("wait")
	}


	onPersonalUpdate = (input) => {
		this.setState({personal:1})
		this.setState({personal_data: {
			traveltoday: (input.travel==="true"),
			foundanyone: (input.known_found==="true"),
			exposed: (input.risk_person==="true"),
			// pic: input.picture,
			feeling: (input.happy==="true"),
		}})
		console.log(this.state)
		if (this.state.symptoms==1 && this.state.vitals==1) {
			this.setState({route:"wait"})
		} else {
			this.onRouteChange("symptoms")
		}
	}

	getDatabyDate = (date) => {
		let clientid = this.state.clientid
		async function GetData() {
			let response = await fetch(`https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/getvitals?client_id=${clientid}&&date=${date}`)
			response = response.json()
			return response
		}
		GetData()
				.then(res=> {
					console.log(`data recieved for date + ${date}`)
					console.log(res)
					this.setState({daily_sym: {
						fever2: res.fever2,
						chillsorsweating: res.chillsorsweating,
						coughing: res.coughing,
						difficultybreathing: res.difficultybreathing,
						sorethroat: res.sorethroat,
						bodyaches: res.bodyaches,
						headache: res.headache,
						vomiting: res.vomiting,
						diarrhea: res.diarrhea,
						fatiguetiredness: res.fatiguetiredness,
						none9: res.none9,
					}})
					this.setState({vitals_data: {
						bodytemperature: res.bodytemperature,
						temptype: res.temptype,
						bloodpressure1: res.bloodpressure1,
						heartratefeeling: res.heartratefeeling,
						heartrate: res.heartrate,
						oxygensaturation: res.oxygensaturation,
						fever1: res.fever1,
					}})
					this.setState({personal_data: {
						traveltoday: res.traveltoday,
						foundanyone: res.foundanyone,
						exposed: res.exposed,
						// pic: res.pic,
						feeling: res.feeling,
					}})
				})
				.catch(err => console.log(err))
	}

	onDateChange = (newdate, newmonth) => {
		let changeddate = `${newdate}/${newmonth}`
		this.setState({day: newdate})
		this.setState({month: newmonth})
		this.setState({date: changeddate})
		this.setState({route: "gs"})
		this.setState({vitals: 0})
		this.setState({symptoms: 0})
		this.setState({personal: 0})
		this.getDatabyDate(changeddate)
	}

	componentDidMount() {
		this.setState({path: this.props.location.pathname})
		Auth.currentAuthenticatedUser()
			.then(res => {
				this.setState({clientid: res.username})
				this.refreshCalendar()
				async function GetData() {
					let response = await fetch(`https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/getvitals?client_id=${res.username}&&date=${finaldate}`)
					response = response.json()
					return response
				}
				GetData()
					.then(res=> {
						console.log("data recieved")
						this.setState({daily_sym: {
							fever2: res.fever2,
							chillsorsweating: res.chillsorsweating,
							coughing: res.coughing,
							difficultybreathing: res.difficultybreathing,
							sorethroat: res.sorethroat,
							bodyaches: res.bodyaches,
							headache: res.headache,
							vomiting: res.vomiting,
							diarrhea: res.diarrhea,
							fatiguetiredness: res.fatiguetiredness,
							none9: res.none9,
						}})
						this.setState({vitals_data: {
							bodytemperature: res.bodytemperature,
							temptype: res.temptype,
							bloodpressure1: res.bloodpressure1,
							heartratefeeling: res.heartratefeeling,
							heartrate: res.heartrate,
							oxygensaturation: res.oxygensaturation,
							fever1: res.fever1,
						}})
						this.setState({personal_data: {
							traveltoday: res.traveltoday,
							foundanyone: res.foundanyone,
							exposed: res.exposed,
							// pic: res.pic,
							feeling: res.feeling,
						}})

					})
					.catch(err => console.log(err))
			})
			.catch(err => navigate("/"))
	}

	dataSet = (data) => {
		console.log(data)
		this.setState({data: data})
	}

	refreshCalendar = () => {
		this.child.current.refreshCal()
	};

	render() {
		let output;
		let back;
		if (this.state.route === "vitals") {
			// if (this.state.vitals == 1 && this.state.personal == 1 && this.state.symptoms == 1) {
			// 	// if (this.state.prevroute=="pred") {
			// 		back = <BackButton onRouteChange={this.onRouteChange}/>
			// 		output = <VitalForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} clientid={this.state.clientid} onVitalsUpdate={this.onVitalsUpdate} Dated={this.state.day} Month={this.state.month} data = {this.state.vitals_data}/>
			// 	// } else {
			// 	// 	this.setState({route:"pred"})
			// 	// }
			// } else {
				back = <BackButton onRouteChange={this.onRouteChange}/>
				output = <VitalForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} clientid={this.state.clientid} onVitalsUpdate={this.onVitalsUpdate} Dated={this.state.day} Month={this.state.month} data = {this.state.vitals_data}/>
			// }
		} else if (this.state.route === "symptoms") {
			// if (this.state.vitals == 1 && this.state.personal == 1 && this.state.symptoms == 1) {
			// 	// if (this.state.prevroute=="pred") {
			// 		back = <BackButton onRouteChange={this.onRouteChange}/>
			// 		output = <SymptomsForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} onDailyUpdate={this.onDailyUpdate} Dated={this.state.day} Month={this.state.month} data = {this.state.daily_sym} clientid = {this.state.clientid}/>
			// 	// } else {
			// 	// 	this.setState({route:"pred"})
			// 	// }
			// } else {
				back = <BackButton onRouteChange={this.onRouteChange}/>
				output = <SymptomsForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} onDailyUpdate={this.onDailyUpdate} Dated={this.state.day} Month={this.state.month} data = {this.state.daily_sym} clientid = {this.state.clientid}/>
			// }
		} else if (this.state.route==="personal") {
			// if (this.state.vitals == 1 && this.state.personal == 1 && this.state.symptoms == 1) {
				// if (this.state.prevroute=="pred") {
				// 	back = <BackButton onRouteChange={this.onRouteChange}/>
				// 	output = <PersonalForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} onPersonalUpdate={this.onPersonalUpdate} Dated={this.state.day} Month={this.state.month} data={this.state.personal_data} clientid = {this.state.clientid}/>
				// } else {
				// 	this.setState({route:"pred"})
				// }
			// } else {
				back = <BackButton onRouteChange={this.onRouteChange}/>
				output = <PersonalForm refreshCalendar={this.refreshCalendar} vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} onPersonalUpdate={this.onPersonalUpdate} Dated={this.state.day} Month={this.state.month} data={this.state.personal_data} clientid = {this.state.clientid}/>
			// }
		} else if (this.state.route==="wait") {
			console.log("in waiting")
			if (this.state.vitals===0) {
				this.setState({route: "vitals"})
			} else if (this.state.symptoms === 0) {
				this.setState({route: "symptoms"})
			} else {
				output = <Waiting Dated={this.state.day} Month={this.state.month} onRouteChange={this.onRouteChange} dataSet={this.dataSet}/>
			}
		} else if (this.state.route === "gs") {
			if (this.state.vitals === 1 && this.state.personal === 1 && this.state.symptoms===1) {
				this.setState({route: "wait"})
			} else {
				output = <GettingStarted vitals={this.state.vitals} symptoms={this.state.symptoms} personal={this.state.personal} Dated={this.state.day} Month={this.state.month} onRouteChange={this.onRouteChange}/>
			}
		} else if (this.state.route === "pred") {
			output=(
				<div>
					<Prediction Dated={this.state.day} Month={this.state.month} data={this.state.data}/>
				</div>
			)
		}

		return (
			<div>
			    <Navbar path = {this.state.path}/>
			    <BrowserView>
				    <div className="ma2 ph6" style={{display: "grid", "grid-template-columns":"1fr 4fr", gap: "20px"}}>
					  <div style={{"min-width":"290px"}}>
					  	{back}
					  	<List symptoms = {this.state.symptoms} personal = {this.state.personal} vitals = {this.state.vitals} onRouteChange={this.onRouteChange} route={this.state.route}/>
					  	<Table clientid={this.state.clientid} ref = {this.child} onDateChange={this.onDateChange} symptoms={this.state.symptoms} personal = {this.state.personal} vitals = {this.state.vitals} vitalDone={this.vitalDone} personalDone={this.personalDone} symptomsDone={this.symptomsDone}/>
					  </div>
					  <div className="ml3" style={{width:"700px"}}>
					    {output}
					  </div>
					</div>
					</BrowserView>
				<MobileView>
					<div style={{"margin":"auto", display: 'flex', flexDirection: 'row', flex: 1}}>
						<List symptoms = {this.state.symptoms} personal = {this.state.personal} vitals = {this.state.vitals} onRouteChange={this.onRouteChange} route={this.state.route}/>
						<Table clientid={this.state.clientid} ref = {this.child} onDateChange={this.onDateChange} daily={this.state.daily} personal = {this.state.personal} vitals = {this.state.vitals} vitalDone={this.vitalDone} personalDone={this.personalDone} symptomsDone={this.symptomsDone}/>
					</div>
					{/*<div style={{width:"350px", margin:"auto"}}>*/}
					{/**/}
					{/*</div>*/}
					{back}
					<div style={{"margin":"10px auto auto auto","padding-bottom":"50px"}}>
						{output}
					</div>
				</MobileView>
			</div>
		);
	}
}



export default Dashboard
