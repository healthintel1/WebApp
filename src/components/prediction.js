import React from "react"
import "./transition.css"
import Graph from "./graph.js"
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"

class Prediction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: "",
            dates:"",
            esi:"",
            risk:"",
            today_risk:"",
            output:{head:"", body:"", sub:""},
            data:"",
        }
    }

    componentDidMount() {
        var today = new Date()
        let arr = []
        let r
        setTimeout(()=>{this.setState({visible: true})}, 25)
        let x = this.props.data
        console.log("DATA", x)
        let dates=[], esis=[], bools=[]
        for (let i=0; i<8; i++) {
            arr.push(`${today.getDate()}/${today.getMonth() + 1}`)
            today.setDate(today.getDate() - 1)
            let a = x[i]
            if (a !== "" && a !== undefined) {
                console.log(a)
                a = a.split(",")
                dates.push(a[0])
                esis.push((a[1]))
                if (a[1] === "red"){
                    bools.push(4)
                } else if (a[1] === "yellow"){
                    bools.push(2)
                } else if (a[1] === "green"){
                    bools.push(1)
                } else if (a[1] === "orange") {
                    bools.push(3)
                } else {
                    bools.push(0)
                }

                if (`${this.props.Dated}/${this.props.Month}` === a[0]) {
                    r = a[1]
                    this.setState({today_risk: a[1]})
                }
            }
        }
        if (r === "green") {
            this.setState({
                output: {
                    head: "Green", sub: "You seem to be feeling okay",
                    body: "The analysis of the temperature, heart rate and oxygen saturation data provided are within normal ranges. Continue to monitor your health and contact your health care provider for advice if you get new symptoms or if you have close contact with someone with lab-confirmed COVID-19"
                }
            })
        } else if (r === "yellow") {
            this.setState({
                output: {
                    head: "Yellow", sub: "",
                    body: "Continue to monitor your health and contact your health care provider for advice if you get new symptoms or if you have close contact with someone with lab-confirmed COVID-19."
                }
            })
        } else if (r === "red") {
            this.setState({
                output: {
                    head: "Red", sub: "Stay home and take care of yourself",
                    body: "According to the CDC guidelines, the analysis of the data you entered indicates immediate medical attention may be necessary. Please contact your healthcare provider to discuss next steps. If your healthcare provider is not available, contact 911 or go to the emergency department."
                }
            })
        } else if (r === "orange") {
            this.setState({
                output: {
                    head: "Orange", sub: "Contact your healthcare provider ASAP",
                    body: "Please contact your healthcare provider as soon as possible. Stay home and take care of yourself- The analysis of your temperature, heart rate and oxygen saturation data provided indicates that a more thorough exam needs to be performed by a healthcare provider to determine further action"
                }
            })
        } else {
            this.setState({
                output: {
                    head: "--", sub: "--",
                    body: "Revisit this date again, we don't have anything to show here."
                }
            })
        }

        this.setState({dates: dates})
        this.setState({esi: esis})
        this.setState({risk: bools})
        function spll(str){
            const aarr = str.split("/")
            return aarr[1]+"/"+aarr[0]
        }
        let dataset = [
          {
            name: spll(arr[0]), riskfactor: bools[dates.indexOf(arr[0])]
          },
          {
            name: spll(arr[1]), riskfactor: bools[dates.indexOf(arr[1])]
          },
          {
            name: spll(arr[2]), riskfactor: bools[dates.indexOf(arr[2])]
          },
          {
            name: spll(arr[3]), riskfactor: bools[dates.indexOf(arr[3])]
          },
          {
            name: spll(arr[4]), riskfactor: bools[dates.indexOf(arr[4])]
          },
          {
            name: spll(arr[5]), riskfactor: bools[dates.indexOf(arr[5])]
          },
          {
            name: spll(arr[6]), riskfactor: bools[dates.indexOf(arr[6])]
          },
        ];
        this.setState({data: dataset})
    }

    render() {
      console.log(this.state);
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
      return (
        <div style={{display: 'flex', height: 'max-content'}} className={`w-100 mb3 flex ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ${(isMobile)?"ml4":"ml5"} mb3 mt3 dark-gray dib`} style={{"margin-right":"10rem"}}><p className={`f5 gray mb3 dib ${(isMobile)?"ml4":""}`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p></p>
                </div>
                {<BrowserView>
                    <div style={{display:"flex", "flex-wrap":"wrap"}}>
                        <p className={`${("w-80 ml5")} mt4 dib`} style={{"font-size":"72px", "font-weight":"500", color: this.state.output.head, "line-height":"1.6"}}>{this.state.output.head} Status</p>
                    </div>
                </BrowserView>}
                { <MobileView>
                    <p className="ml5 mt4 mb0 w-80 f1" style={{"font-weight":"500", color: this.state.output.head, "line-height":"1.6"}}>{this.state.output.head} Status</p>
                </MobileView>}
                <div>
                    <p className={`f3 dark-gray ml4 mt4 b ${(isMobile)?"w-80":""}`}>{this.state.output.sub}</p>
                    <p className={`f5 gray ml4 mr6 ${(isMobile)?"w-80":""}`} style={{"line-height":"1.5"}}>{this.state.output.body}</p>
                </div>
            </div>
            <div className="mt4 flex">
                <Graph Dated={this.props.Dated} Month={this.props.Month} data={this.state.data}/>
            </div>
        </div>
      )
    }
}

export default Prediction;
