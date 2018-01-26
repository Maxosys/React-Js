import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'


export default class HomeHeader extends React.Component {

    constructor(props) {
    super(props);
    this.state = { hits: null,sessionStatus:false };

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

   homeNavLoginSignup() {
        
        return(
          <ul className="nav navbar-nav navbar-right" id="left-menu">
                <li className="search"><a href="#search"> <i className="icon Serarch"></i></a></li>
                <li className="log"><Link to="/login"> <i className="icon login"></i> Log in</Link></li>
                <li className="signup"><Link to="/signup"> <i className="icon sign"></i>Sign Up</Link></li>              
                
                             
          </ul>          
          );
  }

   homeAfterLoginNav() {
        
        return(
          <ul className="nav navbar-nav navbar-right" id="left-menu">
                <li className="search"><a href="#search"> <i className="icon Serarch"></i></a></li>
                <li className="log"><a href="/addcommunity"> <i className="icon createcommunity"></i>Create Community</a></li>
                <li className="signup"><a href="/community-display"> <i className="icon sign"></i>Join Community</a></li> 
                <li className="signup"><Link to="/logout"> <i className="icon logout"></i> </Link></li>             
          </ul>          
          );
  }

  render() {
     
     const { className, ...props } = this.props;	

     var st = true;


     if(sessionStorage.getItem('session_tokenid'))
      {
        st = false;
      }    


      return (
         <header id="header-wrap" >
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
                  <img src="/images/logo.png" alt="logo" />
                  <img src="/images/color-logo.jpg" className="black-logo" alt="logo" />
                </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {st ? this.homeNavLoginSignup() :  this.homeAfterLoginNav() }
              
            </div>
          </nav>
          <div id="search">
            <button type="button" className="close"></button>
            <form onSubmit={this.handleCommunitySearch} >
              <input type="search" name="searchstr" placeholder="Search here" />
              <button type="submit" className="btn button--primary">Search <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
            </form>
          </div>        
         
          <a className="navbar-brand visible-xs visible-sm">
            <span className="side-bar opennavediv"  onclick="openNav()"><i className="fa fa-bars"></i></span>
            <img src="/images/logo.png" className="white-logo" alt="logo" />
            <img src="/images/color-logo.jpg" className="black-logo" alt="logo" />
          </a>
          <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn closenavediv" onclick="closeNav()">×</a>
            <div className="padding">
              {/*<div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="  search-query form-control" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                      <span className="fa fa-search"></span>
                     </button>
                  </span>
                </div>
              </div>*/}

              { this.st ?
          <ul className="nav navbar-nav navbar-right" id="left-menu">
            <li className="furtherlinks"><a href="/addcommunity">Create Community</a> </li>
            <li className="furtherlinks"><a href="/community-display">Other Communities</a></li> 
            <li className="furtherlinks"><a href="/help">Help</a></li>        
          </ul>
            : ''
              }             
          
              { this.st ?

                 <div id="footer-bottom-holepunch-mobile" className="bottom">
                    <a className="register la-fragment-mobile_footer" id="side-nav-register" href="/logout">Logout </a>
                 </div>
                 
                 :

                 <div id="footer-bottom-holepunch-mobile" className="bottom">
                 <a className="sign-in la-fragment-mobile_footer" id="side-nav-signin" href="/login">Log In</a>
                 <a className="register la-fragment-mobile_footer" id="side-nav-register" href="/signup">Sign Up </a>
                 </div>
              }     

            </div>
          </div>
		  </div>
    </header>

      );
  }
}
