import React from 'react';
import "./LandingPage.css";
import SignInCard from "./signInCard.js";
import {
  isMobile
} from "react-device-detect";
import Footer from "./footer";

const LandingPage = () => {
	return(
		<div>
			<div className={`flex ${(!isMobile)?"mt5":"mt3"} marLeft`}>
				<div className="fl tc mobSign">
					<SignInCard/>
				</div>
				<div className = "tl flex123" style={{"paddingLeft":(isMobile) ? "20px" : "0","marginLeft":"auto", "marginRight":"auto", "paddingTop":"4.5rem","paddingBottom":"20px", maxWidth:"800px"}}>
					<p className={`f2 lh-title purples Avenir w-100`}>You can make a difference and help defeat COVID-19</p>
					<br/>
					<br/>
					<p className="f3 mb2 purples mb3">What do we do?</p>
					<p className="gray f4-5 w-90">HelpDefeatCOVID.com is a website that helps people around the world use their medical history, symptoms and vital signs that include heart rate, temperature and blood oxygen saturation to determine likelihood of COVID-19.</p>
					<br/>
					<p className="f4 purples">We use simple measures that you can provide from your home.</p>
					<br/>
					<br/>
					<p className="f3 purples b">Steps</p>
					<div className="tl flex-box">
					  <p className="f5 gray mr0 mb1">1. Get access</p>
					  <p className="f5 gray ml0 mb1">2. Enter your symptoms & medical details</p>
					  <p className="f5 gray">3. Let our algorithm calculate and predict how at risk you are</p>
					  <p className="f5 gray">4. Find out the next steps and continue to monitor your situation</p>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
		);
};

export default LandingPage;

