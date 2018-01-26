// src/components/Addmycommunity/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';

class Contact extends Component {  

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Contact', className)} {...props}>
       <Header />
      <div className="login-section bg-ribbins">
      <div className="container">
        <div className="tab-wrap">
          <h2 className="head-title">Contact us</h2>
          <form role="form">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input id="login-username" type="text" className="form-control" name="Name" value="" placeholder="Name" />
            </div>

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
              <input id="login-username" type="text" className="form-control" name="email" value="" placeholder="Email" />
            </div>   

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-pencil"></i></span>
              <input id="login-password" type="password" className="form-control" name="subject" placeholder="Subject" />
            </div>

            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-comment"></i></span>
              <textarea placeholder="Message" name="comment" className="form-control"></textarea>
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



export default Contact;