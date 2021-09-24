import React from "react"
import Navbar from "../components/Navbar.js"
import "../components/about.css"
import { navigate } from "gatsby"
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
				<div className="grid-box1">
					<article className="Avenir hidden ba b--black-10">
					  <h1 className="f5 bg-white br3 br--top gray mv0 pv3 ph5">OUR UNIQUE APPROACH</h1>
					  <div className="pl4 pb2 pt3 bt b--black-10">
						<p className="ml3 header">USING AI TO HELP DEFEAT Infectious Diseases</p>
						<p className="ml3 mt4 dark-gray body tj">This tool will help you assess your symptoms and offers guidance on when you may need to stay home or seek medical care.
							With everything that is happening in the world today we needed to figure out a way to help solve the uncertainty and anxiety that comes along with the pandemic. Our method  uses a proprietary algorithm that is getting better with every day, every person who helps us by
							updating their symptoms, and with geographic data provided by outside sources. We take all of these data points and use them to make a prediction that helps you make decisions about seeking appropriate medical care. This application is not intended to replace your healthcare provider and is not intended for the diagnosis or treatment of Infectious Disease. This device is not cleared by the FDA and is under Enforcement Policy for
							the duration of the Public Health Emergency. Learn more about Infectious Disease and what you can do to stay safe on the CDC website. Please also see your local area’s public health agency website.
							Watch for Infectious Disease symptoms. Infectious Disease symptoms can be found on the CDC website. If you develop symptoms, call your medical provider.</p>
						<p className="ml3 header">WHAT ARE THE SYMPOMS OF Infectious Disease?</p>
						<p className="ml3 mt4 dark-gray body tj">
						  Many patients with confirmed Infectious Disease have developed fever and/or symptoms of acute respiratory illness (e.g., cough, difficulty breathing). However, limited information is currently available to characterize the full spectrum of clinical illness associated with Infectious Disease. Based on what is known about the virus that causes Infectious Disease, signs and symptoms may appear any time from 2 to 14 days after exposure to the virus. Based on preliminary data, the median incubation period is approximately 5 days, but may range 2-14 days.
						  Public health officials have identified cases of Infectious Disease infection throughout the world, including the United States, which may pose risks for public health. Please check the CDC webpage for the most up to date information.
						</p>
					  </div>
					</article>
					<article className="Avenir hidden ba b--black-10">
					  <h1 className="f5 bg-white br3 br--top gray mv0 pv3 ph5">HOW TO USE</h1>
					  <div className="ph4 pb2 pt3 bt b--black-10">
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
				<Footer />
			</div>
		)
	}
}

export default About;
