import React from "react"
import {isMobile} from "react-device-detect"
import "./register.css"
import Tck from "./tick";

const List = ({vitals, personal, symptoms, onRouteChange, route}) => {
	let profile = Math.floor(((vitals + personal + symptoms) * 100)/3)
	let z = (
		<div className="tl b--light-gray bg-white ba Avenir pb3" style={{"font-family":"Avenir", flex: 1}}>
			<div className="bb b--light-gray pv2 bw1 w-100">
				<p className="f4 mt3 ml4 mb0 dark-gray">PROFILE</p>
				<p className="mt2 ml4 mb2 dark-red" style={{"font-size":"14px"}}>{profile}% COMPLETE</p>
			</div>
			<div className="mt2 pt3 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 3}}>
					<p onClick={()=>onRouteChange("personal")} className="ml4 mt0 mb1 pointer dark-gray" style={{"font-size":(isMobile)?"18px":"24px",  "font-weight": (route === "personal") ? "bold" : "normal", color: (route==="personal") ? "rgb(255, 127, 129)" : "black"}}>PERSONAL</p>
					<p className="f6 ml4 gray" style={{"font-size":(isMobile)?"12px":"14px"}}>Change any personal information</p>
				</div>
				<div style={{flex: 1}}>
					{personal === 1?<Tck />:null}
				</div>
			</div>
			<div className="mt2 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 3}}>
					<p onClick={()=>onRouteChange("symptoms")} className="ml4 mt0 pointer mb1 dark-gray" style={{"font-size":(isMobile)?"18px":"24px", "font-weight": (route === "symptoms") ? "bold" : "normal", color: (route === "symptoms") ? "rgb(255, 127, 129)" : "black"}}>DAILY SYMPTOMS</p>
					<p className="f6 ml4 mb4 gray" style={{"font-size":(isMobile)?"12px":"14px"}}>Put in any recent medical issues like altered speech and pain</p>
				</div>
				<div style={{flex: 1}}>
					{symptoms === 1?<Tck />:null}
				</div>
			</div>
			<div className="mt2 pb0" style={{display: "flex", flexDirection: 'row'}}>
				<div style={{flex: 3}}>
					<p onClick={()=>onRouteChange("vitals")} className="ml4 pointer mb1 dark-gray" style={{"font-size":(isMobile)?"18px":"24px", "font-weight": (route === "vitals") ? "bold" : "normal", color: (route==="vitals") ? "rgb(255, 127, 129)" : "black"}}>DAILY VITALS</p>
					<p className="ml4 mb4 gray" style={{"font-size":(isMobile)?"12px":"14px"}}>Input daily measurements like
						temperature and blood oxidation</p>
				</div>
				<div style={{flex: 1}}>
					{vitals === 1?<Tck />:null}
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
