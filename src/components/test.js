import React from "react";
import "./transition.css"
import { BrowserView, MobileView } from "react-device-detect";
import { CORSDOMAIN } from './constant'
import TimePicker from 'react-time-picker';


class TestResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: "",
            bg: "white",
            tests: []
        }
    }

    componentDidMount() {
        this.setState({message:""})
        console.log(this.props)
        setTimeout(()=>{this.setState({visible: true})}, 25)
        let x = this.props.data
        console.log("loading data")
        this.setState({tests: []})
    }

    sendData = () => {
        let senddata = {
            clientid: this.props.clientid,
            date: `${this.props.Dated}/${this.props.Month}`,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(senddata)
        };
        fetch(CORSDOMAIN+'/postvitals?', requestOptions)
            .then(res=>{
                console.log(res)
                setTimeout(()=>{this.setState({visible: false})},100)
                setTimeout(()=>{this.props.onVitalsUpdate(this.state)},500)
                setTimeout(()=>{this.props.refreshCalendar()},500)
            })
            .catch(err=>{
                this.setState({message:""})
                this.setState({error_message: "An error occured. Please try again."})
            })
    }

    updateSentData = () => {
        let senddata = {
            clientid: this.props.clientid,
            date: `${this.props.Dated}/${this.props.Month}`,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(senddata)
        };
        fetch(CORSDOMAIN+'/updatevitals1?', requestOptions)
            .then(res=>{
                console.log(res)
                setTimeout(()=>{this.setState({visible: false})},100)
                setTimeout(()=>{this.props.onVitalsUpdate(this.state)},500)
                setTimeout(()=>{this.props.refreshCalendar()},500)
            })
            .catch(err=>{
                this.setState({message:""})
                this.setState({error_message: "An error occured. Please try again."})
            })
    };

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let {Dated, Month} = this.props;
        const onClick = (e) => {
            this.updateSentData()
        };
        return(
            <div>
                <BrowserView>
                    <div className={`w-100 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
                        <div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                            <div className="w-100 bb mb4 bw1 b--light-gray">
                                <p className="f5 ml5 mt3 mb3 light-red dib">TEST RESULTS</p>
                                <p className="f5 gray mb3 dib ml7">{monthNames[Month-1]} {Dated}</p>
                            </div>
                            {
                                this.state.tests.map((test, i) => {
                                    return (
                                        <div>
                                            <div className="mv2" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <p className="mt4 ml5 b pa0 mb0 gray gender">TEST NUMBER #{i+1}</p>
                                                <p onClick={() => {this.setState({tests: [...this.state.tests.slice(0, i), ...this.state.tests.slice(i+1)]})}} className="pointer mt4 b pa0 mb0 gray" style={{marginRight: 50, color: 'red', fontWeight: 'bold', padding: '0 10px'}}>x</p>
                                            </div>
                                            <div className="mv2">
                                                <p className="mt4 ml5 b pa0 mb0 gray gender">TEST TIME</p>
                                                <TimePicker
                                                    className="ml5 mr2 mt3"
                                                    style={{"height":"50px","border":"none"}}
                                                    onChange={(value) => {this.setState({tests: [...this.state.tests.slice(0, i), {...test, time: value}, ...this.state.tests.slice(i+1)]})}}
                                                    value={test.time}
                                                    clearIcon={null}
                                                    disableClock={true}
                                                    clockIcon={null}
                                                />
                                            </div>
                                            <div className="mv2">
                                                <p className="mt4 ml5 b pa0 mb0 gray gender">TEST TYPE</p>
                                                <input value={test.type} onChange={(value) => {this.setState({tests: [...this.state.tests.slice(0, i), {...test, type: value}, ...this.state.tests.slice(i+1)]})}} type="text" placeholder="The type of test that you undergo" className="mt3 ml5 mr2 bg-washed-green ph2" style={{"height":"50px", "width":"60%","border":"none"}}/>
                                            </div>
                                            <div className="mt2 mb2">
                                                <p className="mt3 ml5 b pa0 mb0 gray gender">RESULT</p>
                                                <div className="ml5 mr2" style={{display: "flex","border":"none"}}>
                                                    <select value={test.result} onChange={(event) => {
                                                        this.setState({tests: [...this.state.tests.slice(0, i), {...test, event: event.target.value}, ...this.state.tests.slice(i+1)]})
                                                    }} className="mt3" style={{borderColor: "#777", minWidth: "60%", padding: 10, color: "#777", borderWidth: 0.5}}>
                                                        <option style={{color: "#777"}} value="wait">WAITING FOR RESULT</option>
                                                        <option style={{color: "#777"}} value="pos">COVID-19 POSITIVE</option>
                                                        <option style={{color: "#777"}} value="neg">COVID-19 NEGATIVE</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                <p onClick={() => {this.setState({tests: [...this.state.tests, {time:"00:00", result: "", type:""}]})}} className="pointer tc f3" style={{"margin": "10px auto", border: "thin dashed grey", "border-radius":"50%", justifyContent: 'center', alignItems:'center', display: "flex", width:50, height:50, background: this.state.bg, color: (this.state.bg === "white") ? "blue" : "white"}}>+</p>
                                <p className="pointer tc gray gender">Add test</p>
                            </div>
                            <p className="f5 mt4 b red tc">{this.state.error_message}</p>
                            <p className="f5 mt4 dark-blue tc">{this.state.message}</p>
                            {
                                this.state.tests.length > 0 &&
                                <div className="mt5 mb3">
                                    <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{
                                        "margin": "auto",
                                        "border-radius": "50%",
                                        width: "10%",
                                        background: this.state.bg,
                                        color: (this.state.bg === "white") ? "#013220" : "white"
                                    }}>✓</p>
                                </div>
                            }
                        </div>
                    </div>
                </BrowserView>
                <MobileView>
                    <div className={`w-100 mb3 pb2 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
                        <div className="tl ba bw1 w-100 b--light-gray bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                            <div className="w-100 bb mb4 bw1 b--light-gray">
                                <p className="f5 ml3 mb3 mt3 light-red dib">TEST RESULTS</p>
                                <p className="f5 gray mb3 dib ml6">{monthNames[Month-1]} {Dated}</p>
                            </div>
                            {
                                this.state.tests.map((test, i) => {
                                    return (
                                        <div>
                                            <div className="mv2" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <p className="mt4 ml3 b pa1 f5 w-60 mb0 gray gender">TEST NUMBER #{i+1}</p>
                                                <p onClick={() => {this.setState({tests: [...this.state.tests.slice(0, i), ...this.state.tests.slice(i+1)]})}} className="pointer mt4 b pa0 mb0 gray" style={{marginRight: 50, color: 'red', fontWeight: 'bold', padding: '0 10px'}}>x</p>
                                            </div>
                                            <div className="mv2">
                                                <p className="mt4 ml3 b pa1 f5 w-60 mb0 gray gender">TEST TIME</p>
                                                <TimePicker
                                                    className="ml3 mr2 mt3"
                                                    style={{"height":"50px","border":"none"}}
                                                    onChange={(value) => {this.setState({tests: [...this.state.tests.slice(0, i), {...test, time: value}, ...this.state.tests.slice(i+1)]})}}
                                                    value={test.time}
                                                    clearIcon={null}
                                                    disableClock={true}
                                                    clockIcon={null}
                                                />
                                            </div>
                                            <div className="mv2 pa1">
                                                <p className="mt4 ml3 pa1 f5 w-60 b mb0 gray gender">TEST TYPE</p>
                                                <input value={test.type} onChange={(value) => {this.setState({tests: [...this.state.tests.slice(0, i), {...test, type: value}, ...this.state.tests.slice(i+1)]})}} type="text" placeholder="The type of test that you undergo" className="mt3 ml3 mr2 bg-washed-green ph2" style={{"height":"50px", "width":"80%","border":"none"}}/>
                                            </div>
                                            <div className="mt2 mb2 pa1">
                                                <p className="mt3 ml3 b f5 w-70 pa0 mb0 gray gender">WHAT IS YOUR TEMPERATURE?</p>
                                                <div className="ml3 mr2" style={{display: "flex", "height":"50px", "width":"80%","border":"none"}}>
                                                    <select onChange={(event) => {
                                                        this.setState({tests: [...this.state.tests.slice(0, i), {...test, event: event.target.value}, ...this.state.tests.slice(i+1)]})
                                                    }} value={test.result} className="mt3" style={{borderColor: "#777", color: "#777", minWidth: "80%", borderWidth: 0.5}}>
                                                        <option style={{color: "#777"}} value="wait">WAITING FOR RESULT</option>
                                                        <option style={{color: "#777"}} value="pos">COVID-19 POSITIVE</option>
                                                        <option style={{color: "#777"}} value="neg">COVID-19 NEGATIVE</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                <p onClick={() => {this.setState({tests: [...this.state.tests, {time:"00:00", result: "", type:""}]})}} className="pointer tc f3" style={{"margin": "10px auto", border: "thin dashed grey", "border-radius":"50%", justifyContent: 'center', alignItems:'center', display: "flex", width:50, height:50, background: this.state.bg, color: (this.state.bg === "white") ? "blue" : "white"}}>+</p>
                                <p className="pointer tc gray gender">Add test</p>
                            </div>
                            <p className="f5 mt4 b red tc">{this.state.error_message}</p>
                            <p className="f5 mt1 dark-blue tc">{this.state.message}</p>
                            {
                                this.state.tests.length > 0 &&
                                <div className="mt5 mb3">
                                    <p onClick={onClick} className="pointer tc pv3 f3 shadow-1" style={{"margin": "auto", "border-radius":"50%", width:"15%", background: this.state.bg, color: (this.state.bg === "white") ? "#013220" : "white"}}>✓</p>
                                </div>
                            }
                        </div>
                    </div>
                </MobileView>
            </div>
        )
    }
}

export default TestResults;
