import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { Link,Router, Route } from 'react-router';
import $ from 'jquery';
import  { Redirect } from 'react-router-dom'


export default class InnerHeader extends React.Component {

  constructor(props) {
    super(props);


    // console.log(this.props.router);

    this.state = { hits: null,sessionStatus:false ,  };

    this.st  = false;   

     if(sessionStorage.getItem('session_tokenid'))
      {
        this.st = true;
      }       

      this.handleCommunitySearch = this.handleCommunitySearch.bind(this);
  }
  
  handleCommunitySearch(event) {

        const data = new FormData(event.target);
        var searchstr =  data.get("searchstr");


        document.location.href = '/search/'+searchstr;
        
     
       //this.props.router.push('/search/'+searchstr);     
  }


 /* onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }

    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
      .then(response => response.json())
      .then(result => this.onSetResult(result, value));
  }

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  }*/



  renderMobileLoginSignupNavigations() {
        return (

          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn closenavediv" onclick="closeNav()">×</a>
            <div className="padding">
              <div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="  search-query form-control" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                      <span className="fa fa-search"></span>
                     </button>
                  </span>
                </div>
              </div>

          <ul className="nav navbar-nav navbar-right" id="left-menu">
            <li className="furtherlinks">
              <a href="#iq-home" className="dropdown-toggle" data-toggle="dropdown">My Community</a>
              <ul className="dropdown-menu" role="menu">
                      <li><a href="/my-community">My Community</a></li>
                      <li><a href="/joined-communities">My Joined Community</a></li>
                      <li><a href="/addcommunity">Add Community</a></li>
                       <li><a href="/library">Library</a></li>
                      <li><a href="/invite-newmember">Invite New Members</a></li>
                      <li><a href="/pending-request">Pending Join Requests</a></li>
                      <li><a href="/edit-community-details">Edit Community Details</a></li>
                      {/*<li><a href="/">Add Video/Audio/Documents</a></li>*/}
              </ul>
            </li>
            <li className="furtherlinks"><a href="/community-display">Other Communities</a></li> 
            <li className="furtherlinks"><a href="/help">Help</a></li>        
          </ul>      
              
          
          { this.st ? 
            <div id="footer-bottom-holepunch-mobile" className="bottom">
            <a className="register la-fragment-mobile_footer" id="side-nav-register" href="/logout">Logout</a>  
            </div>
            :
            <div id="footer-bottom-holepunch-mobile" className="bottom">  
            <a className="sign-in la-fragment-mobile_footer" id="side-nav-signin" href="/login">Log In</a>
            <a className="register la-fragment-mobile_footer" id="side-nav-register" href="/signup">Sign Up</a>
            </div>
          } 
          
          </div>
          
          </div>

          )
  }

  renderLoginSignupNavigations() {
        return (
              
            <ul className="nav navbar-nav navbar-right" id="left-menu">
                <li className="search"><a href="#search"> <i class="icon Serarch"></i></a></li>              
                <li className="log"><Link to="/login"> <i className="icon login"></i> Log in</Link></li>
                <li className="signup"><Link to="/signup"> <i className="icon sign"></i>Sign Up</Link></li>                  
            </ul>
          )
       }

     renderNavigations() {
        return (
              
             <ul className="nav navbar-nav navbar-right" id="left-menu">
                <li className="search"><a href="#search"> <i className="icon Serarch"></i></a></li>
                <li className="furtherlinks show-on-hover">
                  <a href="#iq-home" className="dropdown-toggle" data-toggle="dropdown">My Community</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="/my-community">My Community</a></li>
                     <li><a href="/joined-communities">My Joined Community</a></li>
                    <li><a href="/addcommunity">Add Community</a></li>
                    {/*<li><a href="/library">Library</a></li>*/}
                    <li><a href="/invite-newmember">Invite New Members</a></li>
                    <li><a href="/pending-request">Pending Join Requests</a></li>
              
                  </ul>
                </li>
                <li className="furtherlinks"><a href="/community-display">Other Communities</a></li>

                <li className="furtherlinks"><a href="/help">Help</a></li>
                <li className="signup dropdown userpic">             

                  <a href="#iq-home" className="dropdown-toggle" data-toggle="dropdown"> 

                  {
                    sessionStorage.getItem('session_fbid') ?                     
                    <img src={"http://graph.facebook.com/"+sessionStorage.getItem('session_fbid')+"/picture?type=small"} />
                    :
                    <i className="icon user"></i>
                  }

                  {sessionStorage.getItem('session_username')} <i aria-hidden="true" className="fa fa-angle-down downarrow"></i></a>
                  <ul className="dropdown-menu user-account-menu simple pull-right">   
                      <li><a className="inline-option" href="/edit-profile">Edit Profile</a></li>
                      <li><a className="inline-option" href="/accounts">Account Setting</a></li>
                      <li><a className="inline-option" href="/logout">Logout</a></li>
                  </ul>
                </li>
                <li className="inboxs"><a href="/message"><i className="icon inbox"></i> <span className="count">0</span></a></li>
              

              </ul>
          )
       }


  render() {

     const { className, ...props } = this.props;
  var currentLocation = this.props.pathn;

      var  st  = true;   

     if(sessionStorage.getItem('session_tokenid'))
      {
        st = false;
      }
      else
      {
        if (currentLocation == '/signup' || currentLocation == '/login' || currentLocation == '/apanel' || currentLocation == '/verifyemail' ) {
              
              st = true;

           } else {

              st = false;       
          }
      }      
       

      return (
          <header id="header-wrap" className="inner-header" {...props}>
              
              
        <div className="container">
          <nav className="navbar navbar-default hidden-xs hidden-sm">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">
                  <i className="fa fa-bars hidden-xs" aria-hidden="true"></i>
                  <img src="/images/logo.png" className="white-logo" alt="logo" />
                  <img src="/images/color-logo.jpg" className="black-logo" alt="logo" />
                </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              { st ? this.renderLoginSignupNavigations() : this.renderNavigations() }             
             
            </div>
          </nav>
          <div id="search">
            <button type="button" className="close"></button>
            <form onSubmit={this.handleCommunitySearch} >
              <input type="search" name="searchstr" placeholder="Search here" required />
              <button type="submit" className="btn button--primary">Search <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
            </form>
          </div>       
        
         {/* mobile */}

          <a className="navbar-brand visible-xs visible-sm" >
            <span className="side-bar opennavediv"  onclick="openNav()"><i className="fa fa-bars"></i></span>
            <img src="/images/logo.png" className="white-logo" alt="logo" />
            <img src="/images/color-logo.jpg" className="black-logo" alt="logo" />
          </a>

          <div className="mobileaccount visible-xs visible-sm">
            <li className="signup dropdown userpic">
              <a href="#iq-home" className="dropdown-toggle" data-toggle="dropdown"> <i className="icon user"></i><i aria-hidden="true" className="fa fa-angle-down downarrow"></i></a>
                <ul className="dropdown-menu user-account-menu simple pull-right">   
                  <li><a className="inline-option" href="">Edit Profile</a></li>
                  <li><a className="inline-option" href="">Account Setting</a></li>
                  <li><a className="inline-option" href="">Logout</a></li>
                </ul>
            </li>
            <li className="inboxs"><a href="#iq-home"><i className="icon inbox"></i> <span className="count">0</span></a></li>
          </div>

            {this.renderMobileLoginSignupNavigations()}
            
            {/* end mobile */}

        </div>
    </header>
      );
  }
}


$(document).ready(function(){



});