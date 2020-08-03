import React from "react"

const BackButton = ({onRouteChange}) => {
	return(
		<p onClick={()=>onRouteChange("gs")} class="tc f4 Avenir link dim br2 ph3 pt3 w-100 pointer mb4 dib" style={{color: "rgb(255, 127, 129)"}}> <span className="br-100 pv1 ph2" style={{color:"white", background: "rgb(255, 127, 129)"}}>❮</span> Back to Home</p>	
	);
}

export default BackButton;