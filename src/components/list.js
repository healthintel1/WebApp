import React from "react"
import "./register.css"
import Tck from "./tick";

const List = ({vitals, personal, symptoms, test, onRouteChange, route}) => {
	let profile = Math.floor(((vitals + personal + symptoms) * 100)/3)
	let z = (
		<div className="tl b--light-gray bg-white ba Avenir pb3" style={{"font-family":"Avenir", flex: 1}}>
			<div className="bb b--light-gray pv2 bw1 w-100">
				<p className="f4 mt3 mll3 mb0 dark-gray">PROFILE</p>
				<p className="mt2 mll3 mb2 dark-red" style={{"font-size":"14px"}}>{profile}% COMPLETE</p>
			</div>
			<div className="mt2 pt3 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 4}}>
					<p onClick={()=>onRouteChange("personal")} className="mll3 mt0 mb1 pointer dark-gray" style={{"font-size":"1.1rem",  "font-weight": (route === "personal") ? "bold" : "normal", color: (route==="personal") ? "rgb(255, 127, 129)" : "black"}}>HOW ARE <br/>YOU FEELING?</p>
					<p className="f6 mll3 gray" style={{"font-size":"0.8rem"}}>Change any personal information</p>
				</div>
				<div style={{flex: 1}}>
					{personal === 1?<Tck />:null}
				</div>
			</div>
			<div className="mt2 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 4}}>
					<p onClick={()=>onRouteChange("symptoms")} className="mll3 mt0 pointer mb1 dark-gray" style={{"font-size":"1.1rem", "font-weight": (route === "symptoms") ? "bold" : "normal", color: (route === "symptoms") ? "rgb(255, 127, 129)" : "black"}}>SYMPTOMS</p>
					<p className="mll3 mb4 gray" style={{"font-size":"0.8rem"}}/>
				</div>
				<div style={{flex: 1}}>
					{symptoms === 1?<Tck />:null}
				</div>
			</div>
			<div className="mt2 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 4}}>
					<p onClick={()=>onRouteChange("vitals")} className="mll3 pointer mb1 dark-gray" style={{"font-size":"1.1rem", "font-weight": (route === "vitals") ? "bold" : "normal", color: (route==="vitals") ? "rgb(255, 127, 129)" : "black"}}>VITALS SIGNS</p>
					<p className="mll3 mb4 gray" style={{"font-size":"0.8rem"}}>Input daily measurements like
						temperature and blood oxidation</p>
				</div>
				<div style={{flex: 1}}>
					{vitals === 1?<Tck />:null}
				</div>
			</div>
			<div className="mt2 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 4}}>
					<p onClick={()=>onRouteChange("test")} className="mll3 pointer mb1 dark-gray" style={{"font-size":"1.1rem", "font-weight": (route === "test") ? "bold" : "normal", color: (route==="test") ? "rgb(255, 127, 129)" : "black"}}>TEST RESULTS</p>
				</div>
				<div style={{flex: 1}}>
					{test === 1?<Tck />:null}
				</div>
			</div>
		</div>
	);
	let output;
	if (route !== "pred") {
		output= (
			<div style={{"font-family":"Avenir", flex: 1}}>
				{z}
			</div>
		)
	} else {
		output = z
	}
	return(output)

};

export default List;
