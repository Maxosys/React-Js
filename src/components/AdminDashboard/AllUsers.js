import React, { Component } from 'react';
import Adminheader from '../Header/Adminheader.js';
import './style.css';


class AllUsers extends Component {


  constructor(props){

    super(props);

    this.state={
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
     
    document.getElementById("footerid").style.display='none';

         if(!sessionStorage.getItem('asession_tokenid'))
          {
            this.props.router.push('/apanel');
          }

      this.callApi()      
      //.then(res => res.json())
      .then(members => this.setState({ members: members }));

  }

  callApi = async () => {
     
    const response = await fetch('/api/users',{
      method: 'GET',   
      headers: {"pragma": "no-cache","cache-control" : "no-cache"}
    });

     const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
  }




  render() {

    return (
    <div id="wrapper" >  
        <Adminheader />
          <div id="page-wrapper">
    <div className="container-fluid">
      <div id="main" >
        <div className="col-sm-12 col-md-12" id="content">
          <div className="title"><h3>User Management</h3><div className="sep"><img src="/images/sep.jpg" alt="border" /></div></div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Firstname</th>                  
                  <th>Email</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>

                {this.state.members.map(member =>
                
                <tr tabindex="1">
                  
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.location}</td>

                </tr>
                
                )}

                <tr tabindex="2">
                  <td>Mary</td>
                  <td>Moe</td>
                  <td>mary@example.com</td>
                </tr>
                <tr tabindex="3">
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
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



export default AllUsers;