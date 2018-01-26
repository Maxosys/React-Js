// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Adminheader from '../Header/Adminheader.js';
import './style.css';
import { Link } from 'react-router';

class AllCommunity extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {} 

  constructor(props) {
    super(props);    

    this.state = {
      value: "",     
      elements: [],
      communitydata: [],
      userdata: [],
      successmsg:"",
      statusupdatemsg:"",
      errormsg:"",
      showResults: false,
      showedit: false,
      currentLocation:""
    };  


     this.onClick = this.onClick.bind(this);

  }

  onClick(event,cid,statusset,member) {

      this.onApproveCommunity(event,cid,statusset,member)
      .then((joinresp) => {console.log(joinresp) });     
  }

  onApproveCommunity(event,commun_id,statusset,member) {
    
       console.log(member);

        const response =  fetch('/api/communitystatusadmin?commun_id='+commun_id+'&statusset='+statusset,{
        method: 'GET',         
        headers: {"pragma": "no-cache","cache-control" : "no-cache"}
        }).then( (response) => {
        return response.json()
        })
        .then( (json) => {

          console.log('parsed json', json);
          
         // community_status

          //this.props.router.push('/dashboard/all-community');

       this.callApiGetAllCommunity()
      .then((communitydata) => {this.setState({ communitydata: communitydata })
      });

          alert(json.msg);
          //console.log('parsed json', json)

        })
        .catch( (ex) => {
        console.log('parsing failed', ex)
        });

      this.callApiGetAllCommunity()
      .then((communitydata) => {this.setState({ communitydata: communitydata })
      });
  }

  componentWillMount() {
      
      document.title = this.props.route.title;
      document.getElementById("footerid").style.display='none';

      var elements = [];  
      var obj = {};

      this.callApiGetAllCommunity()
      //.then(res => res.json())
      .then((communitydata) => {this.setState({ communitydata: communitydata })

      console.log(this.state.communitydata);
      const array = communitydata.map(function(x,i){      

      elements.push({"latlong" : x.community_lat_long, "community_name" : x.community_name , "community_id" : x.community_id , "community_tagline" : x.community_tagline , "name" :x.name })
      //elements.push(x)         
      })
          //window.initialize(elements);
      });
  }

  callApiGetAllCommunity = async () => {

      const response = await fetch('/api/allcommunitiesadmin',{
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
    <div id="wrapper" {...props}>  
        <Adminheader />
          <div id="page-wrapper">
    <div className="container-fluid">
      <div id="main" >
        <div className="col-sm-12 col-md-12" id="content">
          <div className="title"><h3>Community Management</h3><div className="sep"><img src="/images/sep.jpg" /></div></div>          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Community Name</th>
                  <th>Tag Line</th>
                  <th>Owner Name</th>                  
                  <th>Community Visibility</th>                  
                  <th>Detail</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              {this.state.communitydata.map(member =>

                <tr tabindex="1">
                  <td>{member.community_name}</td>
                  <td>{member.community_tagline}</td>
                  <td>{member.name}</td>
                  <td>{member.community_visibility}</td>
                  <td> <a target="_blank" href={'/members-card/'+member.community_id} className="view-detail">View details</a> </td>
                  <td> {member.community_status? 'Approved' : 'Not Approve'}  </td>
                  <td> <button onClick={(event) => { this.onApproveCommunity(event,member.community_id,1,member); }} > Approve </button>  </td>
                 
                </tr>
              )}

                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>

    );
  }
}

export default AllCommunity;