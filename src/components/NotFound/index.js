// src/components/NotFound/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Header from '../Header/Header.js';
import './style.css';

export default class NotFound extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('NotFound', className)} {...props}>
       <Header />

          <div className="login-section bg-ribbins">
      <div className="container">
        <div className="tab-wrap">
          <h2 className="head-title">

          404 <small>Not Found :(</small>
        </h2>
        </div>
        </div>
        </div>
        
      </div>
    );
  }
}