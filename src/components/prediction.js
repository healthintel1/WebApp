import React from "react"
import "./transition.css"
import Graph from "./graph.js"

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
                    head: "Green", sub: "You seem to be feeling okay.",
                    body: "The analysis of your data including temperature, heart rate and oxygen saturation you provided are within normal ranges."
                }
            })
        } else if (r === "yellow") {
            this.setState({
                output: {
                    head: "Yellow", sub: "Stay home and take care of yourself.",
                    body: "The analysis of your data including temperature, heart rate and oxygen saturation data provided by you indicates that you should continue to monitor your health and contact your health care provider for advice if you get new symptoms or if you have close contact with someone with lab-confirmed some disease. Please provide another set of readings within four hours to repeat the analysis. Stay home and take care of yourself."
                }
            })
        } else if (r === "red") {
            this.setState({
                output: {
                    head: "Red", sub: "Please contact your healthcare provider as soon as possible.",
                    body: "According to the CDC guidelines, the analysis of the data you entered indicates immediate medical attention may be necessary. Please contact your healthcare provider to discuss next steps. If your healthcare provider is not available, contact 911 or go to the emergency department."
                }
            })
        } else if (r === "orange") {
            this.setState({
                output: {
                    head: "Orange", sub: "Please contact your healthcare provider as soon as possible.",
                    body: " The analysis of your data including temperature, heart rate and oxygen saturation provided by you indicates that a more thorough exam needs to be performed by a healthcare provider to determine further action. Please contact your healthcare provider as soon as possible."
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
                    <p className={`f5 ml4 mb3 mt3 dark-gray dib`} style={{"margin-right":"10rem"}}>
                        <p className={`f5 gray mb3 dib`}>{monthNames[this.props.Month-1]} {this.props.Dated}</p>
                    </p>
                </div>
                <p className="ml4 mt4 mb0 f1" style={{"font-weight":"500", color: this.state.output.head, "line-height":"1.6"}}>{this.state.output.head} Status</p>
                <div>
                    <p className={`f3 dark-gray ml4 mt4 b`}>{this.state.output.sub}</p>
                    <p className={`f5 gray ml4 mr6`} style={{"line-height":"1.5"}}>{this.state.output.body}</p>
                </div>
                {
                    this.state.output.head === "Red" &&
                        <div>
                            <p className={`f4 dark-gray ml4 mt4 b`}>
                                Based on your data, here are specific conditions you are at risk for,
                                associated probability score, and recommended next steps.
                            </p>
                            <div className={`f4 dark-gray ml4 mt4`}>
                                <ol className={`f4 dark-gray ml4`}>
                                    <li style={{color:"red"}}>
                                        <p style={{color:"red", display:"flex", fontWeight:"bold", justifyContent:"space-between", width:"90%"}} className={`f4 dark-gray`}>
                                            <span className={`f4`}>ABCD:</span>
                                            <span className={`f4`}>82%</span>
                                            <span className={`f4`}>Get a ABCD test done.</span>
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                }
            </div>
            <div className="mt4 flex">
                <Graph Dated={this.props.Dated} Month={this.props.Month} data={this.state.data}/>
            </div>
        </div>
      )
    }
}

export default Prediction;
