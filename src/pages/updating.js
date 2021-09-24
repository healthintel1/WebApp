import React from "react"
import {navigate} from "gatsby"
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import "../components/register.css"
import {CORSDOMAIN} from '../components/constant'
import Footer from "../components/footer";

class UpdatingDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state={}
	}

	componentDidMount() {
			if (typeof window !== 'undefined' && this.props.location.state == null) {
				console.log("error")
			} else {
				console.log("REACHED FETCH WALA PART")
				console.log(this.props.location.state.data)
				const requestOptions = {
				        method: 'POST',
				        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true, "accept":"*" },
				        body: JSON.stringify(this.props.location.state.data)
				    };
				fetch(CORSDOMAIN+'/updatehistory', requestOptions)
			        .then(res=>navigate("/settings"))
			        .catch(err=>console.log(err))
				}


	}

	render() {
		return(
			<div>
				<div className="mt0 bb mb3 bw1 b--light-gray tc w-100">
					<h1 className="pointer mt0 fw1 tc mb3 f3" style={{"font-family":"Avenir", color: "rgb(127,90,179)"}}>Acme Inc.</h1>
				</div>
				<div className="shadow-3 tc b--light-gray ph5 pb4 bg-white ba Avenir" style={{margin:"auto", "font-family":"Avenir", width: (isMobile) ? "85vw" : "700px"}}>
					<p className="f2 mt4 dark-green mb3 ">JUST A MOMENT</p>
					<p className="f4 w-70 mt2 gray" style={{"margin":"auto"}}>Please wait while we update your details. You will be redirected shortly.</p>
					<img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" style={{width:"70%", margin:"auto", "marginTop":"0px", padding:"0px"}}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default UpdatingDetails;
