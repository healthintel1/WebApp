import React from "react"
import Navbar from "../components/Navbar.js"
import {BrowserView, MobileView} from "react-device-detect"
import "../components/about.css"
import { Link, navigate } from "gatsby"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import Footer from "../components/footer";
Amplify.configure(awsconfig);


class About extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			path:"",
		}
	}

	componentDidMount() {
		console.log(this.props.location.pathname)
		this.setState({path: this.props.location.pathname})
		Auth.currentAuthenticatedUser()
			.then(res => console.log("User is logged in"))
			.catch(err => navigate("/"))
	}

	render() {
		return(
			<div>
				<Navbar path={this.state.path}/>
				<BrowserView>
					<div className="grid-box1">
						<article class="w-100 Avenir shadow-4 hidden ba b--black-10">
						  <h1 class="f5 bg-white br3 br--top gray mv0 pv3 ph5">OUR UNIQUE APPROACH</h1>
						  <div class="pl4 pb2 pt3 bt b--black-10">
						  	<p className="ml3 header">USING AI TO HELP DEFEAT CORONA</p>
						  	<p className="ml3 mt4 dark-gray body tj">With everything that is happening in the world today we needed to figure out a way to not only help solve the uncertainty and anxiety that comes along with the pandemic. Our method uses a proprietary algorithm that is getting better with every day, with every person who helps us by updating their symptoms, and with geographic data provided by outside sources. We take all of those data points and use them to make a prediction that you can trust and help you decide what to do next and how to handle it. We don’t claim to replace an emergency room but we do give you the advice you need to make your next step. </p>
						  	<p className="ml3 mt4 body tj dark-gray">Use our site, put in your data to the best of your ability, and we will do our best to tell you how at risk you are for Corona and how worried you should be</p>
						  </div>
						</article>
						<article class="w-100 Avenir shadow-4 hidden ba b--black-10">
						  <h1 class="f5 bg-white br3 br--top gray mv0 pv3 ph5">HOW TO USE</h1>
						  <div class="ph4 pb2 pt3 bt b--black-10">
						  	<p className="ml3 header">STEPS</p>
						  	<div className="mt4 body tj dark-gray">
							  	<div className="ml3 list-div mv3">
								  <span>1</span>  Sign in and provide some initial data
								</div>
								<div className="ml3 list-div mv3">
								  <span>2</span>  Provide daily data about your symptoms and vitals. If you see a red bubble around one of the updates that means you should fill it out. Our prediction is only as good as your data!
								</div>
								<div className="ml3 list-div mv3">
								  <span>3</span>  Keep checking. Keep updating. And keep getting better predictions.
								</div>
						  	</div>
						  </div>
						</article>
					</div>
				</BrowserView>
				<MobileView>
					<div style={{margin:"auto", "margin-top":"30px"}}>
						<article class="pb4 w-100 Avenir shadow-4 hidden ba b--black-10">
						  <h1 class="f6 bg-white br3 br--top gray mv0 pv3 ph5">OUR UNIQUE APPROACH</h1>
						  <div class="pl4 pb2 pt3 bt b--black-10">
						  	<p className="ml3 pa2 pr3 header f2">USING AI TO HELP DEFEAT CORONA</p>
						  	<p className="ml3 mt3 gray f5 pa2 pr5 tj">With everything that is happening in the world today we needed to figure out a way to not only help solve the uncertainty and anxiety that comes along with the pandemic. Our method uses a proprietary algorithm that is getting better with every day, with every person who helps us by updating their symptoms, and with geographic data provided by outside sources. We take all of those data points and use them to make a prediction that you can trust and help you decide what to do next and how to handle it. We don’t claim to replace an emergency room but we do give you the advice you need to make your next step. </p>
						  	<p className="ml3 mt2 pa2 pr5 f5 tj gray">Use our site, put in your data to the best of your ability, and we will do our best to tell you how at risk you are for Corona and how worried you should be</p>
						  </div>
						</article>
						<article class="w-100 Avenir shadow-4 hidden mt4 mb4 pb3 ba b--black-10">
						  <h1 class="f6 bg-white br3 br--top gray mv0 pv3 ph5">HOW TO USE</h1>
						  <div class="pa4 bt b--black-10">
						  	<p className="ml3 header Avenir pl2 pb0 mb0 f2">STEPS</p>
						  	<div className="mt3 Avenir f5 tj gray">
							  	<div className="ml3 Avenir list-div pa2 pr4 mv3">
								  <span>1</span>Sign in and provide some initial data.
								</div>
								<div className="ml3 Avenir list-div pa2 pr4 mv3">
								  <span>2</span>Provide daily data about your symptoms and vitals. If you see a red bubble around one of the updates that means you should fill it out. Our prediction is only as good as your data!
								</div>
								<div className="ml3 Avenir list-div pa2 pr4 mv3">
								  <span>3</span>Keep checking. Keep updating. And keep getting better predictions.
								</div>
						  	</div>
						  </div>
						</article>
					</div>
				</MobileView>
				<Footer />
			</div>
		)
	}
}

export default About;
