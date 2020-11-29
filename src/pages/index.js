import React from "react"
import "../components/register.css"
import LandingPage from "../components/LandingPage.js"
import {navigate} from "gatsby";
import "tachyons"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

class IndexPage extends React.Component {
	constructor() {
		super()
		this.state = {
			isSignedIn: false,
		}
	}

	componentDidMount() {
		navigate("/maint")
		Auth.currentAuthenticatedUser()
			.then(res => {
// 				navigate("/dashboard")
				console.log("User is logged in")
			})
			.catch(err => console.log("User is not logged in"))
	}


	render() {
		navigate("/maint")
		return(<LandingPage/>)
	}
}

export default IndexPage
