import React, {useEffect, useState} from 'react';
// import { BrowserView, MobileView} from "react-device-detect";
import '../fonts/TenaliRamakrishna-Regular.ttf'
import "./register.css"
import {Link, navigate} from "gatsby"
import Amplify, { Auth } from 'aws-amplify';
import {CORSDOMAIN} from "./constant";

const Navbar = (props) => {
	let x = (props.path)
	const [clientId, setClientId] = useState("");
	const [companyLogo, setCompanyLogo] = useState("");

	async function signOut() {
	    try {
	        const response = await Auth.signOut({ global: true });
	        console.log(response)
	        navigate("/")
	    } catch (error) {
	        console.log('error signing out: ', error);
	    }
	}

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(res => {
				setClientId(res.username)
				var url = CORSDOMAIN+`/getlogo?client_id=${res.username}`
				console.log(url)
				async function GetData(url) {
					let response = await fetch(url)
					response = response.json()
					return response
				}
				GetData(url)
					.then(res => {
						console.log(res)
						setCompanyLogo(res)
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.error("Error in getting logo"))
	}, []);

	return(
		<header className="black-80 tc pv3 avenir w-100">
			{
				companyLogo===""?
					<h1 className="mt0 mb2 fw1" style={{"font-family":"Avenir","font-size":"1.6rem", color: "rgb(127,90,179)"}}>HelpDefeatCOVID.com</h1>
					:
					<img className="dib ml2 pt0" style={{height: 50}} src={companyLogo}/>
			}
		  <nav className="bb tc center dib b--light-gray bw2 pb0 w-100 mt2">
		    <p onClick={()=>navigate("/dashboard")} className={`f6 pointer f5-l link hover b--dark-blue black-80 dib pa2 pb2 ph4-l ${(x === "/dashboard/" || x==="/dashboard")?"chosen":""}`}>Dashboard</p>
		    <p onClick={()=>navigate("/about")} className={`f6 pointer f5-l link hover b--dark-blue dib pa2 pb2 ph4-l ${(x === "/about/" || x==="/about")?"chosen":""}`}>Our Unique Approach</p>
		    <p onClick={()=>navigate("/settings")} className={`f6 pointer f5-l b--dark-blue link hover black-80 dib pa2 pb2 ph4-l ${(x === "/settings/" || x==="/settings")?"chosen":""}`}>Settings</p>
		    <p onClick={signOut} className="f6 f5-l link pointer  bg-animate black-80 b--dark-blue hover dib pa2 ph4-l pb2">Sign Out</p>
		  </nav>

		</header>
		);
}

export default Navbar;
