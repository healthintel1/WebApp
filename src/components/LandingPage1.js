import React from 'react';
// import { BrowserView, MobileView} from "react-device-detect";
import "./LandingPage.css";
import '../fonts/TenaliRamakrishna-Regular.ttf'
import SignInCard from "./signInCard.js";
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"

const LandingPage1 = () => {
	return(
		<div>
			<h1>Mobile</h1>
			<div className="flex">
				<div className="fl tc" style={{"padding":"1rem", "padding-right":"2rem","margin-left":"auto", "margin-right":"auto"}}>
					<SignInCard/>
				</div>
				<div className = "tl" style={{"margin-left":"auto", "margin-right":"auto", padding: "10px", "padding-top":"5rem"}}>
					<h1 className={`f2 purples Avenir w-100`}>You can make a difference and help defeat Corona</h1>
					<br/>
					<br/>
					<p className="f3 mb2 purples mb3">What do we do?</p>
					<p className="gray f4-5 w-90">Corona.ai is a website that helps people around the world use their symptoms, geographical location and physical conditions to figure out their likelihood of having Coronavirus and how at risk they are.</p>
					<br/>
					<p className="f4 purples">We use simple measures that you can provide from your home to provide you comprehensive measures </p>
					<br/>
					<br/>
					<p className="f3 purples b">Steps</p>
					<div className="tl flex-box">
					  <p className="f5 gray mr0 mb1">1. Sign in and create an account</p>
					  <p className="f5 gray ml0 mb1">2. Enter your symptoms & medical details</p>
					  <p className="f5 gray">3. Let our algorithm calculate and predict how at risk you are</p>
					  <p className="f5 gray">4. Find out the next steps and continue to monitor your situation</p>
					</div>
				</div>
			</div>
		</div>
		);
}

export default LandingPage1;

