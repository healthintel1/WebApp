import React from "react"
import "./register.css"
import FloatingLabelInput from 'react-floating-label-input';
import {
  isBrowser,
  isMobile
} from "react-device-detect";

class Register2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			allergies:[],
      on_color:"rgb(255, 127, 129)",
      off_color:"rgb(243,245,248)",
      other: "",
      error: "",
      others: [],
		}
	}

  onClick = (e) => {
    let arr = this.state.allergies
    if (arr.includes(e.target.id)) {
      arr.splice(arr.indexOf(e.target.id), 1)
    } else {
      arr.push(e.target.id)
    }
    this.setState({allergies: arr})
    console.log(this.state.allergies)
  }

  onOtherClick = (e) => {
    let arr = this.state.others
    if (arr.includes(e.target.id)) {
      arr.splice(arr.indexOf(e.target.id), 1)
    }
    this.setState({others: arr})
    console.log(this.state.others)
  }

  onChange = (e) => {
    this.setState({other: e.target.value.toUpperCase()})
  }

  onEnter = (e) => {
    let x = this.state.other;
    if (e.key === 'Enter' && this.state.other !== "" && this.state.others.indexOf((this.state.other)) === -1) {
      let arr = this.state.others;
      let x = this.state.other;
      x = x.toUpperCase();
      arr.push(x);
      this.setState({others: arr})
      this.setState({other: ""})
      this.setState({error: ""})
    } else if (this.state.others.indexOf(x) !== -1) {
      this.setState({error: "Please enter unique value"})
      this.setState({other: ""})
      console.log(this.state.others)
    }
  }

	render() {
    let {onAllergiesSubmit, onRouteChange} = this.props
    let arr = this.state.others
    let output = arr.map(x => <p onClick={this.onOtherClick} id={x} className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.others.indexOf(x) !== -1 ? this.state.on_color : this.state.off_color, color: this.state.others.includes(x) ? "white" : "gray"}}>{x}</p>)
		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "100vw" : "700px"}}>
				<p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>ALLERGIES</p>
        <p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-80" : "w-50"}`}>You would be surprised how much this information helps</p>
        <div className="tl" style={{ fontSize: 20, background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"95%", "margin-top":"20px"}}>
                <FloatingLabelInput
                  id="other_text"
                  label="Other Allergens"
                  type = "text"
                  value = {this.state.other}
                  onChange = {this.onChange}
                  onKeyDown={this.onEnter}
                  placeholder="List them here and click enter - they should appear below"
                  style={{background:"rgb(243,245,248)"}}
                />
        </div>
        <div className="grid-box pa0 w-100 ma0 mt4">
          {output}
        </div>
        <p className="f4 mt4 red tc">{this.state.error}</p>
        <div className={(isMobile)?"w-90":"w-100"}>
        <p onClick={()=>onAllergiesSubmit(this.state.allergies, this.state.others)} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2 ${(isMobile) ? "w-20" : "w-10"}`} style={{"margin":"auto", "margin-top":"20px"}}><span class="arrow arrow-right"></span></p>
        </div>
      </div>
		)
	}
}


export default Register2;
