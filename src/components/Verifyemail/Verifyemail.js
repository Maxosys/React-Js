// src/components/NotFound/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import './style.css';

export default class Verifyemail extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

constructor(props) {

    super(props);

    this.state = {
    username:'',
    password:'',
    session_username:'',
    session_tokenid:'',
    ses_user_email:'',    
    members: [],
    userdata: [],
    successmsg:"",
    errormsg:"",
    showResults: false
    
    } 
     
 }

    componentDidMount() {
      
      document.title = this.props.route.title; 

      console.log(this.props);      

      if(this.props.params.uid != "")
      {
      
      var uid     = this.props.params.uid;
      var hashkey = this.props.params.hashkey;

      this.callVerifyApi(uid,hashkey)      
      //.then(res => res.json())
      .then((members) => { 

          this.setState({ successmsg: members.msg })

          console.log(members);

        });

      }
  }
  
  callVerifyApi = async (uid,hashkey) => {
     
    const response = await fetch('/api/verifyemailservice?uid='+uid+'&hashkey='+hashkey,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }

  render() {
    const { className, ...props } = this.props;

     var currentLocation = this.props.location.pathname;

    return (
      <div {...props}>
       <Header pathn={currentLocation} />

        <div className="login-section bg-ribbins">
        <div className="container">
        <div className="tab-wrap">
        <h2 className="head-title">
        {this.state.successmsg}       
        </h2>
        </div>
        </div>
        </div>
        
      </div>
    );
  }
}