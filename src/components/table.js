import React from "react"
import "./register.css"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import {CORSDOMAIN} from './constant';
Amplify.configure(awsconfig);

var x
let datestring
var dated = new Date()
var month = dated.getMonth()
dated = dated.getDate()
const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"];

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dates: [],
			status: ["INCOMPLETE","INCOMPLETE","INCOMPLETE","INCOMPLETE","INCOMPLETE"],
			fetched: [],
			current: dated,
			current_month: month,
			clientid:"",
			done: [0,0,0,0,0],
		}
	}

	componentDidMount() {
		console.log("HJJJ");
		this.setState({current: dated})
		Auth.currentAuthenticatedUser()
			.then(res => {
				this.setState({clientid: res.username})
				x = res.username
				let arr = []
				let arr2=[]
				let k;
				var today = new Date()
				for (k=0; k<5; k++) {
					arr.push(today.getDate())
					arr2.push(`${today.getDate()}/${(today.getMonth())+1}`);
					today.setDate(today.getDate() - 1)
				}
				datestring = arr2
				this.setState({dates: arr})
				async function GetData() {
					let response = await fetch(CORSDOMAIN+`/getdates?client_id=${x}&d1=${arr2[0]}&d2=${arr2[1]}&d3=${arr2[2]}&d4=${arr2[3]}&d5=${arr2[4]}`)
					response = response.json()
					return response
				}
				var fetched
				GetData()
					.then(res => {
						res = res.data
						console.log("GETDATA", res)
						res = res.split(",")
						fetched = res
						let i
						let x = fetched
						for (i=0; i<x.length; i++) {
							let a = x[i].split(";")
							let d = a[0].split("/")
							d = d[0]
							let s = a[1]
							if (this.state.dates.includes(Number(d))) {
								console.log("in loop")
								let arr = this.state.status
								arr[this.state.dates.indexOf(Number(d))] = s + "% COMPLETE"
								this.setState({status: arr})
							}
						}
						var todays = new Date()
						for (let i=0; i < 5; i++) {
							if (this.state.dates[i] == todays.getDate()) {
								if (this.state.status[i]==="33% COMPLETE") {
									this.props.vitalDone()
								} else if (this.state.status[i] === "66% COMPLETE") {
									this.props.vitalDone()
									this.props.symptomsDone()
								} else if (this.state.status[i] === "100% COMPLETE") {
									this.props.vitalDone()
									this.props.symptomsDone()
									this.props.personalDone()
								}
						}
			}


					})
					.catch(err=>console.log(err))
			})
	}

	colorChoose = (value) => {
		let color
		if (value === "INCOMPLETE") {
			color = "red"
		} else if (value === "33% COMPLETE") {
			color = "#F05E23"
		} else if (value === "66% COMPLETE") {
			color = "#FFCC00"
		} else {
			color = "green"
		}
		return color
	}

	onDateClick = (e) => {
		let {onDateChange} = this.props
		var thisday = new Date()
		var thisdate = thisday.getDate()
		var thismonth = thisday.getMonth()
		if (e.target.id <= thisdate) {
			onDateChange(e.target.id, thismonth+1)
			this.setState({current: e.target.id, current_month: thismonth})
		} else if (thismonth === 0) {
			onDateChange(e.target.id, 12)
			this.setState({current: e.target.id, current_month: 11})
		} else {
			onDateChange(e.target.id, thismonth)
			this.setState({current: e.target.id, current_month: thismonth-1})
		}
		// for (let i=0; i < 5; i++) {
		// 		if (this.state.dates[i] == e.target.id) {
					// this.props.vitalDone()
					// this.props.symptomsDone()
					// this.props.personalDone()
				// }
			// }
	};

	componentDidUpdate(prevProps) {
	  // Typical usage (don't forget to compare props):
    console.log("HELLO", this.state, this.props);
	  if (this.props !== prevProps) {
	    this.refreshCal();
	  }
	}

	refreshCal = () => {
		this.setState({done: [0,0,0,0,0]})
		dated = Number(this.state.current)
		let percent = this.props.vitals + this.props.personal + this.props.symptoms
		if (percent === 1) {
			let arr = this.state.status
			arr[this.state.dates.indexOf(dated)] = "33% COMPLETE"
			console.log(1, dated, arr)
			this.setState({status: arr})
		} else if (percent === 2) {
			let arr = this.state.status
			arr[this.state.dates.indexOf(dated)] = "66% COMPLETE"
			this.setState({status: arr})
			console.log(2, dated, arr)
		} else if (percent === 3) {
			let arr = this.state.status
			arr[this.state.dates.indexOf(dated)] = "100% COMPLETE"
			this.setState({status: arr})
			console.log(3, dated, arr)
		}
	}

	render() {
		return(
			<div className="mt3 tl b--light-gray pa4 bg-white Avenir mobileOptimize" style={{"font-family":"Avenir", flex: 1}}>
				<div>
					<p className="f4 mt3 mb2 dark-gray">{`${this.state.current} ${monthNames[this.state.current_month]}, 2020`}</p>
					<p className="mb3 gray">You can update the data by clicking on date below</p>
				</div>
			  <div className="calender-grid">
			  	<div className="gray ph2 tc pv4 mr2 bg-washed-green br-pill" style={{height:"270px"}}>
			  		<p onClick={this.onDateClick} id={this.state.dates[0]} className={`pa2 mobileFont pointer mt0 ${(this.state.current == this.state.dates[0]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mb1`}>{this.state.dates[0]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[1]} className={`pa2 mobileFont pointer ${(this.state.current == this.state.dates[1]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[1]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[2]} className={`pa2 mobileFont pointer ${(this.state.current == this.state.dates[2]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[2]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[3]} className={`pa2 mobileFont pointer ${(this.state.current == this.state.dates[3]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[3]}</p>
			  		<p onClick={this.onDateClick} id={this.state.dates[4]} className={`pa2 mobileFont pointer ${(this.state.current == this.state.dates[4]) ? "b--light-gray shadow-2 purple ba br-100" : ""} mv1`}>{this.state.dates[4]}</p>
			  	</div>
			  	<div className='pl0 pv4 br-pill' style={{height:"270px"}}>
			  		<p className="pv2 mt0 mb1 purple br-100 mobileFont" style={{color: this.colorChoose(this.state.status[0])}}>{this.state.status[0]}</p>
			  		<p className="pv2 mv1 mobileFont" style={{color: this.colorChoose(this.state.status[1])}}>{this.state.status[1]}</p>
			  		<p className="pv2 mv1 mobileFont" style={{color: this.colorChoose(this.state.status[2])}}>{this.state.status[2]}</p>
			  		<p className="pv2 mv1 mobileFont" style={{color: this.colorChoose(this.state.status[3])}}>{this.state.status[3]}</p>
			  		<p className="pv2 mv1 mobileFont" style={{color: this.colorChoose(this.state.status[4])}}>{this.state.status[4]}</p>
			  	</div>
			  </div>
			</div>
		)
	}
}

export default Table;
