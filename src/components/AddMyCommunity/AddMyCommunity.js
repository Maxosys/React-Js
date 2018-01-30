// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';


class AddMyCommunity extends Component { 

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
    this.handleCommunitySubmit = this.handleCommunitySubmit.bind(this);
  } 

    handleChange(event) {    

    this.setState({value: event.target.value});    

  }

    handleCommunitySubmit(event) {          
       

          const data = new FormData(event.target);        

          var community_owner_id    = data.get('community_owner_id');
          var community_name        = data.get('community_name');
          var community_size        = data.get('community_size');
          var community_religion    = data.get('community_religion');
          var community_spoken      = data.get('community_spoken');
          var community_tagline     = data.get('community_tagline');
          var comminty_desc         = data.get('comminty_desc');
          var community_visibility  = data.get('community_visibility');
          var community_status      = 0;
          var community_location    = data.get('community_location');
          var community_lat_long    = data.get('community_lat_long');

          if(community_lat_long == "")
          {
            this.setState({ successmsg: " Click on map and add community position on map ",showResults:true})
            
            alert("Click on map and add community position on map");

            return;
          }

           var userdata = {community_owner_id:community_owner_id,
            community_name:community_name,
            community_size:community_size,
            community_religion:community_religion,
            community_spoken:community_spoken,
            community_tagline:community_tagline,
            comminty_desc:comminty_desc,
            community_visibility:community_visibility,
            community_status:community_status,
            community_location:community_location,
            community_lat_long:community_lat_long
          };

            fetch('/api/addcommunity', {
          method: 'POST',
          body: JSON.stringify({
          task: userdata
           }),
          headers: {"Content-Type": "application/json"}
          }).then( (response) => {
                  return response.json()    
               })
               .then( (json) => {   this.setState({ successmsg: "Community successfully created..Wait for admin approval",showResults:true })           
                  
                    this.onSetResult(json)
                  console.log('parsed json', json)
               })
               .catch( (ex) => {
                  console.log('parsing failed', ex)
              });
    }

       onSetResult = (result) => {
        
        if(result.community_id)
        {
          this.setState({ successmsg: " Community successfully created..Wait for admin approval ",showResults:true})
        }
        else
        {
          this.setState({ successmsg: " Community Not Created ",showResults:true})
        }
  
    }


    componentDidMount() {
        
          document.title = this.props.route.title;

          if(!sessionStorage.getItem('session_tokenid'))
          {
            this.props.router.push('/login');
          }
    }



  render() {
    const { className, ...props } = this.props;

    var currentLocation = this.props.location.pathname;

    return (
      <div className={classnames('About', className)} {...props} >
         <Header pathn={currentLocation} displaymessage={this.state.successmsg} showResults={this.state.showResults} />
         
         <div className="communtiy-section login-section">
      <div className="container">
        <div className="title"><h3>Add My Community</h3><div className="sep"><img src="images/sep.jpg" /></div></div>

        <div className="col-sm-7 pull-right">
          <div className="right-section">
            <div className="globe-bg">
             <div id="earth_div" className="globemapcss"></div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-5 pull-left">
          <div className="left-section">
          <div className="inner-tilte"><h3>Community Details</h3><div className="sep"><img src="images/sep.jpg" /></div></div>
            <form role="form" onSubmit={this.handleCommunitySubmit}>
              <div className="edit-details">
                  <div className="input-group">
                    <input id="name" type="text" required className="form-control" name="community_name"  placeholder="Community Name" />
                    
                    <input type="hidden" name="community_owner_id" id="community_owner_id" value={sessionStorage.getItem('session_tokenid')}/>
                    <input type="hidden" name="community_lat_long" id="community_lat_long" />
                    <input type="hidden" name="community_location" id="community_location" />
                    
                  </div>
                  

                  <div className="input-group">
                    <select name="community_size" className="js-example-basic-hide-search">
                      <option value="default">Community Size</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10" selected >10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </select>
                  </div>   

                  <div className="input-group">
                    <input id="community_religion" required type="text" className="form-control" name="community_religion" placeholder="Community Religion" />
                  </div>

                  <div className="input-group">
                    <input id="community_spoken" required type="text" className="form-control" name="community_spoken" placeholder="Languages Spoken" />
                  </div>

                  <div className="input-group">
                    <input id="community_tagline" required type="text" className="form-control" name="community_tagline" placeholder="Community Tag Line" />
                  </div>

                  <div className="input-group">
                    <textarea className="form-control" required name="comminty_desc" placeholder="Other details we should know"></textarea>
                  </div>

                  <div className="switch">
                    <input id="cmn-toggle-4" className="cmn-toggle cmn-toggle-round-flat" name="community_visibility" type="checkbox"  />
                    <label for="cmn-toggle-4"></label>
                    <span>Make community visible to all?</span>
                  </div>
                  <button className="btn button--primary" type="submit">Submit <i aria-hidden="true" className="fa fa-angle-right"></i> </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
      </div>
    );
  }
}



export default AddMyCommunity;