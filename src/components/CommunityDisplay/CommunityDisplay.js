// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import $ from 'jquery';
class CommunityDisplay extends Component {  

    constructor(props) {
    super(props);    

    this.state = {
      value: "",     
      elements: [],
      communitydata: [],
      userdata: [],
      successmsg:"",
      errormsg:"",
      showResults: false,
      showedit: false,
      currentLocation:"",
      editSt:true
    };  

    //this.setState({ communitydata: communitydata }

    this.onClick = this.onClick.bind(this);


  }

// join community function

  onClick(event,cid,user_id) {

      this.func1(event,cid,user_id)
      .then((joinresp) => {console.log(joinresp) });     
  }
  
  func1(event,commun_id,user_id) {
    
        var userdata = {commun_id:commun_id,user_id:user_id};

        const response =  fetch('/api/joincommunity?commun_id='+commun_id+'&user_id='+user_id,userdata,{
        method: 'GET',         
        headers: {"pragma": "no-cache","cache-control" : "no-cache"}
        }).then( (response) => {
        return response.json()
        })
        .then( (json) => {

          console.log('parsed json', json.commun_rel_id)

            if(json.commun_rel_id)
            {              
               this.setState({ successmsg: "You have successfully joined",showResults:true });
            }
            else
            {
               this.setState({ successmsg: "Already Joined",showResults:true }); 
            }

        console.log('parsed json', this.state.successmsg)
        //console.log('parsed json', json)
        })
        .catch( (ex) => {
        console.log('parsing failed', ex)
        });
  }

// end 

  componentWillMount() {
        
        // set title 
          document.title = this.props.route.title;

          if(!sessionStorage.getItem('session_tokenid'))
          {
            this.props.router.push('/login');
          }

                var elements = [];  
                var obj = {};
               
                  var currentLocation = this.props.location.pathname;

                if(currentLocation == '/my-community')
                {
                     this.callApiGetCommunityByUid(sessionStorage.getItem('session_tokenid'))
                      //.then(res => res.json())
                    .then((communitydata) => {this.setState({ communitydata: communitydata })

          console.log(this.state.communitydata);
        const array = communitydata.map(function(x,i) {
                      
          elements.push({"latlong" : x.community_lat_long, "community_name" : x.community_name , "community_id" : x.community_id , "community_tagline" : x.community_tagline , "name" :x.name })
          //elements.push(x)         
        
        })
           window.initialize(elements);

        });
                     this.setState({ editSt:true });

                }
                else
                {

if(this.props.params.cstr)
{
    this.callApiGetSearchCommunity(this.props.params.cstr)
  //.then(res => res.json())
  .then((communitydata) => {this.setState({ communitydata: communitydata })

  console.log(this.state.communitydata);
  const array = communitydata.map(function(x,i){      

  elements.push({"latlong" : x.community_lat_long, "community_name" : x.community_name , "community_id" : x.community_id , "community_tagline" : x.community_tagline , "name" :x.name })
  //elements.push(x)         

  })
  window.initialize(elements);

  }); 
}
else
{
this.callApiGetAllCommunity()
//.then(res => res.json())
.then((communitydata) => {this.setState({ communitydata: communitydata })

console.log(this.state.communitydata);
const array = communitydata.map(function(x,i){      

elements.push({"latlong" : x.community_lat_long, "community_name" : x.community_name , "community_id" : x.community_id , "community_tagline" : x.community_tagline , "name" :x.name })
//elements.push(x)         

})
window.initialize(elements);

}); 
}

                  this.setState({ editSt:false });
                
                }
    
    }

    callApiGetAllCommunity = async () => {

      const response = await fetch('/api/allcommunities',{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
      });

      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

    return body;
    }

  
  callApiGetCommunityByUid = async (uid) => {

      const response = await fetch('/api/communitybyuid?uid='+uid,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
      });

      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

    return body;
    }

  callApiGetSearchCommunity = async (cstr) => {

      const response = await fetch('/api/communitybysearch?cstr='+cstr,{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
      });

      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  
  }



  render() {
          
          const { className, ...props } = this.props;      
         

    return (
      <div {...props}>
	    
		<Header displaymessage={this.state.successmsg} showResults={this.state.showResults} {...props} />
	   
       <div className="communtiy-section login-section">
    <div className="container">
      <div className="title"><h3>iTribe Communities  </h3><div className="sep"><img src="/images/sep.jpg" /></div></div>
      <div className="breadcrums-search communtiesitribe">
        <div className="searchfaq">
          {/*<div id="imaginary_container"> 
            <div className="input-group stylish-input-group input-append">
              <input type="text" placeholder="Filter (free text)" className="form-control" />
              <span className="input-group-addon">
                <button type="submit">
                  <span className="fa fa-search"></span>
                </button>  
              </span>
            </div>
          </div>
          <div id="imaginary_container"> 
            <div className="input-group stylish-input-group input-append">
              <input type="text" placeholder=" Filter (community)" className="form-control" />
              <span className="input-group-addon">
                <button type="submit">
                  <span className="fa fa-search"></span>
                </button>  
              </span>
            </div>
          </div>
          */}
        </div>
        <div className="links">
          <a href="/addcommunity">Add my community</a>
          <a href="/community-display">Join existing community</a>
        </div>
      </div>

       <div className="col-sm-7 pull-right">
        <div className="right-section">
          <div className="globe-bg"  >
            <div className="globemapcss" id="earth_div"></div>          
          </div>
        </div>
      </div>

      <div className="col-sm-5 pull-left">
        <div className="left-section">
          <div className="inner-tilte"><h3>community Cards</h3><div className="sep"><img src="/images/sep.jpg" /></div></div>
          

          <ul className="members-name cumnnity-list">

            {            

              this.state.communitydata.map(member =>
            
            <li key={member.community_id}>        
             <div className="membercard"><img src="/images/community-card.png" /></div>
              <div className="memberinfo">
                <span className="members-name"> {member.community_name} </span>
                <div className="totalmember"> {member.community_tagline} </div>
                <div className="totalmember">Owner Name : <span className="m-number">{member.name}</span></div>
               
    <a href={'members-card/'+member.community_id} className="view-detail">View details</a>
                
      { this.state.editSt ?

      <a href={'edit-community-details/'+member.community_id} className="view-detail">Edit</a>
      :                
     <a href="javascript:;" onClick={(event) => { this.func1(event,member.community_id,sessionStorage.getItem('session_tokenid')); }} className="view-detail">Join</a>
      
      }
             
        
  
                {/* this.state.editSt ?
               
               <a href={'/'+member.community_id} className="view-detail">Edit</a> 
               :
               <a href="javascript:;" onClick={(event) => { this.func1(event,member.community_id,sessionStorage.getItem('session_tokenid')); }} className="view-detail">Join</a>
                */}

              </div>
             </li>
            )
               

            }


{/*            <li>
              <div className="membercard"><img src="images/community-card.png" /></div>
              <div className="memberinfo">
                <span className="members-name">Community Name</span>
                <div className="totalmember">Total Members : <span className="m-number">5</span></div>
                <div className="totalmember">Owner Name : <span className="m-number">Abc</span></div>
                <a href="javascript:;" className="view-detail">View details</a>
                <a href="javascript:;" className="view-detail">Contact</a>
              </div>
            </li>*/}

           
          </ul>
        </div>
      </div>

   
    </div>
  </div>
      </div>
    );
  }
}



export default CommunityDisplay;


