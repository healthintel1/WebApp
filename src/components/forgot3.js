import React from "react"
import {navigate} from "gatsby";

class ForgotMessage extends React.Component {
	render() {
		return(
			<div className="shadow-3 tc b--light-gray ph5 pb4 bg-white ba" style={{margin:"auto", "font-family":"Avenir", width: "max(40%, 700px)"}}>
				<p className="f2 dark-green ml3 mt4 mb5">Password Change Successful!</p>
				<p onClick={()=> navigate("/")} class="f4 tc no-underline black bg-animate hover-bg-purple hover-white inline-flex pointer mb3 items-center pa3 ba border-box" style={{"margin":"auto"}}>
				    <span> Sign In </span>
				</p>
			</div>
		);
	}
}

export default ForgotMessage;