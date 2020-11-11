import React from "react"
import "./transition.css"
import Graph from "./graph.js"
import {isMobile, BrowserView, MobileView, isTablet, isBrowser} from "react-device-detect"

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
                    bools.push(3)
                } else if (a[1] === "yellow"){
                    bools.push(2)
                } else if (a[1] === "green"){
                    bools.push(1)
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
                    head: "Green", sub: "",
                    body: "You seem to be feeling okay- The analysis of the temperature, heart rate and oxygen saturation data provided are within normal ranges. Continue to monitor your health and contact your health care provider for advice if you get new symptoms or if you have close contact with someone with lab-confirmed COVID-19.\n"
                }
            })
        } else if (r === "yellow") {
            this.setState({
                output: {
                    head: "Yellow", sub: "",
                    body: "The temperature, heart rate and oxygen saturation data were insufficient to complete an analysis. Please provide another set of readings within four hours to repeat the analysis."
                }
            })
        } else {
            this.setState({
                output: {
                    head: "Red", sub: "Stay home and take care of yourself",
                    body: "The analysis of your temperature, heart rate and oxygen saturation data provided indicates that a more thorough exam needs to be performed by a healthcare provider to determine further action. Please contact your healthcare provider as soon as possible."
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
                {isTablet ||<BrowserView>
                    <div style={{display:"flex", "flex-wrap":"wrap"}}>
                        <p className={`${("w-40 ml5")} mt4 dib`} style={{"font-size":"72px", "font-weight":"500", color: this.state.output.head, "line-height":"1.6"}}>{this.state.output.head}</p>
                        <img className="dib pt3 w-40" src="https://i.ibb.co/j45jqDj/Screenshot-2020-06-15-at-10-40-39-PM.png"/>
                    </div>
                </BrowserView>}
                {!(isTablet || isBrowser ) && <MobileView>
                    <p className="ml5 mt4 mb0 w-80 f1" style={{"font-weight":"500", color: this.state.output.head, "line-height":"1.6"}}>{this.state.output.head}</p>
                    <img className="ml4 w-80" src="https://i.ibb.co/j45jqDj/Screenshot-2020-06-15-at-10-40-39-PM.png"/>
                </MobileView>}
                <div>
                    <p className={`f3 dark-gray ml4 mt4 b ${(isMobile)?"w-80":""}`}>{this.state.output.sub}</p>
                    <p className={`f5 gray ml4 mr6 ${(isMobile)?"w-80":""}`} style={{"line-height":"1.5"}}>{this.state.output.body}</p>
                </div>
                {/*<div className="w-100 bt bb bw1 b--light-gray mt4">*/}
                {/*    <p className={`f5 ${(isMobile)?"ml4":"ml5"} mt2 mb2 dark-gray dib`}>NEXT STEPS</p>*/}
                {/*</div>*/}
                {/*<div className={`${(isMobile)?"ml4":"ml5"} list-div mv3`}>*/}
                {/*    <span>1</span>  Start to quarantine yourself*/}
                {/*</div>*/}
                {/*<div className={`${(isMobile)?"ml4":"ml5"} list-div mv3`}>*/}
                {/*    <span>2</span>  Visit the nearest hospital to get tested further*/}
                {/*</div>*/}
                {/*<div className="w-100 bt bb bw1 b--light-gray mt3">*/}
                {/*    <p className={`f5 ${(isMobile)?"ml4":"ml5"} mt2 mb2 dark-gray dib`}>LINKS</p>*/}
                {/*</div>*/}
                {/*<BrowserView>*/}
                {/*    <div style={{margin:"auto"}} className="tc">*/}
                {/*        <p className="mt3 f5 dim pointer ph3 pv3 mb2 b dib white bg-light-red">CALL THE DOCTOR</p>*/}
                {/*        <p className="ml2 mt3 f5 dim pointer ph4 pv3 mb2 b dib white bg-gray">LINK TO CDC</p>*/}
                {/*        <p className="ml2 mt3 f5 dim pointer ph3 pv3 mb2 b dib white" style={{"background":"rgb(206,211,255)"}}>DIRECTIONS TO ER</p>*/}
                {/*    </div>*/}
                {/*</BrowserView>*/}
                {/*<MobileView>*/}
                {/*    <p className="ml4 tc w-60 mt3 f5 dim pointer ph4 pv3 mb1 b dib white bg-light-red">CALL THE DOCTOR</p>*/}
                {/*    <p className="ml4 tc w-60 mt2 f5 dim pointer ph4 pv3 mb1 b dib white bg-gray">LINK TO CDC</p>*/}
                {/*    <p className="ml4 tc w-60 mt2 f5 dim pointer ph4 pv3 mb2 b dib white" style={{"background":"rgb(206,211,255)"}}>DIRECTIONS TO ER</p>*/}
                {/*</MobileView>*/}
            </div>
            <div className="mt4 flex">
                <Graph Dated={this.props.Dated} Month={this.props.Month} data={this.state.data}/>
            </div>
        </div>
      )
    }
}

export default Prediction;
