import React from "react"
import "./transition.css"
import {isBrowser, isTablet, isMobile} from "react-device-detect"
import BrowserView from "../components/BrowserView"
import MobileView from "../components/MobileView"
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import {CORSDOMAIN} from './constant';
Amplify.configure(awsconfig);

let x

class Waiting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: ""
        }
    }

    componentDidMount() {
      this.setState({visible: true})
      let count=0
      Auth.currentAuthenticatedUser()
        .then(res => {
          x = res.username
          var arr2=[]
          let k;
          var today = new Date()
          var y = `${today.getDate()}/${today.getMonth() + 1}`
          for (k=0; k<8;k++) {
            var pushed = `${today.getDate()}/${today.getMonth() + 1}`
            arr2.push(pushed)
            today.setDate(today.getDate()-1)
          }
          console.log(arr2)
          var url = CORSDOMAIN+`/getresult?client_id=${x}&d1=${arr2[0]}&d2=${arr2[1]}&d3=${arr2[2]}&d4=${arr2[3]}&d5=${arr2[4]}&d6=${arr2[5]}&d7=${arr2[6]}`
          async function GetData() {
            let response = await fetch(url)
            response = response.json()
            return response
          }
          const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*", "accept":"*" },
                body: JSON.stringify({
                  clientid: x,
                  date: this.props.Dated+"/"+this.props.Month,
                })
            };
          fetch("https://heruko-nocors.herokuapp.com/http://18.188.45.196:8080/algo", requestOptions)
            .then(async res=>{
              res = await res.text()
              console.log("result", res)
              if (res === "error"){
                   setTimeout(() => this.props.onRouteChange("gs"), 500);
              } else if (res === "red" || res === "yellow" || res=== "green" || res==="orange") {
                  GetData()
                .then(res => {
                  console.log("IDHR", res)
                  let finaldata = res.data
                  finaldata = finaldata.split(";")
                  this.props.dataSet(finaldata)
                  this.props.onRouteChange("pred")
                })
              }
            })
            .catch(err=>console.log("ERR HAI", err))
          })
      }


    render() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      let {Dated, Month, onRouteChange} = this.props
      return (
        <div className={`w-100 mb3 ${(this.state.visible) ? "fadeIn" : "fadeOut"}`}>
          	<div className="w-100 ba bw1 tl b--light-gray pb4 bg-white ba Avenir" style={{"font-family":"Avenir"}}>
                <div className="w-100 bb bw1 b--light-gray">
                    <p className={`f5 w-100 ${(isMobile)?"ml4":"ml5"} mb3 mt3 dark-gray dib`}><p className={`f5 gray mb3 dib ${(isMobile)?"ml4":""}`}>{monthNames[Month-1]} {Dated}</p></p>
                </div>
                <p className="pa4 pb0 tc f4 purple">Please wait while our algorithm calculates your risk</p>
                <div className={`mt0 ${(isMobile)?"pl5":"pl6"}`}>
                    {<img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" style={{width:"70%", margin:"auto", "margin-top":"0px", padding:"0px"}}/>}
                </div>
            </div>
        </div>
      )
    }
}

export default Waiting;
