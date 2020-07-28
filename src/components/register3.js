import React from "react"
import "./register.css"
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";

class Register3 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			heart_disease: false,
      blood_pressure: false,
      lung_disease: false,
      diabetes: false,
      neuro_disease: false,
      kidney_liver: false,
      cancer: false,
      smoker: 0,
      asthma: false,
      obesity: false,
      weak_immunity: false,
      nota: false,
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
      this.setState({heart_disease: !current_state})
    } else if (x === "n1" || x === "n2") {
      let current_state = this.state.neuro_disease
      this.setState({neuro_disease: !current_state})
    } else if (x==="w1" || x==="w2") {
      let current_state = this.state.weak_immunity
      this.setState({weak_immunity: !current_state})
    }
    console.log(x)
  }

	render() {
    let {onFinalSubmit, onRouteChange} = this.props
    const onSubmit = () => {
      if (this.state.nota) {
        onFinalSubmit("nota")
      } else {
        onFinalSubmit(this.state)
      }
    }

		return(
			<div className={`shadow-3 tl b--light-gray ${(isMobile) ? "ph4" : "ph5"} pb4 bg-white ba Avenir`} style={{margin:"auto", "font-family":"Avenir", width:(isMobile) ? "100vw" : "700px"}}>
			  <p className={`${(isMobile) ? "f2" : "f1"} ml3 mt4 gray mb3`}>MEDICAL HISTORY</p>
        <p className={`f5 ml3 mt2 gray mb4 ${(isMobile) ? "w-90" : "w-50"}`}>Click the boxes that apply to you</p>
        <BrowserView>
          <div className="grid-box pa0 w-100">
            <div onClick={this.onClick} id="heart_disease" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.heart_disease ? this.state.on_color : this.state.off_color, color: this.state.heart_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="h1" className="mv0 f4">HEART DISEASE</p>
              <p onClick={this.onClick2} id="h2" className="f7 mb0 mt1">(coronary artery disease, previous heart attack, heart failure, angina, valvular disease)</p>
            </div>
            <div onClick={this.onClick} id="neuro_disease" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.neuro_disease ? this.state.on_color : this.state.off_color, color: this.state.neuro_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="n1" className="mv0 f4">NEUROLOGICAL DISEASE</p>
              <p onClick={this.onClick2} id="n2" className="f7 mb0 mt1">(dementia, a stroke, seizures or a brain injury)</p>
            </div>
            <p onClick={this.onClick} id="blood_pressure" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.blood_pressure ? this.state.on_color : this.state.off_color, color: this.state.blood_pressure ? "white" : "gray"}}>HIGH BLOOD PRESSURE</p>
            <p onClick={this.onClick} id="kidney_liver" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.kidney_liver ? this.state.on_color : this.state.off_color, color: this.state.kidney_liver ? "white" : "gray"}}>KIDNEY/LIVER FAILURE</p>
            <p onClick={this.onClick} id="lung_disease" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.lung_disease ? this.state.on_color : this.state.off_color, color: this.state.lung_disease ? "white" : "gray"}}>LUNG DISEASE</p>
            <p onClick={this.onClick} id="diabetes" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.diabetes ? this.state.on_color : this.state.off_color, color: this.state.diabetes ? "white" : "gray"}}>DIABETES</p>
            <p onClick={this.onClick} id="cancer" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.cancer ? this.state.on_color : this.state.off_color, color: this.state.cancer ? "white" : "gray"}}>CANCER</p>
            <p onClick={this.onClickSmoke} id="smoker" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{background: this.state.smoker !== 0 ? this.state.on_color : this.state.off_color, color: this.state.smoker !== 0 ? "white" : "gray"}}>SMOKER</p>
            <div onClick={this.onClick} id="weak_immunity" className="tl f4 pointer ml2 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.weak_immunity ? this.state.on_color : this.state.off_color, color: this.state.weak_immunity ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="w1" className="mv0 f4">WEAKENED IMMUNITY DUE TO DISEASE</p>
              <p onClick={this.onClick2} id="w2" className="f7 mb0 mt1">(HIV, sickle cell), or medications (steroid pills)</p>
            </div>
            <div>
              <p onClick={this.onClick} id="asthma" className="tl f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{width: "97%", background: this.state.asthma ? this.state.on_color : this.state.off_color, color: this.state.asthma ? "white" : "gray"}}>ASTHMA</p>
              <p onClick={this.onClick} id="obesity" className="tl mt3 f4 pointer ml2 br2 pv3 ph4 mb0 dib" style={{width: "97%", background: this.state.obesity ? this.state.on_color : this.state.off_color, color: this.state.obesity ? "white" : "gray"}}>OBESITY (XXL+)</p>
            </div>
          </div>
          <p onClick={onSubmit} className="pointer tc mt4 mb0 pv3 f3 shadow-1" style={{"margin-left": "auto","margin-right":"auto", "border-radius":"50%", width:"12%"}}>✓</p>
        </BrowserView>
        <MobileView>
          <div className="pa0 w-100">
            <div onClick={this.onClick} id="heart_disease" className="tc w-100 mb1 f5 pointer ml2 br2 ph4 pv3 mt0 dib" style={{background: this.state.heart_disease ? this.state.on_color : this.state.off_color, color: this.state.heart_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="h1" className="m50 mb1 f5 ph3">HEART DISEASE</p>
              <p onClick={this.onClick2} id="h2" className="f7 mb0 mt1 ph3">(coronary artery disease, previous heart attack, heart failure, angina, valvular disease)</p>
            </div>
            <div onClick={this.onClick} id="neuro_disease" className="tc w-100 mb1 f5 pointer ml2 br2 ph4 pv3 mt0 dib" style={{background: this.state.neuro_disease ? this.state.on_color : this.state.off_color, color: this.state.neuro_disease ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="n1" className="mt0 mb1 f5 ph3">NEUROLOGICAL DISEASE</p>
              <p onClick={this.onClick2} id="n2" className="f7 mb0 ph3 mt1">(dementia, a stroke, seizures or a brain injury)</p>
            </div>
            <p onClick={this.onClick} id="blood_pressure" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 dib" style={{background: this.state.blood_pressure ? this.state.on_color : this.state.off_color, color: this.state.blood_pressure ? "white" : "gray"}}>HIGH BLOOD PRESSURE</p>
            <p onClick={this.onClick} id="kidney_liver" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 dib" style={{background: this.state.kidney_liver ? this.state.on_color : this.state.off_color, color: this.state.kidney_liver ? "white" : "gray"}}>KIDNEY/LIVER FAILURE</p>
            <p onClick={this.onClick} id="lung_disease" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.lung_disease ? this.state.on_color : this.state.off_color, color: this.state.lung_disease ? "white" : "gray"}}>LUNG DISEASE</p>
            <p onClick={this.onClick} id="diabetes" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.diabetes ? this.state.on_color : this.state.off_color, color: this.state.diabetes ? "white" : "gray"}}>DIABETES</p>
            <p onClick={this.onClick} id="cancer" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.cancer ? this.state.on_color : this.state.off_color, color: this.state.cancer ? "white" : "gray"}}>CANCER</p>
            <p onClick={this.onClickSmoke} id="smoker" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.smoker !== 0 ? this.state.on_color : this.state.off_color, color: this.state.smoker !== 0 ? "white" : "gray"}}>SMOKER</p>
            <div onClick={this.onClick} id="weak_immunity" className="tc w-100 mb1 pointer ml1 br2 ph4 pv3 mb0 mt0 dib" style={{background: this.state.weak_immunity ? this.state.on_color : this.state.off_color, color: this.state.weak_immunity ? "white" : "gray"}}>
              <p onClick={this.onClick2} id="w1" className="ph3 mt0 mb1 f5">WEAKENED IMMUNITY DUE TO DISEASE</p>
              <p onClick={this.onClick2} id="w2" className="f7 ph3 mb0 mt1">(HIV, sickle cell), or medications (steroid pills)</p>
            </div>
            <p onClick={this.onClick} id="asthma" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.asthma ? this.state.on_color : this.state.off_color, color: this.state.asthma ? "white" : "gray"}}>ASTHMA</p>
            <p onClick={this.onClick} id="obesity" className="tc w-100 mb1 f5 pointer ml1 br2 pv3 ph4 mb0 dib" style={{background: this.state.obesity ? this.state.on_color : this.state.off_color, color: this.state.obesity ? "white" : "gray"}}>OBESITY(XXL+)</p>
          </div>
          <p onClick={onSubmit} className="pointer tc mt4 mb0 pv3 f3 shadow-1" style={{"margin-left": "auto","margin-right":"auto", "border-radius":"50%", width:"20%"}}>✓</p>
        </MobileView>

      </div>
		)
	}
}

export default Register3;
