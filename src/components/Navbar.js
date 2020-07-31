import React from 'react';
// import { BrowserView, MobileView} from "react-device-detect";
import '../fonts/TenaliRamakrishna-Regular.ttf'
import "./register.css"
import {Link, navigate} from "gatsby"
import Amplify, { Auth } from 'aws-amplify';

const Navbar = (props) => {
	let x = (props.path)
	async function signOut() {
	    try {
	        const response = await Auth.signOut({ global: true });
	        console.log(response)
	        navigate("/")
	    } catch (error) {
	        console.log('error signing out: ', error);
	    }
	}
	return(
		<header class="black-80 tc pv3 avenir w-100">
		  <h1 class="mt0 mb2 fw1" style={{"font-family":"Avenir","font-size":"1.6rem", color: "rgb(127,90,179)"}}>HelpDefeatCOVID.org</h1>
		  <nav class="bb tc center dib b--light-gray bw2 pb0 w-100 mt2">
		    <p onClick={()=>navigate("/dashboard")} className={`f6 pointer f5-l link hover b--dark-blue black-80 dib pa2 pb2 ph4-l ${(x === "/dashboard/" || x==="/dashboard")?"chosen":""}`}>Dashboard</p>
		    <p onClick={()=>navigate("/about")} className={`f6 pointer f5-l link hover b--dark-blue dib pa2 pb2 ph4-l ${(x === "/about/" || x==="/about")?"chosen":""}`}>Our Unique Approach</p>
		    <p onClick={()=>navigate("/settings")} className={`f6 pointer f5-l b--dark-blue link hover black-80 dib pa2 pb2 ph4-l ${(x === "/settings/" || x==="/settings")?"chosen":""}`}>Settings</p>
		    <p onClick={signOut} class="f6 f5-l link pointer  bg-animate black-80 b--dark-blue hover dib pa2 ph4-l pb2">Sign Out</p>
		  </nav>

		</header>
		);
}

export default Navbar;

