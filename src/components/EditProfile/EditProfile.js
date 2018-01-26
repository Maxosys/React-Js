// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import ImageUploader from 'react-images-upload';
import Header from '../Header/Header.js';

class EditProfile extends Component {  


   constructor(props) {
    super(props);    

    this.state = {
      value: "",     
      elements: [],
      communitydata: [],
      userdata: [],
      memberdata: [],
      successmsg:"",
      errormsg:"",
      showResults: false
    };      
      
      this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this._changeEvent = this._changeEvent.bind(this);
  }

    handleChange(event) {
    
    let statecoloumn = event.target.name;
     
    this.setState({userdata: {"user_name":this.refs.user_name.value,"user_location":this.refs.user_location.value} });

  }

    handleProfileUpdate(event) {

          const data = new FormData(event.target); 

         
          var user_name       = data.get('user_name');
          var user_location   = data.get('user_location');   
          //var userpic         = data.get('userpic');
          var user_id         = data.get('user_id');

        //  data.append('file', this.uploadInput.files[0]);
         
           
          var userdata = {
            user_id:user_id,
            user_name:user_name,
            user_location:user_location                  
          };

  /*  const dataa = new FormData();
    dataa.append('file', this.uploadInput.files[0]);*/
 
 console.log(userdata);
 
            fetch('/api/updateprofile', {
          method: 'POST',
          body: JSON.stringify({
          task: userdata
           }),
          headers: {"Content-Type": "application/json"}
          }).then( (response) => {
                  return response.json()    
               })
               .then( (json) => {   this.setState({ successmsg: "Profile successfully Updated.",showResults:true })           
                  
                    //this.onSetResult(json)
                  console.log('parsed json', json)
               })
               .catch( (ex) => {
                  console.log('parsing failed', ex)
              });

    }

    componentDidMount() {
      
        document.title = this.props.route.title;

        if(!sessionStorage.getItem('session_tokenid'))
        {
          this.props.router.push('/login');
        }
    }

    componentWillMount() {

          this.callApi(sessionStorage.getItem('session_tokenid'))           
          .then((userdata) => {

            this.setState({ userdata: userdata }) 

            console.log(userdata);

        });
    }

    callApi = async (uid) => {
     
     const response = await fetch('/api/getUserByIdOne?uid='+uid,{ method: 'GET', headers: {"pragma": "no-cache","cache-control" : "no-cache"} });
   
     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    }


// for image preview

    _changeEvent(e) {

    e.preventDefault();
         
    let reader = new FileReader();
         
    let file = e.target.files[0];  
         
    var _this = this;
         
    reader.onloadend = function() {              
      _this.refs.preview.innerHTML= '<img width="250px" src="'+reader.result+'" />';
    }
         
    reader.readAsDataURL(file);
  }

// end 


  render() {
    const { className, ...props } = this.props;
    return (
	
      <div className={classnames('About', className)} {...props}>
	     
		 <Header displaymessage={this.state.successmsg} showResults={this.state.showResults} />
	  
                  <div className="login-section bg-ribbins">
                  <div className="container">
                  <div className="tab-wrap">
                  <h2 className="head-title">Edit Profile</h2>

          <form role="form" enctype="multipart/form-data" onSubmit={this.handleProfileUpdate}>
                    

                  <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"></i></span>
            
      <input type="hidden" name="user_id" value={sessionStorage.getItem('session_tokenid')} />
      <input id="login-username" type="text" ref="user_name" onChange={this.handleChange} className="form-control" name="user_name" value={this.state.userdata.name} placeholder="Name" /></div>           
      
                  <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-location-arrow"></i></span>
                  <input  ref="user_location" value={this.state.userdata.location} onChange={this.handleChange} type="text" className="form-control" name="user_location" placeholder="Location" />
                  </div>
                  <button className="btn button--primary" type="submit">Submit <i aria-hidden="true" className="fa fa-angle-right"></i> </button>
                  </form>        
                  </div>
                  </div>
                </div>
      </div>
    );
  }
}



export default EditProfile;