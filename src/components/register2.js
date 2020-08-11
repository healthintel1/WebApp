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
      drugallergies:[],
      others: [],
      on_color:"rgb(255, 127, 129)",
      off_color:"rgb(243,245,248)",
      other: "",
      otherd: "",
      error: "",
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

  onOtherClick = (t, e) => {
    let arr = t?this.state.drugallergies:this.state.others
    if (arr.includes(e.target.id)) {
      arr.splice(arr.indexOf(e.target.id), 1)
    }
    if (t){
        this.setState({drugallergies: arr})
    } else{
        this.setState({others: arr})
    }
    console.log(this.state.others, this.state.drugallergies)
  }

  onChange = (e) => {
    this.setState({other: e.target.value.toUpperCase()})
  }

  onChangeDrug = (e) => {
    this.setState({otherd: e.target.value.toUpperCase()})
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

  onEnterAllergies = (e) => {
    let x = this.state.otherd;
    if (e.key === 'Enter' && this.state.otherd !== "" && this.state.drugallergies.indexOf((this.state.otherd)) === -1) {
        let arr = this.state.drugallergies;
        let x = this.state.otherd;
        x = x.toUpperCase();
        arr.push(x);
        this.setState({drugallergies: arr})
        this.setState({otherd: ""})
        this.setState({error: ""})
    } else if (this.state.drugallergies.indexOf(x) !== -1) {
        this.setState({error: "Please enter unique value"})
        this.setState({otherd: ""})
        console.log(this.state.drugallergies)
    }
  };

  render() {
    let {onAllergiesSubmit, onRouteChange} = this.props;
    let drr = this.state.drugallergies;
    let drugoutput = drr.map(x => <p onClick={(e) => this.onOtherClick(true, e)} id={x} className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.drugallergies.indexOf(x) !== -1 ? this.state.on_color : this.state.off_color, color: this.state.drugallergies.includes(x) ? "white" : "gray"}}>{x}</p>)
    let output = this.state.others.map(x => <p onClick={(e) => this.onOtherClick(false, e)} id={x} className={`${(isMobile) ? "f5" : "f4"} pointer ml2 br2 ph4 pv3 mb0 mt0 dib`} style={{background: this.state.others.indexOf(x) !== -1 ? this.state.on_color : this.state.off_color, color: this.state.others.includes(x) ? "white" : "gray"}}>{x}</p>)
		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "100vw" : "700px"}}>
				<p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>ALLERGIES</p>
                <p className={`f6 ml3 mt2 gray mb3 ${(isMobile) ? "w-80" : "w-80"}`} style={{fontSize: '120%'}}>List them and click enter - they should appear below. If you don't have any allergies you can procede to next screen.</p>
        <p className={`f6 ml3 mt2 ${(isMobile) ? "w-80" : "w-80"}`} style={{fontSize: '120%', "margin-top":"20px", marginBottom: 5}}>Drug Allegries</p>
        <div className="grid-box pa0 w-100 ma0" style={{marginBottom: 20}}>
            {drugoutput}
        </div>
        <div className="tl" style={{ fontSize: 20, background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"95%"}}>
            <FloatingLabelInput
                id="other_text"
                label="Drug Allergies"
                type = "text"
                value = {this.state.otherd}
                onChange = {this.onChangeDrug}
                onKeyDown={this.onEnterAllergies}
                placeholder="List them here and click enter - they should appear below"
                style={{background:"rgb(243,245,248)"}}
            />
        </div>
        <p className={`f6 ml3 mt2 ${(isMobile) ? "w-80" : "w-80"}`} style={{fontSize: '120%', "margin-top":"20px", marginBottom: 5}}>Other Allegries</p>
        <div className="grid-box pa0 w-100 ma0" style={{marginBottom: 20}}>
          {output}
        </div>
        <div className="tl" style={{ fontSize: 20, background:"rgb(243,245,248)", padding:"20px 20px", "border-radius":"15px", width:"95%"}}>
            <FloatingLabelInput
                id="other_text"
                label="Other Allergies"
                type = "text"
                value = {this.state.other}
                onChange = {this.onChange}
                onKeyDown={this.onEnter}
                placeholder="List them here and click enter - they should appear below"
                style={{background:"rgb(243,245,248)"}}
            />
        </div>
        <p className="f4 mt4 red tc">{this.state.error}</p>
        <div className={(isMobile)?"w-90":"w-100"} style={{display: 'flex', flexDirection: 'row'}}>
            <p onClick={() => onRouteChange("account11")}
               className={`br-100 purple ph3 pv3 shadow-2 pointer mt2 ${(isMobile) ? "w-20" : "w-10"}`}
               style={{"margin": "auto", "margin-top": "20px"}}><span className="arrow arrow-left"></span></p>
            <p onClick={()=>onAllergiesSubmit(this.state.drugallergies, this.state.others)} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2 ${(isMobile) ? "w-20" : "w-10"}`} style={{"margin":"auto", "margin-top":"20px"}}><span class="arrow arrow-right"></span></p>
        </div>
      </div>
		)
	}
}


export default Register2;
