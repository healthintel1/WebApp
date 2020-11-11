import React from "react"
import Navbar from "../components/Navbar.js"
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"
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
				{<BrowserView>
					<div className="grid-box1">
						<article class="w-100 Avenir shadow-4 hidden ba b--black-10">
						  <h1 class="f5 bg-white br3 br--top gray mv0 pv3 ph5">OUR UNIQUE APPROACH</h1>
						  <div class="pl4 pb2 pt3 bt b--black-10">
						  	<p className="ml3 header">USING AI TO HELP DEFEAT COVID-19</p>
						  	<p className="ml3 mt4 dark-gray body tj">This tool will help you assess your symptoms and offers guidance on when you may need to stay home or seek medical care.
								With everything that is happening in the world today we needed to figure out a way to help solve the uncertainty and anxiety that comes along with the pandemic. Our method  uses a proprietary algorithm that is getting better with every day, every person who helps us by
								updating their symptoms, and with geographic data provided by outside sources. We take all of these data points and use them to make a prediction that helps you make decisions about seeking appropriate medical care. This application is not intended to replace your healthcare provider and is not intended for the diagnosis or treatment of disease or other conditions including COVID-19. This device is not cleared by the FDA and is under Enforcement Policy for
								the duration of the Public Health Emergency. Learn more about COVID-19 and what you can do to stay safe on the CDC website. Please also see your local area’s public health agency website.
								Watch for COVID-19 symptoms. COVID-19 symptoms can be found on the CDC website. If you develop symptoms, call your medical provider.</p>
						    <p className="ml3 header">WHAT ARE THE SYMPOMS OF COVID-19?</p>
						    <p className="ml3 mt4 dark-gray body tj">
							  Many patients with confirmed COVID-19 have developed fever and/or symptoms of acute respiratory illness (e.g., cough, difficulty breathing). However, limited information is currently available to characterize the full spectrum of clinical illness associated with COVID-19. Based on what is known about the virus that causes COVID-19, signs and symptoms may appear any time from 2 to 14 days after exposure to the virus. Based on preliminary data, the median incubation period is approximately 5 days, but may range 2-14 days.
							  Public health officials have identified cases of COVID-19 infection throughout the world, including the United States, which may pose risks for public health. Please check the CDC webpage for the most up to date information.
						    </p>
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
				</BrowserView>}
				{<MobileView>
					<div style={{margin:"auto", "margin-top":"30px"}}>
						<article class="pb4 w-100 Avenir shadow-4 hidden ba b--black-10">
						  <h1 class="f6 bg-white br3 br--top gray mv0 pv3 ph5">OUR UNIQUE APPROACH</h1>
						  <div class="pl4 pb2 pt3 bt b--black-10">
						  	<p className="ml3 pa2 pr3 header f2">USING AI TO HELP DEFEAT COVID-19</p>
						  	<p className="ml3 mt3 gray f5 pa2 pr5 tj">With everything that is happening in the world today we needed to figure out a way to not only help solve the uncertainty and anxiety that comes along with the pandemic. Our method uses a proprietary algorithm that is getting better with every day, with every person who helps us by updating their symptoms, and with geographic data provided by outside sources. We take all of those data points and use them to make a prediction that you can trust and help you decide what to do next and how to handle it. We don’t claim to replace an emergency room but we do give you the advice you need to make your next step. </p>
						  	<p className="ml3 mt2 pa2 pr5 f5 tj gray">Use our site, put in your data to the best of your ability, and we will do our best to tell you how at risk you are for COVID-19 and how worried you should be</p>
							  <p className="ml3 pa2 pr3 header f2">WHAT ARE THE SYMPOMS OF COVID-19?</p>
							  <p className="ml3 mt2 pa2 pr5 f5 tj gray">
								  Many patients with confirmed COVID-19 have developed fever and/or symptoms of acute respiratory illness (e.g., cough, difficulty breathing). However, limited information is currently available to characterize the full spectrum of clinical illness associated with COVID-19. Based on what is known about the virus that causes COVID-19, signs and symptoms may appear any time from 2 to 14 days after exposure to the virus. Based on preliminary data, the median incubation period is approximately 5 days, but may range 2-14 days.
								  Public health officials have identified cases of COVID-19 infection throughout the world, including the United States, which may pose risks for public health. Please check the CDC webpage for the most up to date information.
							  </p>
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
				</MobileView>}
				<Footer />
			</div>
		)
	}
}

export default About;
