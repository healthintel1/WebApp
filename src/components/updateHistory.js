import React from "react"
import "./register.css"
import {  
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {navigate} from "gatsby";

class UpdateHistory extends React.Component {
	constructor(props) {
		super(props)
		this.state = {			
      on_color:"rgb(255, 127, 129)",
      off_color:"rgb(243,245,248)",
		}
	}

  onClick = (e) => {
    let x = this.state[e.target.id]
    this.setState({[e.target.id]: !x})
    console.log(e.target.id)
    console.log(!x)
  }
  
  onClickSmoke = (e) => {
    let x = this.state[e.target.id]
    if (x === 0) this.setState({[e.target.id]: 2});
    else this.setState({[e.target.id]: 0});
    console.log(e.target.id)
  }

  onClick2 = (e) => {
    let x = e.target.id
    if (x === "h1" || x === "h2") {
      let current_state = this.state.heart_disease
      this.setState({heartdisease: !current_state})
    } else if (x === "n1" || x === "n2") {
      let current_state = this.state.neuro_disease
      this.setState({neurologicaldisease: !current_state})
    } else if (x==="w1" || x==="w2") {
      let current_state = this.state.weak_immunity
      this.setState({weakenedimmunity: !current_state})
    }
  }

  componentDidMount() {
    this.setState(this.props.data)
  }

	render() {
    const onSubmit=()=> {
      navigate("/updating", {state: {data: this.state}})
    }
    
		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "85vw" : "700px", "margin-top":"50px"}}>
			  <p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>MEDICAL HISTORY</p>
        <p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-90" : "w-50"}`}>Click the boxes that apply to you</p>
        <BrowserView>
          <div className="grid-box pa0 w-100">
            <div onClick={this.onClick} id="heartdisease" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.heartdisease ? this.state.on_color : this.state.off_color, color: this.state.heartdisease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="h1" className="mv0 f4">HEART DISEASE</p>
              <p onClick={this.onClick2} id="h2" className="f7 mb0 mt1">(coronary artery disease, previous heart attack, heart failure, angina, valvular disease)</p>
            </div>
            <div onClick={this.onClick} id="neurologicaldisease" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.neurologicaldisease ? this.state.on_color : this.state.off_color, color: this.state.neurologicaldisease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="n1" className="mv0 f4">NEUROLOGICAL DISEASE</p>
              <p onClick={this.onClick2} id="n2" className="f7 mb0 mt1">(dementia, a stroke, seizures or a brain injury)</p>
            </div>
            <p onClick={this.onClick} id="highbloodpressure" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.highbloodpressure ? this.state.on_color : this.state.off_color, color: this.state.highbloodpressure ? "white" : "gray"}}>HIGH BLOOD PRESSURE</p>
            <p onClick={this.onClick} id="kidneyliverfailure" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.kidneyliverfailure ? this.state.on_color : this.state.off_color, color: this.state.kidneyliverfailure ? "white" : "gray"}}>KIDNEY/LIVER FAILURE</p> 
            <p onClick={this.onClick} id="lungdisease" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.lungdisease ? this.state.on_color : this.state.off_color, color: this.state.lungdisease ? "white" : "gray"}}>LUNG DISEASE</p>
            <p onClick={this.onClick} id="diabetes" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.diabetes ? this.state.on_color : this.state.off_color, color: this.state.diabetes ? "white" : "gray"}}>DIABETES</p>   
            <p onClick={this.onClick} id="cancer" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.cancer ? this.state.on_color : this.state.off_color, color: this.state.cancer ? "white" : "gray"}}>CANCER</p>
            <p onClick={this.onClickSmoke} id="smoker" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.smoker !== 0 ? this.state.on_color : this.state.off_color, color: this.state.smoker !== 0 ? "white" : "gray"}}>SMOKER</p>
            <div onClick={this.onClick} id="weakenedimmunity" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.weakenedimmunity ? this.state.on_color : this.state.off_color, color: this.state.weakenedimmunity ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="w1" className="mv0 f4">WEAKENED IMMUNITY DUE TO DISEASE</p>
              <p onClick={this.onClick2} id="w2" className="f7 mb0 mt1">(HIV, sickle cell), or medications (steroid pills)</p>
            </div>
            <div>
              <p onClick={this.onClick} id="asthma" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{width: "97%", background: this.state.asthma ? this.state.on_color : this.state.off_color, color: this.state.asthma ? "white" : "gray"}}>ASTHMA</p>
              <p onClick={this.onClick} id="severeobesity" className="tl mt3 f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{width: "97%", background: this.state.severeobesity ? this.state.on_color : this.state.off_color, color: this.state.severeobesity ? "white" : "gray"}}>OBESITY (XXL+)</p>
            </div>
          </div>
          <p onClick={onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2`} style={{"margin":"auto", "margin-top":"20px", width: (isMobile) ? "15%" : "10%"}}>✓</p>
        </BrowserView>
        <MobileView>
          <div className="pa0 w-100">
            <div onClick={this.onClick} id="heartdisease" className="tc w-100 mb1 f5 pointer ml2 br2 ph4 pv3 mt0 dib" style={{background: this.state.heart_disease ? this.state.on_color : this.state.off_color, color: this.state.heart_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="h1" className="m50 mb1 f5 ph3">HEART DISEASE</p>
              <p onClick={this.onClick2} id="h2" className="f7 mb0 mt1 ph3">(coronary artery disease, previous heart attack, heart failure, angina, valvular disease)</p>
            </div>
            <div onClick={this.onClick} id="neurologicaldisease" className="tc w-100 mb1 f5 pointer ml2 br2 ph4 pv3 mt0 dib" style={{background: this.state.neuro_disease ? this.state.on_color : this.state.off_color, color: this.state.neuro_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="n1" className="mt0 mb1 f5 ph3">NEUROLOGICAL DISEASE</p>
              <p onClick={this.onClick2} id="n2" className="f7 mb0 ph3 mt1">(dementia, a stroke, seizures or a brain injury)</p>
            </div>
            <p onClick={this.onClick} id="highbloodpressure" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 dib" style={{background: this.state.blood_pressure ? this.state.on_color : this.state.off_color, color: this.state.blood_pressure ? "white" : "gray"}}>HIGH BLOOD PRESSURE</p>
            <p onClick={this.onClick} id="kidneyliverfailure" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 dib" style={{background: this.state.kidney_liver ? this.state.on_color : this.state.off_color, color: this.state.kidney_liver ? "white" : "gray"}}>KIDNEY/LIVER FAILURE</p> 
            <p onClick={this.onClick} id="lungdisease" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.lung_disease ? this.state.on_color : this.state.off_color, color: this.state.lung_disease ? "white" : "gray"}}>LUNG DISEASE</p>
            <p onClick={this.onClick} id="diabetes" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.diabetes ? this.state.on_color : this.state.off_color, color: this.state.diabetes ? "white" : "gray"}}>DIABETES</p>   
            <p onClick={this.onClick} id="cancer" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.cancer ? this.state.on_color : this.state.off_color, color: this.state.cancer ? "white" : "gray"}}>CANCER</p>
            <p onClick={this.onClickSmoke} id="smoker" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.smoker !== 0 ? this.state.on_color : this.state.off_color, color: this.state.smoker !== 0 ? "white" : "gray"}}>SMOKER</p>
            <div onClick={this.onClick} id="weakenedimmunity" className="tc w-100 mb1 pointer ml1 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.weak_immunity ? this.state.on_color : this.state.off_color, color: this.state.weak_immunity ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="w1" className="ph3 mt0 mb1 f5">WEAKENED IMMUNITY DUE TO DISEASE</p>
              <p onClick={this.onClick2} id="w2" className="f7 ph3 mb0 mt1">(HIV, sickle cell), or medications (steroid pills)</p>
            </div>
            <p onClick={this.onClick} id="asthma" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.asthma ? this.state.on_color : this.state.off_color, color: this.state.asthma ? "white" : "gray"}}>ASTHMA</p>
            <p onClick={this.onClick} id="severeobesity" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.obesity ? this.state.on_color : this.state.off_color, color: this.state.obesity ? "white" : "gray"}}>OBESITY(XXL+)</p>
          </div>
          <p onClick={onSubmit} className={`br-100 purple ph3 pv3 shadow-2 pointer mt2`} style={{"margin":"auto", "margin-top":"20px", width: (isMobile) ? "15%" : "10%"}}>✓</p>
        </MobileView>
      </div>
		)
	}
}

export default UpdateHistory;
