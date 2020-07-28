import React from "react"
import "./register.css"

const RegNav = ({route}) => {
	let b_ac="b--light-gray"
	let b_al="b--light-gray"
	let b_mh="b--light-gray"
	if (route==="account") {
		b_ac = "b--dark-red"
	} else if (route==="allergies") {
		b_ac = "b--purple"
		b_al = "b--dark-red"
	} else if (route==="history") {
		b_ac = "b--purple"
		b_al = "b--purple"
		b_mh = "b--dark-red"
	} else {
		b_ac = "b--purple"
		b_al = "b--purple"
		b_mh = "b--purple"
	}
	return(
		<div className="tc flex mt1 mb0">
			<p className={`dib pb2 bb bw1 tc mb2 ${b_ac}`}>Account Details</p>
			<p className={`dib pb2 bb bw1 tc ml4 mb2 ${b_al}`}>Allergies</p>
			<p className={`dib pb2 bb bw1 tc ml4 mb2 ${b_mh}`}>Medical History</p>
		</div>
	)
}

export default RegNav;
