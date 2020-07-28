import React from 'react';
// import { BrowserView, MobileView} from "react-device-detect";
import "./LandingPage.css";
import SignInCard from "./signInCard.js";
import {
  isMobile
} from "react-device-detect";

const LandingPage = () => {
	return(
		<div>
			<div className={`flex ${(isMobile)?"mt3":"mt5"}`} style={{"margin-left": (isMobile) ? "0" : "3vw"}}>
				<div className="fl tc" style={{"padding-left-":"0px","padding-right":"1rem", width: "min(700px, 95vw)", "margin-right":(isMobile) ? "0px" : "20px"}}>
					<SignInCard/>
				</div>
				<div className = "tl flex123" style={{"padding-left":(isMobile) ? "20px" : "0","margin-left":"auto", "margin-right":"auto", "padding-top":"4.5rem","padding-bottom":"20px", "max-width":"700px"}}>
					<p className={`${(isMobile)?"f2":"f1"} lh-title purples Avenir w-100`}>You can make a difference and help defeat Corona</p>
					<br/>
					<br/>
					<p className="f3 mb2 purples mb3">What do we do?</p>
					<p className="gray f4-5 w-90">HelpDefeactCorona is a website that helps people around the world use their symptoms, geographical location and physical conditions to figure out their likelihood of having Coronavirus and how at risk they are.</p>
					<br/>
					<p className="f4 purples">We use simple measures that you can provide from your home to provide you comprehensive measures </p>
					<br/>
					<br/>
					<p className="f3 purples b">Steps</p>
					<div class="tl flex-box">
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

export default LandingPage;

