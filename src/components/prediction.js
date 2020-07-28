import React from "react"
import "./transition.css"
import Graph from "./graph.js"
import {isMobile, BrowserView, MobileView} from "react-device-detect"

class Prediction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: "",
            dates:"",
            esi:"",
            psi:"",
            riskf:"",
            today_risk:"",
            output:"",
            data:"",
        }
    }

    componentDidMount() {
        var today = new Date()
        let arr = []
        let r
        setTimeout(()=>{this.setState({visible: true})}, 25)
        let x = this.props.data
        console.log(x)
        let dates=[], esis=[], psis=[], risks=[]
        for (let i=0; i<8; i++) {
            arr.push(`${today.getDate()}/${today.getMonth()+1}`)
            today.setDate(today.getDate()-1)
            let a = x[i]
            if (a !== "" && a!== undefined) {                
                console.log(a)
                a = a.split(",")
                dates.push(a[0])
                esis.push(parseFloat(a[1]))
                psis.push(parseFloat(a[2]))
                risks.push(parseFloat(a[3]))
                if (`${this.props.Dated}/${this.props.Month}` === a[0]) {
                    r=parseFloat(a[3])
                    this.setState({today_risk: parseFloat(a[3])})
                }
            }
            if (r <= 0.25) {
                this.setState({output: "LOW RISK"})
            } else if (r >= 0.75) {
                this.setState({output: "HIGH RISK"})
            } else {
                this.setState({output: "MEDIUM RISK"})
            }
            this.setState({dates: dates})
            this.setState({esi: esis})
            this.setState({psi: psis})
            this.setState({riskf: risks})
            let dataset = [
              {
                name: arr[0], riskfactor: risks[dates.indexOf(arr[0])]
              },
              {
                name: arr[1], riskfactor: risks[dates.indexOf(arr[1])]
              },
              {
                name: arr[2], riskfactor: risks[dates.indexOf(arr[2])]
              },
              {
                name: arr[3], riskfactor: risks[dates.indexOf(arr[3])]
              },
              {
                name: arr[4], riskfactor: risks[dates.indexOf(arr[4])]
              },
              {
                name: arr[5], riskfactor: risks[dates.indexOf(arr[5])]
              },
              {
                name: arr[6], riskfactor: risks[dates.indexOf(arr[6])]
              },
            ];
            this.setState({data: dataset})
        }
    }

    render() {
      console.log(this.state.riskf)
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
      return (
        <div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ${(isMobile)?"ml4":"ml5"} mb3 mt3 dark-gray dib`} style={{"margin-right":"10rem"}}>ALGORITHM BASED PREDICTION <p className={`f5 gray mb3 dib ${(isMobile)?"ml4":"ml6"}`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p></p>
                </div>
                <BrowserView>
                    <div style={{display:"flex", "flex-wrap":"wrap"}}>
                        <p className={`${(this.state.output === "MEDIUM RISK" ? "w-50 ml4" : "w-40 ml5")} mt4 dib`} style={{"font-size":"72px", "font-weight":"500", color: "rgb(127,90,179)", "line-height":"1.6"}}>{this.state.output}</p>
                        <img className="dib pt3 w-40" src="https://i.ibb.co/j45jqDj/Screenshot-2020-06-15-at-10-40-39-PM.png"/>
                    </div>
                </BrowserView>
                <MobileView>
                    <p className="ml5 mt4 mb0 w-80 f1" style={{"font-weight":"500", color: "rgb(127,90,179)", "line-height":"1.6"}}>{this.state.output}</p>
                    <img className="ml4 w-80" src="https://i.ibb.co/j45jqDj/Screenshot-2020-06-15-at-10-40-39-PM.png"/>
                </MobileView>
                <div>
                    <p className={`f3 dark-gray ml4 mt4 b ${(isMobile)?"w-80":""}`}>Don't Panic. Go to a medical professional.</p>
                    <p className={`f5 gray ml4 mr6 ${(isMobile)?"w-80":""}`} style={{"line-height":"1.5"}}>This just means that you should go checked out. There is a high enough likelihood that based on your symptoms you have Coronavirus for you to go to a hospital and get tested. Come back and update so we can keep updating our predictions</p>
                </div>
                <div className="w-100 bt bb bw1 b--light-gray mt4">
                    <p className={`f5 ${(isMobile)?"ml4":"ml5"} mt2 mb2 dark-gray dib`}>NEXT STEPS</p>
                </div>
                <div className={`${(isMobile)?"ml4":"ml5"} list-div mv3`}>
                    <span>1</span>  Start to quarantine yourself
                </div>
                <div className={`${(isMobile)?"ml4":"ml5"} list-div mv3`}>
                    <span>2</span>  Visit the nearest hospital to get tested further
                </div>
                <div className="w-100 bt bb bw1 b--light-gray mt3">
                    <p className={`f5 ${(isMobile)?"ml4":"ml5"} mt2 mb2 dark-gray dib`}>LINKS</p>
                </div>
                <BrowserView>
                    <div style={{margin:"auto"}} className="tc">
                        <p className="mt3 f5 dim pointer ph3 pv3 mb2 b dib white bg-light-red">CALL THE DOCTOR</p>
                        <p className="ml2 mt3 f5 dim pointer ph4 pv3 mb2 b dib white bg-gray">LINK TO CDC</p>
                        <p className="ml2 mt3 f5 dim pointer ph3 pv3 mb2 b dib white" style={{"background":"rgb(206,211,255)"}}>DIRECTIONS TO ER</p>
                    </div>
                </BrowserView>
                <MobileView>
                    <p className="ml4 tc w-60 mt3 f5 dim pointer ph4 pv3 mb1 b dib white bg-light-red">CALL THE DOCTOR</p>
                    <p className="ml4 tc w-60 mt2 f5 dim pointer ph4 pv3 mb1 b dib white bg-gray">LINK TO CDC</p>
                    <p className="ml4 tc w-60 mt2 f5 dim pointer ph4 pv3 mb2 b dib white" style={{"background":"rgb(206,211,255)"}}>DIRECTIONS TO ER</p> 
                </MobileView>
            </div>
            <div className="mt4">
                    <Graph Dated={this.props.Dated} Month={this.props.Month} data={this.state.data}/>
                </div>
        </div>
      )
    }
}

export default Prediction;