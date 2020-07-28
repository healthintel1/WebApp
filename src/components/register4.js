import React from "react"
import {navigate} from "gatsby"
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import "./register.css"

class Register4 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			output: <img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" style={{width:"70%", margin:"auto", "margin-top":"0px", padding:"0px"}}/>,
		}
	}

	componentDidMount() {
			console.log("REACHED FETCH WALA PART")
			console.log(this.props.data)
			const requestOptions = {
			        method: 'POST',
			        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true },
			        body: JSON.stringify(this.props.data)
			    };
			fetch('https://cors-anywhere.herokuapp.com/https://534q6zi164.execute-api.ap-south-1.amazonaws.com/pluto/posthistory?', requestOptions)
		        .then(res=>{
		        	this.setState({output: <p onClick={()=>navigate("/")} className={`f5 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 mt6 items-center pa3 ba border-box ph4 br3`} style={{"margin":"auto", "margin-top":"50px"}}>Continue to Sign In</p>})
		        })
		        .catch(err=>console.log(err))
	}

	render() {
		return(
			<div className="shadow-3 tc b--light-gray ph5 pb4 bg-white ba Avenir" style={{margin:"auto", "font-family":"Avenir", width: (isMobile) ? "100vw" : "700px"}}>
				<p className="f2 mt4 dark-green mb3 ">JUST A MOMENT</p>
				<p className="f4 w-70 mt2 gray" style={{"margin":"auto"}}>Please wait while we set up your account.</p>
				<p className="f4 w-70 mt2 b gray" style={{"margin":"auto"}}>Note: Please verify your email and then sign in to access your dashboard</p>
				<div>
					{this.state.output}
				</div>
			</div>
		);
	}
}

export default Register4;
