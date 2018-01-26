import React, { PropTypes, Component } from 'react';
import HomeHeader from './HomeHeader.js';
import InnerHeader from './InnerHeader.js';
import { Link } from 'react-router';
import $ from 'jquery';
export default class Header extends React.Component {
  
    constructor(props){

    super(props);
  }


 
  render() {
  	 
  	   const { className, ...props } = this.props;

       var currentLocation = this.props.pathn;  
       var displaymessage = this.props.displaymessage;  
	     var showResults = this.props.showResults;	

      	var  st  = true;

      		if (currentLocation == '/signup' ) {            		
            		st = true;
      		  } else {
      			   st = false; 
      		  }
		

      return (
      	<div>
      	  
          { showResults ? <div id="errormsgdiv" className="alert alert-success errormsgdiv hideafter5sec" ><a href="javascript:;" class="close" data-dismiss="alert" aria-label="close">&times;</a>
           {displaymessage}
          </div> : null }

         

      		<InnerHeader pathn={currentLocation} pushobj="2" />

      		{/* st ?  <InnerHeader/> : <HomeHeader/> */}

     	</div>
      );
  }
}


$(document).ready(function(){
    setTimeout(function() {  $("#errormsgdiv").toggle("slow"); }, 5000);
});