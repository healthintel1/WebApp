import React from "react"
import "./register.css"
import FloatingLabelInput from 'react-floating-label-input';
import {  
  isBrowser,
  isMobile
} from "react-device-detect";
import {navigate} from "gatsby";

class UpdateAllergies extends React.Component {
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
  }

  onOtherClick = (e) => {
    let arr = this.state.others
    if (arr.includes(e.target.id)) {
      arr.splice(arr.indexOf(e.target.id), 1)
    } 
    this.setState({others: arr})
  }

  onChange = (e) => {
    this.setState({other: e.target.value.toUpperCase()})
  }

  componentDidMount() {
    this.setState(this.props.data)
    let al = this.props.data.allergies9
    al = al.split(", ")
    for (let i =0; i < al.length; i++) {
      if (al[i].substring(0,6) === "Option") {
        let arr = this.state.allergies
        arr.push(al[i].toLowerCase())
        this.setState({allergies: arr})
      } else {
        let arr = this.state.others
        arr.push(al[i].toUpperCase())
        this.setState({others: arr})
      }
    }
    
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

  onSubmit = () => {
      let arr1 = this.state.allergies
      let arr2 = this.state.others
      arr1 = arr1.concat(arr2)
      arr1 = arr1.join(",")
      let x = this.state
      x.allergies9 = arr1
      console.log(x)
      navigate("/updating", {state: {data: x}})

  }

	render() {
    console.log(this.state)

    let arr = this.state.others
    let output = arr.map(x => <p onClick={this.onOtherClick} id={x} className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.others.indexOf(x) !== -1 ? this.state.on_color : this.state.off_color, color: this.state.others.includes(x) ? "white" : "gray"}}>{x}</p>)
		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "85vw" : "700px", "margin-top":"50px"}}>
				<p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>ALLERGIES</p>
        <p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-80" : "w-50"}`}>You would be surprised how much this information helps</p>
        <div className="grid-box pa0 w-100 ma0">
          <p onClick={this.onClick} id="option1" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.indexOf("option1") !== -1 ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option1") ? "white" : "gray"}}>Option 1</p>
          <p onClick={this.onClick} id="option2" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.includes("option2") ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option2") ? "white" : "gray"}}>Option 2</p>
          <p onClick={this.onClick} id="option3" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.indexOf("option3") !== -1 ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option3") ? "white" : "gray"}}>Option 3</p>
          <p onClick={this.onClick} id="option4" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.includes("option4") ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option4") ? "white" : "gray"}}>Option 4</p>
          <p onClick={this.onClick} id="option5" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.indexOf("option5") !== -1 ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option5") ? "white" : "gray"}}>Option 5</p>
          <p onClick={this.onClick} id="option6" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.includes("option6") ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option6") ? "white" : "gray"}}>Option 6</p>
          <p onClick={this.onClick} id="option7" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.indexOf("option7") !== -1 ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option7") ? "white" : "gray"}}>Option 7</p>
          <p onClick={this.onClick} id="option8" className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.allergies.includes("option8") ? this.state.on_color : this.state.off_color, color: this.state.allergies.includes("option8") ? "white" : "gray"}}>Option 8</p>
          {output}
        </div>
        <p className="mt4 ml2 mb1 gray gender">Add Additional Allergens</p>
        <div className="tl" style={{ fontSize: 20, background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"95%", "margin-top":"20px"}}>
                <FloatingLabelInput
                  id="other_text"
                  label="Other Allergens"
                  type = "text"
                  value = {this.state.other}
                  onChange = {this.onChange}
                  onKeyDown={this.onEnter}
                  placeholder="List them here and click enter - they should appear above"
                  style={{background:"rgb(243,245,248)"}}
                />
        </div>
        <p className="f4 mt4 red tc">{this.state.error}</p>
        <p onClick={this.onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2`} style={{"margin":"auto", "margin-top":"20px", width: (isMobile) ? "15%" : "10%"}}>✓</p>
      </div>
		)
	}
}


export default UpdateAllergies;