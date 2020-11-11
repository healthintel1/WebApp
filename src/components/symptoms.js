import React from "react";
import "./transition.css"
import {isMobile, BrowserView, MobileView, isTablet, isBrowser} from "react-device-detect";
import { CORSDOMAIN } from "./constant"
import FloatingLabelInput from "react-floating-label-input";

class SymptomsForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
				vitals: "",
				symptoms:"",
				personal:"",
				fever:false,
				nose: false,
				chills: false,
				cough: false,
				breath: false,
				throat: false,
				bodyache: false,
				headache: false,
				vomit: false,
				diarrhea: false,
				fatigue: false,
				nota: false,
				on_color: "rgb(127, 90, 179)",
				off_color: "rgb(243,245,248)",
				visible: "",
				bg: "white",
				error:"",
				other: "",
                searchI: "",
				viD: false
		}
	}

	LISTAll = ["ABDOMINAL PAIN-GENERALIZED",
	"ABDOMINAL PAIN-LOWER",
	"ABDOMINAL PAIN-RIGHT LOWER QUADRANT",
	"ABDOMINAL PAIN-UPPER",
	"ABNORMAL ECG",
	"ADDICTION PROBLEM",
	"ADHD",
	"AGGRESSIVE BEHAVIOR",
	"ALCOHOL INTOXICATION",
	"ALCOHOL PROBLEM",
	"ALLEGED DOMESTIC VIOLENCE",
	"ALLEGED SEXUAL ASSAULT",
	"ALTERED MENTAL STATUS",
	"ANEMIA",
	"ANKLE INJURY",
	"ANKLE PAIN",
	"ANOREXIA",
	"ANXIETY",
	"ARM INJURY",
	"ARM PAIN",
	"ARM SWELLING",
	"ARTHRITIS",
	"ASTHMA",
	"BACK INJURY",
	"BACK PAIN",
	"BLOOD INFECTION",
	"BLOOD SUGAR PROBLEM",
	"BRADYCARDIA",
	"BREAST CANCER",
	"BREAST PAIN",
	"BURN",
	"CANCER",
	"CARDIAC ARREST",
	"CEREBROVASCULAR ACCIDENT",
	"CHEMOTHERAPY",
	"CHEST INJURY",
	"CHEST PAIN",
	"CIRCULATORY PROBLEM",
	"CONSTIPATION",
	"CYSTITIS",
	"DEHYDRATION",
	"DENTAL PAIN",
	"DENTAL PROBLEM",
	"DEPRESSION",
	"DIALYSIS",
	"DIZZINESS",
	"DOUBLE VISION",
	"DRUG / ALCOHOL ASSESSMENT",
	"DRUG OVERDOSE",
	"DYSARTHRIA",
	"DYSPHAGIA",
	"DYSURIA",
	"EAR PROBLEM",
	"ECZEMA",
	"EDEMA",
	"ELBOW INJURY",
	"EPISTAXIS",
	"EXCESSIVE SWEATING",
	"EXTREMITY LACERATION",
	"EXTREMITY WEAKNESS",
	"EYE INJURY",
	"EYE PAIN",
	"EYE PROBLEM",
	"EYE SWELLING",
	"EYE TRAUMA",
	"FACIAL LACERATION",
	"FACIAL PAIN",
	"FAILURE TO THRIVE",
	"FLANK PAIN",
	"FOOT AND/OR ANKLE INJURY",
	"FOOT SWELLING",
	"FOREIGN BODY",
	"FOREIGN BODY IN EYE",
	"FOREIGN BODY IN SKIN",
	"FRACTURE",
	"GI BLEEDING",
	"GI PROBLEM",
	"GROIN PAIN",
	"GUN SHOT WOUND",
	"HALLUCINATIONS",
	"HAND AND/OR WRIST INJURY",
	"HEAD INJURY",
	"HEARTBURN",
	"HEMATURIA",
	"HEMOPTYSIS",
	"HEMORRHOIDS",
	"HEPATIC DISEASE",
	"HERNIA",
	"HIP INJURY",
	"HIP PAIN",
	"HOARSE",
	"HYPERTENSION",
	"HYPERVENTILATING",
	"INFECTION",
	"INFLUENZA",
	"INGESTION",
	"INSOMNIA",
	"IRREGULAR HEART BEAT",
	"JAUNDICE",
	"JAW PAIN",
	"JOINT PAIN",
	"JOINT STIFFNESS",
	"JOINT SWELLING",
	"KNEE INJURY",
	"KNEE PAIN",
	"LEG INJURY",
	"LEG LACERATION",
	"LEG PAIN",
	"LEG SWELLING",
	"LOSS OF VISION",
	"LYMPHADENOPATHY",
	"MALE GU PROBLEM",
	"MANIC BEHAVIOR",
	"MASS",
	"MEDICATION NON-COMPLIANCE",
	"MELENA",
	"MEMORY LOSS",
	"MOTOR VEHICLE CRASH",
	"MULTIPLE SCLEROSIS",
	"MUSCLE WEAKNESS",
	"NECK INJURY",
	"NECK MASS",
	"NECK PAIN",
	"NEUROLOGIC PROBLEM",
	"ORTHOTICS AND PROSTHETICS DEVICE",
	"OUTPATIENT PROCEDURE",
	"PAIN",
	"PALPITATIONS",
	"PELVIC PAIN",
	"PNEUMONIA",
	"POSTPARTUM COMPLICATIONS",
	"PREGNANCY - VAGINAL BLEEDING",
	"PSORIASIS",
	"PSYCHIATRIC EVALUATION",
	"PSYCHOSIS",
	"PUNCTURE WOUND",
	"RASH",
	"RECTAL BLEEDING",
	"RECTAL PAIN",
	"RESPIRATORY ARREST",
	"SEIZURES",
	"SELF-INJURIOUS BEHAVIOR",
	"SHOULDER INJURY",
	"SHOULDER PAIN",
	"SINUSITIS",
	"SKIN PROBLEM",
	"SKIN ULCER",
	"SPASMS",
	"SPEECH PROBLEM",
	"SUICIDE ATTEMPT",
	"SUNBURN",
	"SWALLOWED FOREIGN BODY",
	"SYNCOPE",
	"THROAT PROBLEM",
	"TOE INJURY",
	"TOE PAIN",
	"TRAUMA",
	"URI",
	"URINARY CATHETER ISSUE",
	"URINARY INCONTINENCE",
	"URINARY RETENTION",
	"URINARY TRACT INFECTION",
	"URINE ISSUE",
	"VAGINAL BLEEDING",
	"VAGINAL DISCHARGE",
	"WEAKNESS",
	"WEIGHT GAIN",
	"WEIGHT LOSS",
	"WHEEZING"];

	onClick = (e) => {
		if (this.state.nota) {
			this.setState({error: "Cannot choose other when 'None of the Above' is chosen"})
		} else {
			let x = this.state[e.target.id]
	    	this.setState({[e.target.id]: !x})
		}
	  }

	onNotaClick = (e) => {
		if (this.state.nota === true) {
			this.setState({nota: false})
			this.setState({error: ""})
		} else {
			let initial_state = {
				nose: false,
				chills: false,
				cough: false,
				fever:false,
				breath: false,
				throat: false,
				bodyache: false,
				headache: false,
				vomit: false,
				diarrhea: false,
				loss_taste_smell: false,
				fatigue: false,
				nota: true,
				on_color: "rgb(255, 127, 129)",
				off_color: "rgb(243,245,248)",
				visible: true,
				bg: "white",
				other: "",
				error:"",
				message:"",
			}
			this.setState(initial_state)
		}
	}

	componentDidMount() {
		console.log(this.props)
		this.setState({message: ""})
		this.setState({vitals: this.props.vitals})
		this.setState({symptoms: this.props.symptoms})
		this.setState({fever: this.props.fever})
		this.setState({personal: this.props.personal})
		setTimeout(()=>{this.setState({visible: true})}, 25)
		let x = this.props.data
		console.log("loading data")
		this.setState({nose: x.nose})
		this.setState({loss_taste_smell: x.loss_taste_smell})
		this.setState({chills: x.chillsorsweating})
		this.setState({cough: x.coughing})
		this.setState({throat: x.sorethroat})
		this.setState({breath: x.difficultybreathing})
		this.setState({bodyache: x.bodyaches})
		this.setState({headache: x.headache})
		this.setState({vomit: x.vomiting})
		this.setState({diarrhea: x.diarrhea})
		this.setState({fatigue: x.fatiguetiredness})
		this.setState({nota: x.none9})
		this.setState({other: x.bloodpressure1||""})
	}

	updateSentData = () => {
		let senddata = {
			nose: this.state.nose,
			loss_taste_smell: this.state.loss_taste_smell,
			chillsorsweating: this.state.chills,
			coughing: this.state.cough,
			bloodpressure1: this.state.other,
			fever: this.state.fever,
			sorethroat: this.state.throat,
			difficultybreathing: this.state.breath,
			bodyaches: this.state.bodyache,
			headache: this.state.headache,
			vomiting: this.state.vomit,
			diarrhea: this.state.diarrhea,
			fatiguetiredness: this.state.fatigue,
			none9: this.state.nota,
			clientid: this.props.clientid,
			date: `${this.props.Dated}/${this.props.Month}`
		}
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
		        body: JSON.stringify(senddata)
		    };
		fetch(CORSDOMAIN+'/updatevitals2?', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})}, 100)
				setTimeout(()=>{this.props.onDailyUpdate(this.state)}, 500)
				setTimeout(()=>{this.props.refreshCalendar()},500)
	        	})
	        .catch(err=>{
	        	this.setState({message:""})
	        	this.setState({error: "An error occured. Please try again."})
	        })
	}

	sendData = () => {
		let senddata = {
			loss_taste_smell: this.state.loss_taste_smell,
			nose: this.state.nose,
			fever: this.state.fever,
			chillsorsweating: this.state.chills,
			coughing: this.state.cough,
			bloodpressure1: this.state.other,
			sorethroat: this.state.throat,
			difficultybreathing: this.state.breath,
			bodyaches: this.state.bodyache,
			headache: this.state.headache,
			vomiting: this.state.vomit,
			diarrhea: this.state.diarrhea,
			fatiguetiredness: this.state.fatigue,
			none9: this.state.nota,
			clientid: this.props.clientid,
			date: `${this.props.Dated}/${this.props.Month}`
		};
		const requestOptions = {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
		        body: JSON.stringify(senddata)
		    };
		fetch(CORSDOMAIN+'/postvitals?', requestOptions)
	        .then(res=>{
	        	console.log(res)
	        	setTimeout(()=>{this.setState({visible: false})},100)
				setTimeout(()=>{this.props.onDailyUpdate(this.state)},500)
				setTimeout(()=>{this.props.refreshCalendar()},500)
	        })
	        .catch(err=>{
	        	this.setState({message:""})
	        	this.setState({error: "An error occured. Please try again."})
	        })
	};
	onChange = (e) => {
        if (this.state.nota) {
            this.setState({error: "Cannot choose other when 'None of the Above' is chosen"})
        } else this.setState({searchI: e.target.value.toUpperCase()})
	};
	onEnter = (x) => {
		let arr = this.state.other;
		if (arr === ""){
			arr = x
		} else arr = arr+";"+x;
		this.setState({searchI: ""});
        this.setState({other: arr});
        console.log("OTHER ENTER", arr);
        this.setState({error: ""})
	};
	onEnterRemove = (x) => {
		let arr = this.state.other;
		let res = arr.split(";"+x);
		if (res.length === 2){
			arr = res[0]+res[1]
		} else {
			res = arr.split(x);
			if (res.length === 2 && res[1].length > 0){
				arr = res[1].slice(1)
			}
			else {
				arr = ""
			}
		}
		this.setState({other: arr});
		console.log("OTHER REMOVE", arr);
		this.setState({error: ""})
	};
	render() {
		const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
		let {Dated, Month} = this.props;
		const onFinalClick = (e) => {
			if (this.state.loss_taste_smell || 	this.state.nose || this.state.fever || this.state.chills || this.state.cough || this.state.throat || this.state.breath || this.state.bodyache||	this.state.headache || 	this.state.vomit || this.state.diarrhea || this.state.fatigue || this.state.nota || this.state.other !== ""){
				this.setState({error: ""});
				this.setState({message: "Please wait..."})
				this.setState({bg: "rgb(136, 242, 216)"})
				if (this.state.vitals === 0 && this.state.symptoms === 0 && this.state.personal === 0) {
					this.sendData()
				} else {
					this.updateSentData()
				}
			} else {
				this.setState({error: "Please select atleast one option. If you don't have any symptoms then select None."})
			}
		};
		const DropDownC = () => {
			return (
				<div className="dropdown-content" style={{display: this.state.searchI !=="" ? "block":"none"}}>
					{this.LISTAll.map((v) => {
						if (!this.state.other.includes(v) && v.includes(this.state.searchI)){
							return <a onClick={() => this.onEnter(v)}>{v}</a>
						}
					})}
				</div>
			)
		};
		let output = this.state.other.split(";").map(x => x !== "" && <p onClick={(e) => this.onEnterRemove(x)} id={x} className={`pointer mr2 br2 ph2 pv2 mb1 mt1 ${(isMobile) ? "" : "dib"}`} style={{background: "rgb(255, 127, 129)", color:"white"}}>{x}</p>);
		return(
			<div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
			  <div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
			    <div className="w-100 bb bw1 b--light-gray">
            	  <p className={`f5 ${(isMobile)?"ml4":"ml5"} mb3 mt3 light-red dib`}>SYMPTOMS</p>
            	  <p className={`f5 gray mb3 dib ${(isMobile)?"ml6":"ml7"}`}>{monthNames[Month-1]} {Dated}</p>
        	    </div>
				<p className={`f3 ${(isMobile)?"ml4":"ml5"} mt4 gray mb3 pr2`}>DO YOU HAVE ANY OF THESE SYMPTOMS? (Y/N)</p>
		        <p className={`f5 ${(isMobile)?"ml4":"ml5"} mt2 gray w-50 mb3`}>Click the boxes that apply to you</p>
				  {!isMobile && <BrowserView>
					<p className={`f5 ${(isMobile)?"ml4":"ml5"} mt3 light-red dib`} style={{marginBottom: 0}}>Severe symptoms</p>
					<div className="grid-box pa0 w-100">
                        <p onClick={this.onClick} id="fatigue" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.fatigue ? this.state.on_color : this.state.off_color, color: this.state.fatigue ? "white" : "gray"}}>PERSISTANT PAIN/PRESSURE IN CHEST</p>
                        <p onClick={this.onClick} id="diarrhea" className="tl f5 pointer ml1 mr5 br2 pv3 ph4 mb0 dib" style={{background: this.state.diarrhea ? this.state.on_color : this.state.off_color, color: this.state.diarrhea ? "white" : "gray"}}>NEW CONFUSION</p>
                        <p onClick={this.onClick} id="nose" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.nose ? this.state.on_color : this.state.off_color, color: this.state.nose ? "white" : "gray"}}>BLUISH LIPS/FACE</p>
						<p onClick={this.onClick} id="chills" className="tl f5 pointer ml1 mr5 br2 pv3 ph4 mb0 dib" style={{background: this.state.chills ? this.state.on_color : this.state.off_color, color: this.state.chills ? "white" : "gray"}}>INABILITY TO WAKE/STAY AWAKE</p>
						<p onClick={this.onClick} id="breath" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.breath ? this.state.on_color : this.state.off_color, color: this.state.breath ? "white" : "gray"}}>DIFFICULTY IN BREATHING</p>
					</div>
					<p className={`f5 ${(isMobile)?"ml4":"ml5"} mt5 light-red dib`} style={{marginBottom: 0}}>Other symptoms</p>
					<div className="grid-box pa0 w-100">
                        <p onClick={this.onClick} id="fever" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.fever ? this.state.on_color : this.state.off_color, color: this.state.fever ? "white" : "gray"}}>FEVER or CHILLS</p>
                        <p onClick={this.onClick} id="cough" className="tl f5 pointer ml1 mr5 br2 pv3 ph4 mb0 dib" style={{background: this.state.cough ? this.state.on_color : this.state.off_color, color: this.state.cough ? "white" : "gray"}}>COUGH</p>
                        <p onClick={this.onClick} id="bodyache" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.bodyache ? this.state.on_color : this.state.off_color, color: this.state.bodyache ? "white" : "gray"}}>MUSCLE or BODY ACHE</p>
                        <p onClick={this.onClick} id="vomit" className="tl f5 pointer ml1 mr5 br2 pv3 ph4 mb0 dib" style={{background: this.state.vomit ? this.state.on_color : this.state.off_color, color: this.state.vomit ? "white" : "gray"}}>NAUSEA or VOMITING</p>
                        <p onClick={this.onClick} id="loss_taste_smell" className="tl f5 pointer ml5 mr3 br2 pv3 ph4 mb0 dib" style={{background: this.state.loss_taste_smell ? this.state.on_color : this.state.off_color, color: this.state.loss_taste_smell ? "white" : "gray"}}>NEW LOSS OF TASTE OR SMELL</p>
                        <p onClick={this.onClick} id="throat" className="tl f5 pointer ml1 mr5 br2 pv3 ph4 mb0 dib" style={{background: this.state.throat ? this.state.on_color : this.state.off_color, color: this.state.throat ? "white" : "gray"}}>SHORTNESS OF BREATH</p>
			        </div>
					<div className="pa0 ml5 mr5" style={{ background:"rgb(243,245,248)", marginTop: "15px", padding:"10px 10px", "border-radius":"0.25rem"}}>
						<FloatingLabelInput
							id="other_symp_txt"
							label="Search Other Symptoms"
							type = "text"
							value = {this.state.searchI}
							onChange = {this.onChange}
							style={{background:"rgb(243,245,248)"}}
						/>
						{DropDownC()}
					</div>
					<div className="pa0 ml5 mr5" style={{margin: "10px 4rem"}}>
						{output}
					</div>
					<p onClick={this.onNotaClick} id="nota" className="grid-box pa0 tc f5 pointer ml5 mr1 mt5 br2 pv3 ph4 mb2 dib" style={{background: this.state.nota ? this.state.on_color : this.state.off_color, color: this.state.nota ? "white" : "gray", width:"80%"}}>NONE OF THE ABOVE</p>
					<p className="f5 mt4 b red tc">{this.state.error}</p>
			        <p className="f5 mt4 dark-blue tc">{this.state.message}</p>
			        <div className="mt5 mb3">
			          <p onClick={onFinalClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"10%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
			        </div>
		        </BrowserView>}
				  {!(isTablet || isBrowser ) && <MobileView>
					<p className={`f5 ${(isMobile)?"ml4":"ml5"} mt3 light-red dib`} style={{marginBottom: 20}}>Severe symptoms</p>
					<div className="pa2 w-100 tc">
						<p onClick={this.onClick} id="fatigue" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.fatigue ? this.state.on_color : this.state.off_color, color: this.state.fatigue ? "white" : "gray"}}>PERSISTANT PAIN/PRESSURE IN CHEST</p>
						<p onClick={this.onClick} id="diarrhea" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.diarrhea ? this.state.on_color : this.state.off_color, color: this.state.diarrhea ? "white" : "gray"}}>NEW CONFUSION</p>
						<p onClick={this.onClick} id="nose" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px", background: this.state.nose ? this.state.on_color : this.state.off_color, color: this.state.nose ? "white" : "gray"}}>BLUISH LIPS/FACE</p>
						<p onClick={this.onClick} id="chills" className="tc f5 pointer ml3 mr5 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.chills ? this.state.on_color : this.state.off_color, color: this.state.chills ? "white" : "gray"}}>INABILITY TO WAKE/STAY AWAKE</p>
						<p onClick={this.onClick} id="breath" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.breath ? this.state.on_color : this.state.off_color, color: this.state.breath ? "white" : "gray"}}>DIFFICULTY IN BREATHING</p>
					</div>
					<p className={`f5 ${(isMobile)?"ml4":"ml5"} mt3 light-red dib`} style={{marginBottom: 20}}>Other symptoms</p>
					<div className="pa2 w-100 tc">
						<p onClick={this.onClick} id="fever" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px", background: this.state.fever ? this.state.on_color : this.state.off_color, color: this.state.fever ? "white" : "gray"}}>FEVER or CHILLS</p>
						<p onClick={this.onClick} id="cough" className="tc f5 pointer ml3 mr5 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.cough ? this.state.on_color : this.state.off_color, color: this.state.cough ? "white" : "gray"}}>COUGH</p>
						<p onClick={this.onClick} id="bodyache" className="tc f5 pointer ml3 mr5 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.bodyache ? this.state.on_color : this.state.off_color, color: this.state.bodyache ? "white" : "gray"}}>MUSCLE or BODY ACHE</p>
						<p onClick={this.onClick} id="vomit" className="tc f5 pointer ml3 mr5 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.vomit ? this.state.on_color : this.state.off_color, color: this.state.vomit ? "white" : "gray"}}>NAUSEA or VOMITING</p>
						<p onClick={this.onClick} id="loss_taste_smell" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px", background: this.state.loss_taste_smell ? this.state.on_color : this.state.off_color, color: this.state.loss_taste_smell ? "white" : "gray"}}>NEW LOSS OF TASTE OR SMELL</p>
						<p onClick={this.onClick} id="throat" className="tc f5 pointer ml3 mr5 br2 pv3 ph4 mb2 w-70" style={{margin:"auto", "margin-bottom":"10px",background: this.state.throat ? this.state.on_color : this.state.off_color, color: this.state.throat ? "white" : "gray"}}>SHORTNESS OF BREATH</p>
					</div>
					<div className="pa0 ml5 mr5" style={{ background:"rgb(243,245,248)", marginTop: "10px", padding:"10px 10px", "border-radius":"0.25rem"}}>
						<FloatingLabelInput
							id="other_symp_txt"
							label="Search Other Symptoms"
							type = "text"
							value = {this.state.searchI}
							onChange = {this.onChange}
							style={{background:"rgb(243,245,248)"}}
						/>
						{DropDownC()}
					</div>
					<div className="pa0 ml5 mr5" style={{marginBottom: 10}}>
						{output}
					</div>
					<p onClick={this.onNotaClick} id="nota" className="tc f5 pointer ml3 mr3 br2 pv3 ph4 mb2 w-70" style={{margin:"20px auto 10px", background: this.state.nota ? this.state.on_color : this.state.off_color, color: this.state.nota ? "white" : "gray"}}>NONE OF THE ABOVE</p>
					<p className="f6 mt4 b red ph4 tc">{this.state.error}</p>
			        <p className="f6 mt4 dark-blue ph4 tc">{this.state.message}</p>
			        <div className="mt5 mb3">
			          <p onClick={onFinalClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"15%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
			        </div>
		        </MobileView>}
		      </div>
		    </div>
		)
	}
}

export default SymptomsForm;
