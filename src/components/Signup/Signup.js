// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import SHA256 from 'crypto-js/sha256';

class Signup extends Component {

    constructor(props) {
    super(props);
    this.state = {
      value: "",
      name: "",
      email: "",
      password:"",
      cpassword:"",
      successmsg:"",
      errormsg:"",
      showResults: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    this.setState({value: event.target.value});    

  }

 componentDidMount() {
      
    
        document.title = this.props.route.title;

    if(sessionStorage.getItem('session_tokenid'))
        {
          this.props.router.push('/');
        }   
  }

  handleSubmit(event) {

   
        //alert('A name was submitted: ' + this.state.value);

         const data = new FormData(event.target);

         //data.append('client_id', config.APP_KEY);

         console.log(data.get('name'));

	    /*
	    const [month, day, year] = data.get('birthdate').split('/');
	    const serverDate = `${year}-${month}-${day}`;
	    data.set('birthdate', serverDate);
	    data.set('username', data.get('username').toUpperCase());
	    */       
   

      var username  = data.get('name');
      var email     = data.get('email');
      var password  = data.get('password');
      var cpassword = data.get('cpassword');
      var remember  = data.get('remember');

      if(!remember)
      {
        alert("Agree Term and Conditions");
        return ;
      }
      
       if(password != cpassword)
      {
          alert("Password Not Matched");
          return;
      }

      var bytes  		  = SHA256(password);
      var plaintext 	= bytes.toString();
      var inckey    	= plaintext;
      var userdata  	= {username:username,email:email,inckey:inckey};   

      
      var canProceed = this.validateEmail(email);

      if(canProceed)
      {
            fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
          task: userdata
           }),
          headers: {"Content-Type": "application/json"}
          }).then( (response) => {
                  return response.json()
               })
               .then( (json) => {   this.setState({ successmsg: "You have successfully registered.Please verify your email",showResults:true })           
                  
                  this.onSetResult(json);
                  console.log('parsed json', json)
               })
               .catch( (ex) => {
                  console.log('parsing failed', ex)
              });
      }
      else
      {        
        
        alert("Please enter valid email id");
        return;
      }       

  }  

   onSetResult = (result) => {

        if(result.id)
        {
          this.setState({ successmsg: " You have successfully registered.Please verify your email ",showResults:true})
        }
        else
        {
          this.setState({ successmsg: " Already Exists ",showResults:true})
        }
    }

   validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  } 

  render() {
    const { className, ...props } = this.props;
    
    var currentLocation = this.props.location.pathname;

   // console.log(currentLocation);

    return (
      <div>

      <Header pathn={currentLocation} displaymessage={this.state.successmsg} showResults={this.state.showResults} />

      <div className="login-section bg-ribbins">      
      <div className="container">
        <div className="tab-wrap">
          <h2 className="head-title">Create Your itribe Account </h2>

       

          <form role="form" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input id="login-username" type="text" required className="form-control" name="name"  placeholder="Name"/>
            </div>

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
        <input id="login-email" type="text" required className="form-control" name="email"   placeholder="Email"/>
            </div>   

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input id="login-password" type="password" required className="form-control" name="password" placeholder="Password"/>
            </div>

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input id="login-cpassword" type="password" required className="form-control" name="cpassword" placeholder="Confirm Password"/>
            </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value="1" name="remember" id="login-remember"/> I agree to the Terms of Use and  Privacy Policy
                </label>
              </div>
            <button className="btn button--primary" type="submit">Sign UP <i aria-hidden="true" className="fa fa-angle-right"></i> </button>

            <div className="chat-box-single-line">
              <abbr className="timestamp">or</abbr>
            </div>

            <a className="btn btn-block btn-social btn-facebook" href="javascript:;"  >
              <span className="fa fa-facebook"></span> login with facebook
            </a>


            {/*<div className="form-group">                 
              <div>
                <a href="#">Reset Password </a>
                <a href="#" className="learn">Learn More</a>
              </div>
            </div> */}
          </form>        
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default Signup;